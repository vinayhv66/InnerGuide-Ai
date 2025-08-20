import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertConversationSchema, insertMoodEntrySchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Conversation routes
  app.post("/api/conversations", async (req, res) => {
    try {
      const data = insertConversationSchema.parse(req.body);
      const conversation = await storage.createConversation(data);
      res.json(conversation);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/conversations/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const conversations = await storage.getConversationsByUserId(userId);
      res.json(conversations);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.put("/api/conversations/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { messages } = req.body;
      const conversation = await storage.updateConversation(id, messages);
      if (!conversation) {
        return res.status(404).json({ message: "Conversation not found" });
      }
      res.json(conversation);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Mood entry routes
  app.post("/api/mood-entries", async (req, res) => {
    try {
      const data = insertMoodEntrySchema.parse(req.body);
      const moodEntry = await storage.createMoodEntry(data);
      res.json(moodEntry);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/mood-entries/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const { startDate, endDate } = req.query;
      
      let moodEntries;
      if (startDate && endDate) {
        moodEntries = await storage.getMoodEntriesByDateRange(
          userId,
          startDate as string,
          endDate as string
        );
      } else {
        moodEntries = await storage.getMoodEntriesByUserId(userId);
      }
      
      res.json(moodEntries);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
