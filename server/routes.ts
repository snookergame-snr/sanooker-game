import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const { name, email, subject, message } = req.body;
      
      // Basic validation
      if (!name || !email || !subject || !message) {
        return res.status(400).json({
          message: "All fields are required",
        });
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          message: "Invalid email format",
        });
      }
      
      // In a real-world scenario, we would save this to a database
      // and perhaps send an email notification
      console.log('Contact form submission:', {
        name,
        email,
        subject,
        message,
        timestamp: new Date().toISOString()
      });
      
      return res.status(200).json({
        message: "Message received",
      });
    } catch (error) {
      console.error("Error in contact form submission:", error);
      return res.status(500).json({
        message: "Server error, please try again later",
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
