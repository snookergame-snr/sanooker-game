import { motion } from "framer-motion";
import { Gamepad, Store, Landmark, BarChart4 } from "lucide-react";

const tokenUtilities = [
  {
    icon: <Gamepad className="h-5 w-5 text-primary" />,
    title: "Gameplay",
    description:
      "Entry fees for tournaments, purchasing practice sessions, and unlocking premium game modes.",
    bgColor: "primary",
  },
  {
    icon: <Store className="h-5 w-5 text-purple-600" />,
    title: "Marketplace",
    description:
      "Buy, sell and trade in-game NFT items such as cues, venues, and accessories.",
    bgColor: "purple-600",
  },
  {
    icon: <Landmark className="h-5 w-5 text-orange-500" />,
    title: "Governance",
    description:
      "Vote on game development decisions, tournament structures, and fund allocations.",
    bgColor: "orange-500",
  },
  {
    icon: <BarChart4 className="h-5 w-5 text-primary" />,
    title: "Staking",
    description:
      "Earn passive income by staking SNR tokens in our reward pools.",
    bgColor: "primary",
  },
];

const tokenDistribution = [
  { name: "Gameplay", percentage: 30, color: "primary" },
  { name: "Community & Rewards", percentage: 25, color: "purple-600" },
  { name: "Team & Development", percentage: 20, color: "orange-500" },
  { name: "Marketing", percentage: 15, color: "purple-500" },
  { name: "Reserve", percentage: 10, color: "blue-500" },
];

export default function TokenomicsSection() {
  return (
    <section id="tokenomics" className="py-20 bg-card relative">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-4xl font-bold mb-6">Tokenomics</h2>
          <p className="text-muted-foreground">
            The SNR token powers our entire ecosystem, enabling gameplay, rewards, governance, and staking opportunities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-heading text-3xl font-bold mb-6">SNR Token Utility</h3>

            <div className="space-y-6">
              {tokenUtilities.map((utility, index) => (
                <motion.div
                  key={index}
                  className="bg-background p-6 rounded-xl border border-border"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`shrink-0 w-10 h-10 rounded-lg bg-${utility.bgColor}/20 flex items-center justify-center`}>
                      {utility.icon}
                    </div>
                    <div>
                      <h4 className="font-heading text-lg font-semibold mb-2">
                        {utility.title}
                      </h4>
                      <p className="text-muted-foreground">{utility.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative p-4">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 opacity-20 blur-lg rounded-xl"></div>
              <div className="bg-background p-6 rounded-xl border border-border relative z-10">
                <h4 className="font-heading text-xl font-semibold mb-6 text-center">
                  Token Distribution
                </h4>

                <div className="aspect-square relative mb-8">
                  {/* Chart visualization */}
                  <div className="w-full h-full rounded-full bg-card border-8 border-background relative overflow-hidden">
                    {/* Animated pie segments */}
                    <svg viewBox="0 0 100 100" className="absolute inset-0">
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="hsl(var(--primary))"
                        strokeWidth="80"
                        strokeDasharray="251.3 1000"
                        strokeDashoffset="0"
                        transform="rotate(-90, 50, 50)"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                      />
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="hsl(var(--purple-600))"
                        strokeWidth="80"
                        strokeDasharray="209.4 1000"
                        strokeDashoffset="-251.3"
                        transform="rotate(-90, 50, 50)"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                      />
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="hsl(var(--orange-500))"
                        strokeWidth="80"
                        strokeDasharray="167.5 1000"
                        strokeDashoffset="-460.7"
                        transform="rotate(-90, 50, 50)"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                      />
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="hsl(var(--purple-500))"
                        strokeWidth="80"
                        strokeDasharray="125.7 1000"
                        strokeDashoffset="-628.2"
                        transform="rotate(-90, 50, 50)"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                      />
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="hsl(var(--blue-500))"
                        strokeWidth="80"
                        strokeDasharray="83.8 1000"
                        strokeDashoffset="-753.9"
                        transform="rotate(-90, 50, 50)"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.5 }}
                      />
                    </svg>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-background flex items-center justify-center">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-10 w-10 text-primary"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                          <line x1="9" y1="9" x2="9.01" y2="9"></line>
                          <line x1="15" y1="9" x2="15.01" y2="9"></line>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {tokenDistribution.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full bg-${item.color}`}></div>
                      <span className="text-sm text-muted-foreground">
                        {item.name}: {item.percentage}%
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Supply</p>
                      <p className="font-heading font-semibold">100,000,000 SNR</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Initial Price</p>
                      <p className="font-heading font-semibold">$0.05 USD</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="bg-background p-8 rounded-xl border border-border"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="font-heading text-2xl font-bold mb-6 text-center">
            Token Ecosystem
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-16 h-16 rounded-lg bg-primary/20 mx-auto flex items-center justify-center mb-4">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8 text-primary"
                >
                  <circle cx="12" cy="8" r="7"></circle>
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                </svg>
              </div>
              <h4 className="font-heading text-lg font-semibold mb-2">Play & Earn</h4>
              <p className="text-muted-foreground text-sm">
                Win tournaments and complete challenges to earn SNR tokens as rewards.
              </p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="w-16 h-16 rounded-lg bg-purple-600/20 mx-auto flex items-center justify-center mb-4">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8 text-purple-600"
                >
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38"></path>
                </svg>
              </div>
              <h4 className="font-heading text-lg font-semibold mb-2">
                Token Circulation
              </h4>
              <p className="text-muted-foreground text-sm">
                Spent tokens are partially burned with the rest going back into the reward pool.
              </p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="w-16 h-16 rounded-lg bg-orange-500/20 mx-auto flex items-center justify-center mb-4">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8 text-orange-500"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <h4 className="font-heading text-lg font-semibold mb-2">
                Vesting Schedule
              </h4>
              <p className="text-muted-foreground text-sm">
                Team and investor tokens are subject to vesting periods to ensure long-term alignment.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
