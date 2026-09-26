import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/*
|--------------------------------------------------------------------------
| AI SYSTEM PROMPT
|--------------------------------------------------------------------------
*/

const SYSTEM_PROMPT = `
You are TaskFlow AI, an intelligent personal productivity assistant.

Your job is to help users manage, understand, organize, and prioritize
their tasks.

You have access to the user's current TaskFlow tasks.

Rules:

1. Be concise but helpful.
2. Never invent tasks that do not exist.
3. Use the supplied task data when answering task-related questions.
4. When discussing dates, use clear human-readable dates.
5. Help users prioritize tasks intelligently.
6. If the user asks for productivity advice, use their actual task data.
7. Never claim that a task was created, updated, completed, or deleted unless
   the application actually performs that action.
8. For destructive actions such as deleting tasks, ask for confirmation.
9. You are an assistant inside a Todo application, not a generic chatbot.
10. Keep responses natural and conversational.
`;

/*
|--------------------------------------------------------------------------
| CHAT ENDPOINT
|--------------------------------------------------------------------------
*/

app.post("/api/ai/chat", async (req, res) => {
  try {
    const {
      message,
      todos = [],
      conversation = [],
    } = req.body;

    if (!message?.trim()) {
      return res.status(400).json({
        error: "Message is required.",
      });
    }

    /*
     * Keep only the information the AI actually needs.
     */
    const taskContext = todos.map((todo) => ({
      id: todo.id,
      title: todo.title,
      description: todo.description,
      priority: todo.priority,
      category: todo.category,
      dueDate: todo.dueDate,
      completed: todo.completed,
      createdAt: todo.createdAt,
      completedAt: todo.completedAt,
    }));

    const contextMessage = `
CURRENT TASKFLOW DATA:

${JSON.stringify(taskContext, null, 2)}

Use this data as the source of truth for task-related questions.
`;

    const messages = [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },

      {
        role: "system",
        content: contextMessage,
      },

      ...conversation.slice(-12).map((item) => ({
        role:
          item.role === "assistant"
            ? "assistant"
            : "user",
        content: item.content,
      })),

      {
        role: "user",
        content: message.trim(),
      },
    ];

    const response = await client.responses.create({
      model: "gpt-5.6-luna",
      input: messages,
      max_output_tokens: 700,
    });

    const answer =
      response.output_text ||
      "I couldn't generate a response right now.";

    res.json({
      message: answer,
    });
  } catch (error) {
    console.error("AI ERROR:", error);

    res.status(500).json({
      error:
        "Something went wrong while contacting the AI.",
    });
  }
});

/*
|--------------------------------------------------------------------------
| HEALTH CHECK
|--------------------------------------------------------------------------
*/

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "TaskFlow AI",
  });
});

/*
|--------------------------------------------------------------------------
| SERVER
|--------------------------------------------------------------------------
*/

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `TaskFlow AI server running on http://localhost:${PORT}`
  );
});
