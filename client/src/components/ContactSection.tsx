import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Mail, FileText } from "lucide-react";
import { FaTwitter, FaTelegram, FaDiscord, FaFacebook } from "react-icons/fa";
import { useToast } from "@/hooks/use-toast";

const socialLinks = [
  {
    name: "Twitter",
    username: "@SNRGame",
    icon: <FaTwitter className="text-[#1DA1F2]" />,
    color: "[#1DA1F2]",
    href: "https://twitter.com",
  },
  {
    name: "Telegram",
    username: "t.me/SNRGame",
    icon: <FaTelegram className="text-[#0088cc]" />,
    color: "[#0088cc]",
    href: "https://telegram.org",
  },
  {
    name: "Discord",
    username: "discord.gg/SNR",
    icon: <FaDiscord className="text-[#5865F2]" />,
    color: "[#5865F2]",
    href: "https://discord.com",
  },
  {
    name: "Facebook",
    username: "fb.com/SNRGame",
    icon: <FaFacebook className="text-[#1877F2]" />,
    color: "[#1877F2]",
    href: "https://facebook.com",
  },
];

const contactInfo = [
  {
    title: "Location",
    info: "Singapore FinTech Hub, Singapore",
    icon: <MapPin className="h-5 w-5 text-primary" />,
    color: "primary",
  },
  {
    title: "Email",
    info: "info@snrgame.io",
    icon: <Mail className="h-5 w-5 text-purple-600" />,
    color: "purple-600",
  },
  {
    title: "Blog",
    info: "medium.com/@SNRGame",
    icon: <FileText className="h-5 w-5 text-orange-500" />,
    color: "orange-500",
  },
];

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactSection() {
  const { toast } = useToast();
  const [formValues, setFormValues] = useState<FormValues>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormValues((prev) => ({ ...prev, subject: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formValues.name || !formValues.email || !formValues.subject || !formValues.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formValues.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await apiRequest("POST", "/api/contact", formValues);
      
      toast({
        title: "Message sent",
        description: "Thanks for contacting us. We'll get back to you soon!",
      });
      
      // Reset form
      setFormValues({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-background relative">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-card to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-4xl font-bold mb-6">Get in Touch</h2>
          <p className="text-muted-foreground">
            Have questions about Snooker Game (SNR)? Reach out to our team or join our community channels.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <form
              className="bg-card p-8 rounded-xl border border-border"
              onSubmit={handleSubmit}
            >
              <h3 className="font-heading text-2xl font-semibold mb-6">
                Send a Message
              </h3>

              <div className="mb-6">
                <label htmlFor="name" className="block text-muted-foreground mb-2">
                  Name
                </label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formValues.name}
                  onChange={handleChange}
                  className="bg-background border-border"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block text-muted-foreground mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  className="bg-background border-border"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="subject" className="block text-muted-foreground mb-2">
                  Subject
                </label>
                <Select
                  value={formValues.subject}
                  onValueChange={handleSelectChange}
                >
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Inquiry</SelectItem>
                    <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                    <SelectItem value="support">Technical Support</SelectItem>
                    <SelectItem value="investment">Investment Inquiry</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-muted-foreground mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formValues.message}
                  onChange={handleChange}
                  className="bg-background border-border"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 transition-opacity"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="h-full flex flex-col justify-between">
              <div className="mb-8">
                <h3 className="font-heading text-2xl font-semibold mb-6">
                  Community
                </h3>

                <p className="text-muted-foreground mb-6">
                  Join our thriving community across different platforms to stay updated, participate in discussions, and get early access to game updates.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      className="flex items-center gap-3 bg-card p-4 rounded-xl border border-border hover:border-primary transition-colors group"
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className={`w-10 h-10 rounded-full bg-${social.color}/20 flex items-center justify-center`}>
                        {social.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">
                          {social.name}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {social.username}
                        </p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-semibold mb-6">
                  Contact Information
                </h3>

                <div className="space-y-4">
                  {contactInfo.map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className={`shrink-0 w-8 h-8 rounded-full bg-${item.color}/20 flex items-center justify-center mt-1`}>
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">
                          {item.title}
                        </h4>
                        <p className="text-muted-foreground">{item.info}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
