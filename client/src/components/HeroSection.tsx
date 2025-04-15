import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Wallet, Coins, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function HeroSection() {
  const { toast } = useToast();

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
    <section className="relative min-h-screen pt-20 overflow-hidden">
      {/* Background with snooker theme */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background opacity-80"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.2),transparent_70%)]"></div>
        <img
          src="https://images.unsplash.com/photo-1615310748170-50ae00929a4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
          className="w-full h-full object-cover opacity-20"
          alt="Snooker background"
        />
      </div>

      {/* Floating elements animation */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute w-32 h-32 rounded-full bg-primary/20 blur-3xl -top-10 -left-10"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-purple-600/20 blur-3xl bottom-20 -right-20"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute w-16 h-16 rounded-full bg-orange-500/20 blur-2xl top-40 right-40"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="container mx-auto px-4 pt-20 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="font-mono text-sm tracking-wider bg-primary/20 text-primary px-4 py-1 rounded-full">
              WEB3 GAMING
            </span>
          </motion.div>

          <motion.h1
            className="font-heading text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="block">Snooker Game</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
              (SNR)
            </span>
          </motion.h1>

          <motion.p
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            A revolutionary Web3 snooker gaming experience where skill meets strategy. Earn, compete, and own your in-game assets with the power of blockchain technology.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button
              variant="outline"
              size="lg"
              className="flex items-center gap-2"
              onClick={handleConnectWallet}
            >
              <Wallet className="h-5 w-5" />
              <span>Connect Wallet</span>
            </Button>
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 transition-opacity flex items-center gap-2"
              onClick={handleBuySNR}
            >
              <Coins className="h-5 w-5" />
              <span>Buy SNR</span>
            </Button>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-8 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 mb-2">
                100K+
              </span>
              <span className="text-muted-foreground text-sm">Active Players</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 mb-2">
                $2.5M
              </span>
              <span className="text-muted-foreground text-sm">Total Volume</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 mb-2">
                50K+
              </span>
              <span className="text-muted-foreground text-sm">NFT Items</span>
            </div>
          </motion.div>

          <motion.div
            className="mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <a href="#about" className="inline-block">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronDown className="h-8 w-8 text-primary" />
              </motion.div>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
