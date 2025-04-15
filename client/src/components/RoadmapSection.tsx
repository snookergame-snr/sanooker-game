import { motion } from "framer-motion";
import { CheckCircle, Clock, Circle } from "lucide-react";

const roadmapItems = [
  {
    phase: "Foundation",
    period: "Q1 2023",
    color: "primary",
    tasks: [
      { text: "Concept development and team formation", status: "completed" },
      { text: "Whitepaper publication", status: "completed" },
      { text: "Smart contract development and audit", status: "completed" }
    ]
  },
  {
    phase: "Token Launch",
    period: "Q2 2023",
    color: "purple-600",
    tasks: [
      { text: "Private and public token sale", status: "completed" },
      { text: "DEX/CEX listings", status: "completed" },
      { text: "Community building initiatives", status: "completed" }
    ]
  },
  {
    phase: "Game Development",
    period: "Q3 2023",
    color: "orange-500",
    tasks: [
      { text: "Alpha version development", status: "completed" },
      { text: "NFT marketplace integration", status: "in-progress" },
      { text: "Closed beta testing", status: "in-progress" }
    ]
  },
  {
    phase: "Game Launch",
    period: "Q4 2023",
    color: "purple-500",
    tasks: [
      { text: "Open beta release", status: "pending" },
      { text: "Full game launch on web and mobile platforms", status: "pending" },
      { text: "First official tournament with prize pool", status: "pending" }
    ]
  },
  {
    phase: "Expansion",
    period: "Q1 2024",
    color: "blue-500",
    tasks: [
      { text: "Additional game modes and features", status: "pending" },
      { text: "eSports partnerships and professional tournaments", status: "pending" },
      { text: "Cross-platform play and global leaderboards", status: "pending" }
    ]
  }
];

export default function RoadmapSection() {
  return (
    <section id="roadmap" className="py-20 bg-background relative">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-card to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-4xl font-bold mb-6">Roadmap</h2>
          <p className="text-muted-foreground">
            Our development plan outlines key milestones as we build and expand the Snooker Game (SNR) ecosystem.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {roadmapItems.map((item, index) => (
            <motion.div
              key={index}
              className="pl-10 pb-10 relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Timeline line and dot */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-purple-600 to-orange-500 z-0"></div>
              <div className={`absolute left-0 top-0 w-6 h-6 rounded-full bg-${item.color} border-4 border-background z-10`}></div>

              <div className="bg-card p-6 rounded-xl border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading text-xl font-semibold">
                    Phase {index + 1}: {item.phase}
                  </h3>
                  <span className={`text-sm font-mono bg-${item.color}/20 text-${item.color} px-3 py-1 rounded-full`}>
                    {item.period}
                  </span>
                </div>

                <ul className="space-y-3">
                  {item.tasks.map((task, taskIndex) => (
                    <li key={taskIndex} className="flex items-start gap-3">
                      <div className="mt-1 shrink-0 w-5 h-5 rounded-full flex items-center justify-center">
                        {task.status === "completed" ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : task.status === "in-progress" ? (
                          <Clock className="h-5 w-5 text-yellow-500" />
                        ) : (
                          <Circle className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                      <p className="text-muted-foreground">{task.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
