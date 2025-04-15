import { Link } from "wouter";
import { FaTwitter, FaTelegram, FaDiscord, FaMedium } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <Link href="/">
              <div className="flex items-center gap-2 mb-6 cursor-pointer">
                <div className="w-10 h-10 relative rounded-full bg-gradient-to-r from-primary to-purple-600 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-background"></div>
                </div>
                <span className="font-mono text-white text-xl font-bold">SNR</span>
              </div>
            </Link>

            <p className="text-muted-foreground mb-6">
              A revolutionary Web3 snooker gaming experience where skill meets strategy and blockchain technology.
            </p>

            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-card flex items-center justify-center text-muted-foreground hover:bg-primary/20 hover:text-primary transition-colors"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-card flex items-center justify-center text-muted-foreground hover:bg-primary/20 hover:text-primary transition-colors"
              >
                <FaTelegram />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-card flex items-center justify-center text-muted-foreground hover:bg-primary/20 hover:text-primary transition-colors"
              >
                <FaDiscord />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-card flex items-center justify-center text-muted-foreground hover:bg-primary/20 hover:text-primary transition-colors"
              >
                <FaMedium />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#tokenomics" className="text-muted-foreground hover:text-primary transition-colors">
                  Tokenomics
                </a>
              </li>
              <li>
                <a href="#roadmap" className="text-muted-foreground hover:text-primary transition-colors">
                  Roadmap
                </a>
              </li>
              <li>
                <a href="#team" className="text-muted-foreground hover:text-primary transition-colors">
                  Team
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold mb-6">Resources</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Whitepaper
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Token Contract
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold mb-6">Newsletter</h4>
            <p className="text-muted-foreground mb-4">
              Stay updated with our latest news and announcements.
            </p>

            <form className="mb-4">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-card border border-border rounded-l-lg px-4 py-2 text-foreground focus:outline-none focus:border-primary transition-colors"
                />
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-r-lg transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="m22 2-7 20-4-9-9-4Z" />
                    <path d="M22 2 11 13" />
                  </svg>
                </button>
              </div>
            </form>

            <p className="text-xs text-muted-foreground/70">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between">
          <p className="text-muted-foreground/70 text-sm mb-4 md:mb-0">
            &copy; 2023 Snooker Game (SNR). All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground/70 hover:text-primary text-sm transition-colors">
              Privacy Policy
            </a>
            <span className="text-muted-foreground/30">•</span>
            <a href="#" className="text-muted-foreground/70 hover:text-primary text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
