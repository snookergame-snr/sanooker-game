import { motion } from "framer-motion";
import { Gamepad, Medal, Coins, Check } from "lucide-react";

const features = [
  {
    icon: <Gamepad className="h-6 w-6 text-primary" />,
    title: "Immersive Gameplay",
    description:
      "Realistic physics engine and detailed graphics create an authentic snooker experience with multiple game modes and tournaments.",
    color: "primary",
    delay: 0,
  },
  {
    icon: <Medal className="h-6 w-6 text-purple-600" />,
    title: "Own Your Assets",
    description:
      "Collect, trade, and utilize NFT cues, venues, and accessories that provide unique advantages and customization options.",
    color: "purple-600",
    delay: 0.2,
  },
  {
    icon: <Coins className="h-6 w-6 text-orange-500" />,
    title: "Play to Earn",
    description:
      "Compete in tournaments, complete challenges, and stake your SNR tokens to earn rewards and passive income.",
    color: "orange-500",
    delay: 0.4,
  },
];

const benefits = [
  {
    title: "Global Tournaments",
    description: "Compete against players worldwide for SNR token prizes",
  },
  {
    title: "NFT Marketplace",
    description: "Trade unique cues, venues, and accessories",
  },
  {
    title: "Skill Development",
    description: "Train and level up your player profile",
  },
  {
    title: "Community Governance",
    description: "Vote on future game features and updates",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 relative bg-background">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1615310748170-50ae00929a4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')] opacity-5"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-4xl font-bold mb-6">About the Game</h2>
          <p className="text-muted-foreground">
            Experience the classic game of snooker reimagined for the blockchain era. SNR brings together competitive gameplay, digital ownership, and play-to-earn mechanics.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-card p-8 rounded-xl border border-border hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: feature.delay }}
            >
              <div className={`w-14 h-14 rounded-lg bg-${feature.color}/20 flex items-center justify-center mb-6`}>
                {feature.icon}
              </div>
              <h3 className="font-heading text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="p-4 relative"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 opacity-20 blur-lg rounded-xl"></div>
              <img
                src="https://images.unsplash.com/photo-1589019902986-2b7cb17639f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
                alt="Snooker game screenshot"
                className="rounded-xl relative z-10 w-full object-cover aspect-video"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-heading text-3xl font-bold mb-6">
              A New Era of Digital Snooker
            </h3>
            <p className="text-muted-foreground mb-6">
              SNR combines the strategic depth of snooker with blockchain technology to create a unique gaming ecosystem where players have true ownership of their in-game assets and achievements.
            </p>

            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="mt-1 shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <p className="text-muted-foreground">
                    <span className="font-semibold text-foreground">{benefit.title}</span> - {benefit.description}
                  </p>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
