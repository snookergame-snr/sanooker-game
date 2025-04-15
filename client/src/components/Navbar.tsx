import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Wallet, Coins, Gamepad2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useWallet } from "@/hooks/useWallet";
import { shortenAddress } from "@/lib/utils";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "How to Play", href: "#howtoplay" },
  { name: "Tokenomics", href: "#tokenomics" },
  { name: "Roadmap", href: "#roadmap" },
  { name: "Team", href: "#team" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const { isConnected, account, snrBalance, connectWallet } = useWallet();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleConnectWallet = async () => {
    try {
      await connectWallet();
    } catch (error: any) {
      toast({
        title: "ไม่สามารถเชื่อมต่อกระเป๋าได้",
        description: error.message || "กรุณาลองใหม่อีกครั้ง",
        variant: "destructive"
      });
    }
  };

  const handleBuySNR = () => {
    toast({
      title: "ซื้อเหรียญ SNR",
      description: "ฟีเจอร์นี้ยังไม่รองรับในขณะนี้",
    });
  };
  
  const handleStartPlaying = () => {
    if (!isConnected) {
      toast({
        title: "กรุณาเชื่อมต่อกระเป๋าก่อน",
        description: "คุณต้องเชื่อมต่อกระเป๋าก่อนเริ่มเล่นเกม",
        variant: "destructive"
      });
      return;
    }
    
    setLocation("/dashboard");
  };

  return (
    <header
      className={`fixed w-full top-0 z-50 bg-background/95 backdrop-blur-md py-3 border-b ${
        isScrolled ? "border-border shadow-md" : "border-transparent"
      } transition-all duration-300`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-10 h-10 relative rounded-full bg-gradient-to-r from-primary to-purple-600 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-background"></div>
            </div>
            <span className="font-mono text-white text-xl font-bold">SNR</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {isConnected ? (
              <>
                <div className="bg-card px-3 py-1 rounded-lg flex items-center text-xs text-muted-foreground">
                  <span className="font-mono">{shortenAddress(account || "")}</span>
                </div>
                <div className="bg-primary/20 text-primary px-3 py-1 rounded-lg flex items-center text-xs">
                  <span className="font-mono">{snrBalance || "0"} SNR</span>
                </div>
                <Button
                  className="bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 transition-opacity flex items-center gap-2"
                  onClick={handleStartPlaying}
                >
                  <Gamepad2 className="h-4 w-4" />
                  <span>Start Playing</span>
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={handleConnectWallet}
                >
                  <Wallet className="h-4 w-4" />
                  <span>Connect Wallet</span>
                </Button>
                <Button
                  className="bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 transition-opacity flex items-center gap-2"
                  onClick={handleBuySNR}
                >
                  <Coins className="h-4 w-4" />
                  <span>Buy SNR</span>
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-background/95 backdrop-blur-md">
            <div className="flex flex-col space-y-4 mt-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary py-2 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              
              <div className="flex flex-col gap-3 pt-4">
                {isConnected ? (
                  <>
                    <div className="bg-card p-3 rounded-lg flex flex-col items-center text-sm space-y-1">
                      <span className="font-mono text-xs">{shortenAddress(account || "")}</span>
                      <span className="font-mono text-primary">{snrBalance || "0"} SNR</span>
                    </div>
                    <Button
                      className="bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 transition-opacity flex items-center justify-center gap-2 w-full"
                      onClick={handleStartPlaying}
                    >
                      <Gamepad2 className="h-4 w-4" />
                      <span>Start Playing</span>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      className="flex items-center justify-center gap-2 w-full"
                      onClick={handleConnectWallet}
                    >
                      <Wallet className="h-4 w-4" />
                      <span>Connect Wallet</span>
                    </Button>
                    <Button
                      className="bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 transition-opacity flex items-center justify-center gap-2 w-full"
                      onClick={handleBuySNR}
                    >
                      <Coins className="h-4 w-4" />
                      <span>Buy SNR</span>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
