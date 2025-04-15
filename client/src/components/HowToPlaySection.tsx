import { motion } from "framer-motion";
import { Wallet, Gamepad2, Trophy, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const steps = [
  {
    icon: <Wallet className="h-8 w-8 text-primary" />,
    title: "เชื่อมต่อกระเป๋า",
    description:
      "เชื่อมต่อกระเป๋า MetaMask ของคุณและซื้อเหรียญ SNR เพื่อเริ่มต้นเล่นเกม",
    color: "primary",
    delay: 0,
  },
  {
    icon: <Gamepad2 className="h-8 w-8 text-purple-600" />,
    title: "เลือกห้องและเล่น",
    description:
      "เลือกห้องเล่นตามระดับความยากและจำนวน SNR ที่ต้องการเดิมพัน",
    color: "purple-600",
    delay: 0.2,
  },
  {
    icon: <Trophy className="h-8 w-8 text-orange-500" />,
    title: "ชนะและรับรางวัล",
    description:
      "ชนะการแข่งขันและรับเหรียญ SNR พร้อม NFT พิเศษสำหรับผู้ชนะ",
    color: "orange-500",
    delay: 0.4,
  },
];

const gameFeatures = [
  {
    title: "พัฒนาทักษะ",
    description: "ระบบจัดอันดับและเก็บสถิติช่วยให้คุณพัฒนาฝีมือได้อย่างต่อเนื่อง",
  },
  {
    title: "แข่งขันทัวร์นาเมนต์",
    description: "เข้าร่วมทัวร์นาเมนต์ประจำเดือนเพื่อชิงเงินรางวัลรวมมูลค่าสูง",
  },
  {
    title: "เก็บสะสม NFT",
    description: "รับและซื้อขาย NFT ไม้คิว, สนาม และอุปกรณ์เพื่อเพิ่มพลังในเกม",
  },
  {
    title: "ระบบ Play-to-Earn",
    description: "เล่นเกม ชนะการแข่งขัน และสร้างรายได้จริงในรูปแบบเหรียญ SNR",
  },
];

export default function HowToPlaySection() {
  return (
    <section id="howtoplay" className="py-20 relative bg-card">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-4xl font-bold mb-6">วิธีการเล่น</h2>
          <p className="text-muted-foreground">
            เริ่มต้นเล่น Snooker Game (SNR) และเป็นเจ้าของสินทรัพย์ดิจิทัลในเกมได้ง่ายๆ เพียงไม่กี่ขั้นตอน
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative bg-background p-8 rounded-xl border border-border hover:-translate-y-2 transition-transform duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: step.delay }}
            >
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center font-bold text-xl text-primary">
                {index + 1}
              </div>
              <div className={`w-16 h-16 rounded-xl bg-${step.color}/20 flex items-center justify-center mb-6`}>
                {step.icon}
              </div>
              <h3 className="font-heading text-xl font-semibold mb-4">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="order-2 md:order-1"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-heading text-3xl font-bold mb-6">
              ฟีเจอร์เกมที่ช่วยให้คุณได้รับประสบการณ์สนุกเกอร์ที่สมจริง
            </h3>
            <p className="text-muted-foreground mb-6">
              Snooker Game (SNR) มอบประสบการณ์การเล่นสนุกเกอร์ที่สมจริงผ่านเกมที่ใช้เทคโนโลยี Web3 ผนวกกับระบบเกมอันทันสมัย ซึ่งช่วยให้ผู้เล่นเป็นเจ้าของสินทรัพย์ในเกมและสร้างรายได้ไปพร้อมๆ กับการเล่นเกม
            </p>

            <ul className="space-y-4">
              {gameFeatures.map((feature, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="mt-1 shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <ArrowRight className="h-3 w-3 text-primary" />
                  </div>
                  <p className="text-muted-foreground">
                    <span className="font-semibold text-foreground">{feature.title}</span> - {feature.description}
                  </p>
                </motion.li>
              ))}
            </ul>

            <div className="mt-8">
              <Link href="/dashboard">
                <Button className="bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 transition-opacity">
                  <Gamepad2 className="mr-2 h-5 w-5" />
                  เริ่มเล่นเลย
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="order-1 md:order-2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 opacity-20 blur-lg rounded-xl"></div>
              <img
                src="https://images.unsplash.com/photo-1610398750328-ef2419e1529d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt="Snooker game screenshot"
                className="rounded-xl relative z-10 w-full object-cover aspect-video"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}