import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useToast } from '@/hooks/use-toast';

export interface UseWalletReturnType {
  isConnected: boolean;
  account: string | null;
  balance: string | null;
  snrBalance: string | null;
  provider: ethers.BrowserProvider | null;
  signer: ethers.JsonRpcSigner | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  claimSnrTokens: () => Promise<void>;
}

const SNR_TOKEN_ADDRESS = '0xB7486846F0d1464eDE9dd4a1EF818E2c982aC7aD'; // Address ของเหรียญ SNR
const SNR_TOKEN_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function transfer(address to, uint256 amount) returns (bool)',
  'function mint(address to, uint256 amount) returns (bool)',
];

export function useWallet(): UseWalletReturnType {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [snrBalance, setSnrBalance] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const { toast } = useToast();

  const isConnected = !!account;

  // ตรวจสอบว่ามี MetaMask หรือไม่
  useEffect(() => {
    const checkProvider = async () => {
      if (window.ethereum) {
        const ethersProvider = new ethers.BrowserProvider(window.ethereum);
        setProvider(ethersProvider);

        // ตรวจสอบการเปลี่ยนแปลงบัญชี
        window.ethereum.on('accountsChanged', (accounts: string[]) => {
          if (accounts.length === 0) {
            disconnectWallet();
          } else {
            setAccount(accounts[0]);
            fetchBalances(ethersProvider, accounts[0]);
          }
        });

        // ตรวจสอบการเปลี่ยนแปลง Network
        window.ethereum.on('chainChanged', () => {
          window.location.reload();
        });

        // เช็คว่ามีการเชื่อมต่ออยู่แล้วหรือไม่
        try {
          const accounts = await ethersProvider.listAccounts();
          if (accounts.length > 0) {
            const currentSigner = await ethersProvider.getSigner();
            setSigner(currentSigner);
            setAccount(accounts[0].toString());
            fetchBalances(ethersProvider, accounts[0].toString());
          }
        } catch (error) {
          console.error("Failed to get accounts:", error);
        }
      }
    };

    checkProvider();

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged');
        window.ethereum.removeAllListeners('chainChanged');
      }
    };
  }, []);

  const fetchBalances = async (provider: ethers.BrowserProvider, address: string) => {
    try {
      // ยอด ETH
      const ethBalance = await provider.getBalance(address);
      setBalance(ethers.formatEther(ethBalance));

      // ยอด SNR token (ถ้ามี)
      try {
        const tokenContract = new ethers.Contract(
          SNR_TOKEN_ADDRESS,
          SNR_TOKEN_ABI,
          provider
        );
        const tokenBalance = await tokenContract.balanceOf(address);
        const decimals = await tokenContract.decimals();
        setSnrBalance(ethers.formatUnits(tokenBalance, decimals));
      } catch (error) {
        console.error("Error fetching SNR balance:", error);
        setSnrBalance('0');
      }
    } catch (error) {
      console.error("Error fetching balances:", error);
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast({
        title: "MetaMask ไม่พบ",
        description: "กรุณาติดตั้ง MetaMask Extension ก่อนเชื่อมต่อกระเป๋า",
        variant: "destructive",
      });
      return;
    }

    try {
      if (!provider) {
        const ethersProvider = new ethers.BrowserProvider(window.ethereum);
        setProvider(ethersProvider);
      }

      if (provider) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await provider.listAccounts();
        
        if (accounts.length > 0) {
          const currentSigner = await provider.getSigner();
          setSigner(currentSigner);
          setAccount(accounts[0].toString());
          fetchBalances(provider, accounts[0].toString());
          
          toast({
            title: "เชื่อมต่อสำเร็จ",
            description: `เชื่อมต่อกับกระเป๋า ${accounts[0].toString().substring(0, 6)}...${accounts[0].toString().substring(38)}`,
          });
        }
      }
    } catch (error: any) {
      console.error("Error connecting wallet:", error);
      toast({
        title: "เชื่อมต่อล้มเหลว",
        description: error.message || "ไม่สามารถเชื่อมต่อกับกระเป๋าได้",
        variant: "destructive",
      });
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setBalance(null);
    setSnrBalance(null);
    setSigner(null);
    
    toast({
      title: "ยกเลิกการเชื่อมต่อ",
      description: "ตัดการเชื่อมต่อกับกระเป๋าเรียบร้อยแล้ว",
    });
  };
  
  const claimSnrTokens = async () => {
    if (!isConnected || !signer || !account) {
      toast({
        title: "กรุณาเชื่อมต่อกระเป๋าก่อน",
        description: "คุณต้องเชื่อมต่อกระเป๋าก่อนรับเหรียญ SNR",
        variant: "destructive"
      });
      return;
    }
    
    try {
      // สร้าง Contract instance พร้อม signer
      const tokenContract = new ethers.Contract(
        SNR_TOKEN_ADDRESS,
        SNR_TOKEN_ABI,
        signer
      );
      
      // เรียกใช้ฟังก์ชั่น mint เพื่อรับเหรียญ 1000 SNR
      const amount = ethers.parseUnits("1000", 18); // สมมติว่ามี decimal 18 หลัก
      
      // ถ้าเป็น contract จริง เราจะใช้ mint แต่ในกรณีนี้อาจจะทดลองใช้ transfer หรือ mock
      const tx = await tokenContract.mint(account, amount);
      await tx.wait();
      
      // อัพเดทยอดเหรียญ
      if (provider) {
        fetchBalances(provider, account);
      }
      
      toast({
        title: "รับเหรียญสำเร็จ",
        description: "คุณได้รับเหรียญ SNR จำนวน 1,000 เหรียญ",
      });
    } catch (error: any) {
      console.error("Error claiming SNR tokens:", error);
      toast({
        title: "ไม่สามารถรับเหรียญได้",
        description: error.message || "เกิดข้อผิดพลาด กรุณาลองใหม่ภายหลัง",
        variant: "destructive"
      });
    }
  };

  return {
    isConnected,
    account,
    balance,
    snrBalance,
    provider,
    signer,
    connectWallet,
    disconnectWallet,
    claimSnrTokens,
  };
}

// เพิ่ม type สำหรับ window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}