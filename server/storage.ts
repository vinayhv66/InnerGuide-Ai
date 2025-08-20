import { type Conversation, type InsertConversation, type MoodEntry, type InsertMoodEntry } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Conversation methods
  getConversation(id: string): Promise<Conversation | undefined>;
  getConversationsByUserId(userId: string): Promise<Conversation[]>;
  createConversation(conversation: InsertConversation): Promise<Conversation>;
  updateConversation(id: string, messages: any): Promise<Conversation | undefined>;
  
  // Mood entry methods
  getMoodEntry(id: string): Promise<MoodEntry | undefined>;
  getMoodEntriesByUserId(userId: string): Promise<MoodEntry[]>;
  createMoodEntry(moodEntry: InsertMoodEntry): Promise<MoodEntry>;
  getMoodEntriesByDateRange(userId: string, startDate: string, endDate: string): Promise<MoodEntry[]>;
}

export class MemStorage implements IStorage {
  private conversations: Map<string, Conversation>;
  private moodEntries: Map<string, MoodEntry>;

  constructor() {
    this.conversations = new Map();
    this.moodEntries = new Map();
  }

  async getConversation(id: string): Promise<Conversation | undefined> {
    return this.conversations.get(id);
  }

  async getConversationsByUserId(userId: string): Promise<Conversation[]> {
    return Array.from(this.conversations.values()).filter(
      (conversation) => conversation.userId === userId,
    );
  }

  async createConversation(insertConversation: InsertConversation): Promise<Conversation> {
    const id = randomUUID();
    const conversation: Conversation = {
      ...insertConversation,
      id,
      createdAt: new Date(),
    };
    this.conversations.set(id, conversation);
    return conversation;
  }

  async updateConversation(id: string, messages: any): Promise<Conversation | undefined> {
    const conversation = this.conversations.get(id);
    if (conversation) {
      conversation.messages = messages;
      this.conversations.set(id, conversation);
      return conversation;
    }
    return undefined;
  }

  async getMoodEntry(id: string): Promise<MoodEntry | undefined> {
    return this.moodEntries.get(id);
  }

  async getMoodEntriesByUserId(userId: string): Promise<MoodEntry[]> {
    return Array.from(this.moodEntries.values()).filter(
      (entry) => entry.userId === userId,
    );
  }

  async createMoodEntry(insertMoodEntry: InsertMoodEntry): Promise<MoodEntry> {
    const id = randomUUID();
    const moodEntry: MoodEntry = {
      ...insertMoodEntry,
      id,
      notes: insertMoodEntry.notes || null,
      createdAt: new Date(),
    };
    this.moodEntries.set(id, moodEntry);
    return moodEntry;
  }

  async getMoodEntriesByDateRange(userId: string, startDate: string, endDate: string): Promise<MoodEntry[]> {
    return Array.from(this.moodEntries.values()).filter(
      (entry) => entry.userId === userId && entry.date >= startDate && entry.date <= endDate,
    );
  }
}

export const storage = new MemStorage();
