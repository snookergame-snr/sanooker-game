import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Wallet, Coins } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function CtaSection() {
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
    <section className="py-20 bg-card relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-600/20 opacity-30"></div>
        <img
          src="https://images.unsplash.com/photo-1591462391941-8b0d8d1c6031?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
          className="w-full h-full object-cover opacity-10"
          alt="Snooker background"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            Ready to Join the Game?
          </h2>
          <p className="text-muted-foreground text-lg mb-10">
            Be part of the next generation of blockchain gaming. Get early access, exclusive NFTs, and community benefits.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}
