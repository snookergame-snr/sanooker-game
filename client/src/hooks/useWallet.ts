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
}

const SNR_TOKEN_ADDRESS = '0x1234567890123456789012345678901234567890'; // ตัวอย่าง, เปลี่ยนเป็น address จริงของ token SNR
const SNR_TOKEN_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
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

  return {
    isConnected,
    account,
    balance,
    snrBalance,
    provider,
    signer,
    connectWallet,
    disconnectWallet,
  };
}

// เพิ่ม type สำหรับ window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}