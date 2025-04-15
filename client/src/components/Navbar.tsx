import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Wallet, Coins } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleConnectWallet = () => {
    toast({
      title: "Wallet Connection",
      description: "This feature is not yet implemented.",
    });
  };

  const handleBuySNR = () => {
    toast({
      title: "Buy SNR",
      description: "This feature is not yet implemented.",
    });
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
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
