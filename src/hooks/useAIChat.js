import { useCallback, useEffect, useRef, useState } from "react";

const API_URL = "http://localhost:5000/api/ai/chat";
const STORAGE_KEY = "taskflow-ai-chat";

const createId = (prefix = "message") =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? `${prefix}-${crypto.randomUUID()}`
    : `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}`;

const createWelcomeMessage = (content = "Hi! I'm TaskFlow AI ✨ I can help you plan your day, find overdue tasks, prioritize your work, and answer questions about your tasks.") => ({
  id: createId("welcome"),
  role: "assistant",
  content,
  createdAt: new Date().toISOString(),
});

const getStoredMessages = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [createWelcomeMessage()];

    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) && parsed.length
      ? parsed
      : [createWelcomeMessage()];
  } catch {
    return [createWelcomeMessage()];
  }
};

export function useAIChat(todos = []) {
  const [messages, setMessages] = useState(getStoredMessages);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const abortControllerRef = useRef(null);
  const messagesRef = useRef(messages);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // Ignore localStorage errors.
    }
  }, [messages]);

  useEffect(() => {
    return () => abortControllerRef.current?.abort();
  }, []);

  const sendMessage = useCallback(
    async (content) => {
      const text = content?.trim();
      if (!text || loading) return null;

      setError(null);
      setLoading(true);

      const userMessage = {
        id: createId("user"),
        role: "user",
        content: text,
        createdAt: new Date().toISOString(),
      };

      const conversation = messagesRef.current.map(({ role, content }) => ({
        role,
        content,
      }));

      const updatedMessages = [...messagesRef.current, userMessage];

      messagesRef.current = updatedMessages;
      setMessages(updatedMessages);

      abortControllerRef.current?.abort();

      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          signal: controller.signal,
          body: JSON.stringify({
            message: text,
            todos,
            conversation,
          }),
        });

        const contentType = response.headers.get("content-type") || "";
        const data = contentType.includes("application/json")
          ? await response.json()
          : { message: await response.text() };

        if (!response.ok) {
          throw new Error(
            data?.error ||
              data?.message ||
              `AI server returned ${response.status}.`
          );
        }

        const assistantText =
          typeof data?.message === "string" ? data.message.trim() : "";

        if (!assistantText) {
          throw new Error("The AI server returned an empty response.");
        }

        const assistantMessage = {
          id: createId("assistant"),
          role: "assistant",
          content: assistantText,
          createdAt: new Date().toISOString(),
        };

        const finalMessages = [
          ...messagesRef.current,
          assistantMessage,
        ];

        messagesRef.current = finalMessages;
        setMessages(finalMessages);

        return assistantMessage;
      } catch (err) {
        if (err?.name === "AbortError") return null;

        console.error("TaskFlow AI error:", err);
        setError(err?.message || "Unable to connect to the AI server.");

        const assistantError = {
          id: createId("error"),
          role: "assistant",
          content:
            "Sorry, I couldn't connect to TaskFlow AI right now. Please check that the AI server is running and try again.",
          error: true,
          retryText: text,
          createdAt: new Date().toISOString(),
        };

        const finalMessages = [
          ...messagesRef.current,
          assistantError,
        ];

        messagesRef.current = finalMessages;
        setMessages(finalMessages);

        return null;
      } finally {
        if (abortControllerRef.current === controller) {
          abortControllerRef.current = null;
        }

        setLoading(false);
      }
    },
    [todos, loading]
  );

  const retryMessage = useCallback(
    async (message) => {
      if (!message?.retryText || loading) return;

      setMessages((current) => {
        const filtered = current.filter((item) => item.id !== message.id);
        messagesRef.current = filtered;
        return filtered;
      });

      await sendMessage(message.retryText);
    },
    [loading, sendMessage]
  );

  const stopGenerating = useCallback(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    setLoading(false);
  }, []);

  const clearConversation = useCallback(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;

    const welcome = createWelcomeMessage(
      "Conversation cleared. What would you like to work on?"
    );

    messagesRef.current = [welcome];
    setMessages([welcome]);
    setError(null);
    setLoading(false);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([welcome]));
    } catch {
      // Ignore storage errors.
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const messageCount = messages.filter(
    ({ role }) => role === "user" || role === "assistant"
  ).length;

  const hasConversation = messages.some(({ role }) => role === "user");

  return {
    messages,
    loading,
    error,
    messageCount,
    hasConversation,
    sendMessage,
    retryMessage,
    stopGenerating,
    clearConversation,
    clearError,
  };
}
