import { useEffect, useRef, useState } from "react";
import {
  Bot,
  ChevronDown,
  MessageCircle,
  RefreshCw,
  Send,
  Sparkles,
  Square,
  Trash2,
  User,
  X,
} from "lucide-react";
import { useAIChat } from "../hooks/useAIChat";

const suggestions = [
  "What should I work on today?",
  "Show me my overdue tasks",
  "How productive was I this week?",
  "Help me prioritize my tasks",
];

export default function AIChat({ todos = [] }) {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [input, setInput] = useState("");

  const {
    messages,
    loading,
    error,
    sendMessage,
    retryMessage,
    stopGenerating,
    clearConversation,
    clearError,
  } = useAIChat(todos);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open && !minimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading, open, minimized]);

  useEffect(() => {
    if (!open || minimized) return;
    const timer = setTimeout(() => inputRef.current?.focus(), 100);
    return () => clearTimeout(timer);
  }, [open, minimized]);

  const send = async (text) => {
    text = text.trim();
    if (!text || loading) return;
    setInput("");
    await sendMessage(text);
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    send(input);
  };

  const handleRetry = (message) => {
    if (!loading) retryMessage(message);
  };

  const handleClose = () => {
    setOpen(false);
    setMinimized(false);
  };

  return (
    <>
      {open && (
        <div className="fixed bottom-4 right-3 z-50 flex max-h-[calc(100dvh-1rem)] w-[calc(100vw-1.5rem)] max-w-[430px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/20 dark:border-slate-800 dark:bg-slate-950 sm:bottom-6 sm:right-6 sm:max-h-[calc(100dvh-3rem)] sm:w-[calc(100vw-3rem)]">
          <header className="relative shrink-0 overflow-hidden border-b border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-950 sm:px-5 sm:py-4">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/[0.06] via-violet-500/[0.06] to-fuchsia-500/[0.04]" />

            <div className="relative flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-violet-600 to-fuchsia-500 text-white shadow-lg shadow-blue-500/20 sm:h-11 sm:w-11">
                  <Bot size={20} />
                  <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500 dark:border-slate-950" />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="truncate text-sm font-bold text-slate-900 dark:text-white">
                      TaskFlow AI
                    </h2>
                    <span className={`shrink-0 rounded-full px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider ${loading ? "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400" : "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400"}`}>
                      {loading ? "Thinking" : "Online"}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-[10px] text-slate-400">
                    Your productivity assistant
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  onClick={clearConversation}
                  className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
                  aria-label="Clear conversation"
                  title="Clear conversation"
                >
                  <Trash2 size={15} />
                </button>

                <button
                  type="button"
                  onClick={() => setMinimized((v) => !v)}
                  className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
                  aria-label={minimized ? "Restore AI assistant" : "Minimize AI assistant"}
                  title={minimized ? "Restore" : "Minimize"}
                >
                  <ChevronDown size={17} className={minimized ? "rotate-180 transition-transform duration-200" : "transition-transform duration-200"} />
                </button>

                <button
                  type="button"
                  onClick={handleClose}
                  className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
                  aria-label="Close AI assistant"
                  title="Close"
                >
                  <X size={17} />
                </button>
              </div>
            </div>
          </header>

          {!minimized ? (
            <>
              <div className="min-h-0 max-h-[50dvh] flex-1 overflow-y-auto overflow-x-hidden bg-slate-50/70 px-3 py-4 dark:bg-slate-900/60 sm:max-h-none sm:px-4 sm:py-5">
                {messages.map((message) => {
                  const assistant = message.role === "assistant";

                  return (
                    <div key={message.id} className={`mb-4 flex min-w-0 gap-2.5 ${assistant ? "justify-start" : "justify-end"}`}>
                      {assistant && (
                        <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 text-white shadow-sm">
                          <Sparkles size={13} />
                        </div>
                      )}

                      <div className={`min-w-0 max-w-[calc(100%-2.5rem)] break-words rounded-2xl px-3.5 py-2.5 text-xs leading-5 shadow-sm sm:max-w-[82%] ${assistant ? "rounded-tl-md border border-slate-200 bg-white text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300" : "rounded-tr-md bg-gradient-to-br from-blue-600 to-violet-600 text-white"}`}>
                        <div className="whitespace-pre-wrap">{message.content}</div>

                        {message.error && message.retryText && (
                          <button
                            type="button"
                            onClick={() => handleRetry(message)}
                            disabled={loading}
                            className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-2.5 py-1.5 text-[9px] font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-50 dark:border-red-900 dark:bg-red-950/40 dark:text-red-400"
                          >
                            <RefreshCw size={11} />
                            Try again
                          </button>
                        )}
                      </div>

                      {!assistant && (
                        <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                          <User size={13} />
                        </div>
                      )}
                    </div>
                  );
                })}

                {loading && (
                  <div className="mb-4 flex items-start gap-2.5">
                    <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 text-white">
                      <Sparkles size={13} />
                    </div>

                    <div className="rounded-2xl rounded-tl-md border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
                      <div className="flex items-center gap-1">
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.3s]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-500 [animation-delay:-0.15s]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-fuchsia-500" />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {error && (
                <div className="flex shrink-0 items-center justify-between gap-2 border-t border-red-100 bg-red-50 px-3 py-2 dark:border-red-950 dark:bg-red-950/30">
                  <p className="min-w-0 truncate text-[9px] text-red-600 dark:text-red-400">
                    {error}
                  </p>
                  <button
                    type="button"
                    onClick={clearError}
                    className="shrink-0 rounded-md p-1 text-red-400 hover:bg-red-100 dark:hover:bg-red-950"
                    aria-label="Dismiss error"
                  >
                    <X size={12} />
                  </button>
                </div>
              )}

              {messages.length <= 1 && (
                <div className="shrink-0 border-t border-slate-200 bg-white px-3 py-3 dark:border-slate-800 dark:bg-slate-950 sm:px-4">
                  <div className="mb-2 flex items-center gap-1.5">
                    <Sparkles size={11} className="text-violet-500" />
                    <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                      Try asking
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {suggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => send(suggestion)}
                        disabled={loading}
                        className="min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-left text-[9px] font-semibold leading-4 text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-blue-900 dark:hover:bg-blue-950/30 dark:hover:text-blue-400"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="shrink-0 border-t border-slate-200 bg-white p-2.5 dark:border-slate-800 dark:bg-slate-950 sm:p-3">
                <div className="flex items-end gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-1.5 transition focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e);
                      }
                    }}
                    placeholder="Ask TaskFlow AI..."
                    rows={1}
                    disabled={loading}
                    className="min-h-10 min-w-0 flex-1 resize-none overflow-y-auto border-0 bg-transparent px-2 py-2 text-xs text-slate-900 outline-none placeholder:text-slate-400 dark:text-white"
                  />

                  <button
                    type="button"
                    onClick={loading ? stopGenerating : handleSubmit}
                    disabled={!loading && !input.trim()}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 text-white shadow-md shadow-blue-500/20 transition hover:scale-105 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label={loading ? "Stop generating" : "Send message"}
                    title={loading ? "Stop generating" : "Send message"}
                  >
                    {loading ? <Square size={13} fill="currentColor" /> : <Send size={15} />}
                  </button>
                </div>

                <p className="mt-2 text-center text-[8px] text-slate-400">
                  Enter to send • Shift + Enter for new line
                </p>
              </form>
            </>
          ) : (
            <div className="flex items-center justify-between gap-3 bg-slate-50 px-4 py-3 dark:bg-slate-900">
              <div className="flex min-w-0 items-center gap-2">
                <MessageCircle size={15} className="shrink-0 text-violet-500" />
                <span className="truncate text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                  Chat minimized
                </span>
              </div>

              <button
                type="button"
                onClick={() => setMinimized(false)}
                className="shrink-0 rounded-lg bg-white px-2.5 py-1.5 text-[9px] font-bold text-violet-600 shadow-sm ring-1 ring-slate-200 transition hover:bg-violet-50 dark:bg-slate-800 dark:ring-slate-700 dark:hover:bg-violet-950/40"
              >
                Restore
              </button>
            </div>
          )}
        </div>
      )}

      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group fixed bottom-4 right-3 z-50 flex max-w-[calc(100vw-1.5rem)] items-center gap-2 rounded-2xl bg-gradient-to-br from-blue-600 via-violet-600 to-fuchsia-500 px-4 py-3 text-white shadow-xl shadow-blue-500/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-violet-500/30 sm:bottom-6 sm:right-6"
          aria-label="Open TaskFlow AI"
        >
          <div className="relative shrink-0">
            <MessageCircle size={19} />
            <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-violet-600" />
          </div>

          <span className="truncate text-xs font-bold">TaskFlow AI</span>

          <ChevronDown size={14} className="shrink-0 rotate-180 opacity-70 transition group-hover:translate-x-0.5" />
        </button>
      )}
    </>
  );
}
