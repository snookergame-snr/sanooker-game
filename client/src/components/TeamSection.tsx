import { motion } from "framer-motion";
import { FaTwitter, FaLinkedin, FaGithub, FaDribbble, FaInstagram } from "react-icons/fa";

const teamMembers = [
  {
    name: "Michael Chen",
    role: "Founder & CEO",
    color: "primary",
    description:
      "Former eSports professional with 10+ years in game development and blockchain technology.",
    image:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    social: [
      { icon: <FaTwitter />, href: "#" },
      { icon: <FaLinkedin />, href: "#" },
      { icon: <FaGithub />, href: "#" },
    ],
  },
  {
    name: "Sarah Johnson",
    role: "CTO & Blockchain Lead",
    color: "purple-600",
    description:
      "Blockchain architect with experience at leading Web3 companies and smart contract development.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    social: [
      { icon: <FaTwitter />, href: "#" },
      { icon: <FaLinkedin />, href: "#" },
      { icon: <FaGithub />, href: "#" },
    ],
  },
  {
    name: "David Rodriguez",
    role: "Game Director",
    color: "orange-500",
    description:
      "Award-winning game designer with expertise in physics-based gaming and player engagement.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    social: [
      { icon: <FaTwitter />, href: "#" },
      { icon: <FaLinkedin />, href: "#" },
      { icon: <FaDribbble />, href: "#" },
    ],
  },
  {
    name: "Jennifer Kim",
    role: "Marketing & Community",
    color: "purple-500",
    description:
      "Experienced in Web3 marketing, community building, and growth strategies for blockchain projects.",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    social: [
      { icon: <FaTwitter />, href: "#" },
      { icon: <FaLinkedin />, href: "#" },
      { icon: <FaInstagram />, href: "#" },
    ],
  },
];

export default function TeamSection() {
  return (
    <section id="team" className="py-20 bg-card relative">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-4xl font-bold mb-6">Our Team</h2>
          <p className="text-muted-foreground">
            Meet the talented individuals behind Snooker Game (SNR), bringing expertise from gaming, blockchain, and design.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="bg-background rounded-xl overflow-hidden relative group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
              </div>

              <div className="p-6 relative">
                <h3 className="font-heading text-xl font-semibold mb-1">
                  {member.name}
                </h3>
                <p className={`text-${member.color} font-medium mb-4`}>
                  {member.role}
                </p>
                <p className="text-muted-foreground text-sm">{member.description}</p>

                <div className="opacity-0 group-hover:opacity-100 flex items-center gap-4 mt-6 transition-opacity duration-300">
                  {member.social.map((item, socialIndex) => (
                    <a
                      key={socialIndex}
                      href={item.href}
                      className={`text-muted-foreground hover:text-${member.color} transition-colors`}
                    >
                      {item.icon}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="font-heading text-2xl font-bold mb-6">
            Advisors & Partners
          </h3>

          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {[1, 2, 3].map((index) => (
              <motion.div
                key={index}
                className="bg-background p-4 rounded-xl w-40 h-16 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <svg
                  viewBox="0 0 120 40"
                  width="120"
                  height="40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                  style={{ opacity: 0.7 }}
                >
                  {index === 1 && (
                    <>
                      <rect x="20" y="10" width="20" height="20" fill="hsl(var(--primary))" />
                      <rect x="50" y="10" width="50" height="5" fill="hsl(var(--foreground))" />
                      <rect x="50" y="20" width="40" height="5" fill="hsl(var(--foreground))" />
                    </>
                  )}
                  {index === 2 && (
                    <>
                      <circle cx="30" cy="20" r="10" fill="hsl(var(--purple-600))" />
                      <rect x="50" y="15" width="50" height="5" fill="hsl(var(--foreground))" />
                      <rect x="50" y="25" width="30" height="5" fill="hsl(var(--foreground))" />
                    </>
                  )}
                  {index === 3 && (
                    <>
                      <path d="M20 15 L30 10 L40 15 L40 25 L30 30 L20 25 Z" fill="hsl(var(--orange-500))" />
                      <rect x="50" y="15" width="50" height="5" fill="hsl(var(--foreground))" />
                      <rect x="50" y="25" width="40" height="5" fill="hsl(var(--foreground))" />
                    </>
                  )}
                </svg>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
