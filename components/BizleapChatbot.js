"use client";

import { useState, useRef, useEffect } from "react";

function formatMessage(text) {
  let formatted = text;
  
  // Parse markdown links: [text](url)
  formatted = formatted.replace(
    /\[([^\]]+)\]\s*\((https?:\/\/[^\s\)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" class="bizleap-link" style="text-decoration: underline; color: inherit; font-weight: 600; transition: opacity 0.2s;">$1</a>'
  );
  
  // Parse raw URLs avoiding ones inside already parsed <a> tags
  formatted = formatted.replace(
    /(<a\b[^>]*>.*?<\/a>)|(https?:\/\/[^\s<)\]]+)/gi,
    (match, aTag, rawUrl) => {
      if (aTag) return aTag;
      return `<a href="${rawUrl}" target="_blank" rel="noopener noreferrer" class="bizleap-link" style="text-decoration: underline; color: inherit; font-weight: 600; transition: opacity 0.2s;">${rawUrl}</a>`;
    }
  );

  // Parse bold and newlines
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  formatted = formatted.replace(/\n/g, "<br/>");
  
  return formatted;
}

const QUICK_CHIPS = [
  { label: "🎨 What are your services?", msg: "What services does Bizleap offer?" },
  { label: "💰 Pricing?", msg: "What is your pricing and how can I get a quote?" },
  { label: "🏆 Show Portfolio", msg: "Can you show me some past work or case studies?" },
  { label: "🤖 AI Services", msg: "Tell me about your AI services" },
  { label: "📞 Contact Us", msg: "I want to contact Bizleap" },
  { label: "📱 Social Media", msg: "Please share the links to your Instagram, LinkedIn, and Facebook." },
];

function TypingDots() {
  return (
    <div style={styles.typingWrap}>
      {[0, 1, 2].map((i) => (
        <span key={i} style={{ ...styles.dot, animationDelay: `${i * 0.2}s` }} />
      ))}
    </div>
  );
}

function Message({ role, text }) {
  const isUser = role === "user";
  return (
    <div style={{ ...styles.msgRow, justifyContent: isUser ? "flex-end" : "flex-start" }}>
      {!isUser && <div style={styles.botAvatar}>B</div>}
      <div
        style={{
          ...styles.bubble,
          ...(isUser ? styles.userBubble : styles.botBubble),
        }}
        dangerouslySetInnerHTML={{
          __html: formatMessage(text),
        }}
      />
      {isUser && <div style={styles.userAvatar}>Y</div>}
    </div>
  );
}

export default function BizleapChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [showChips, setShowChips] = useState(true);
  const [view, setView] = useState("chat");
  const [history, setHistory] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [hasFiredConfetti, setHasFiredConfetti] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const messagesEndRef = useRef(null);
  const chatPanelRef = useRef(null);

  useEffect(() => {
    function handleOutsideInteraction(e) {
      // 1. Handle tooltip hiding
      if (showTooltip) {
        const isScroll = e.type === "scroll";
        const isClickOnTooltipOrFab = e.target.closest && (e.target.closest('.bizleap-fab') || e.target.closest('.bizleap-tooltip'));
        
        if (isScroll || !isClickOnTooltipOrFab) {
          setShowTooltip(false);
        }
      }

      // 2. Handle panel hiding
      if (isOpen) {
        const isClickOnPanelOrFab = e.target.closest && (e.target.closest('.bizleap-fab') || (chatPanelRef.current && chatPanelRef.current.contains(e.target)));
        if (!isClickOnPanelOrFab) {
          setIsOpen(false);
        }
      }
    }
    
    document.addEventListener("mousedown", handleOutsideInteraction);
    document.addEventListener("scroll", handleOutsideInteraction, true);
    
    return () => {
      document.removeEventListener("mousedown", handleOutsideInteraction);
      document.removeEventListener("scroll", handleOutsideInteraction, true);
    };
  }, [isOpen, showTooltip]);


  useEffect(() => {
    if (!document.getElementById("confetti-script")) {
      const script = document.createElement("script");
      script.id = "confetti-script";
      script.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);
  const inputRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem("bizleap_chat_history");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("bizleap_chat_history", JSON.stringify(history));
  }, [history]);

  function handleStartNew() {
    if (messages.length > 1) {
      setHistory(prev => [{
        id: Date.now(),
        date: new Date().toLocaleString(),
        preview: messages.find(m => m.role === "user")?.text || "Conversation",
        messages: [...messages]
      }, ...prev]);
    }
    setHasGreeted(false);
    setMessages([]);
    setShowChips(true);
    setView("chat");
  }

  function handleLoadHistory(item) {
    setMessages(item.messages);
    setShowChips(false);
    setView("chat");
  }

  function handleDeleteHistory(e, id) {
    e.stopPropagation();
    setHistory(prev => prev.filter(h => h.id !== id));
  }

  useEffect(() => {
    if (isOpen && !hasGreeted) {
      setHasGreeted(true);
      setMessages([
        {
          role: "assistant",
          text: "👋 Hey! I am Bizleap's AI assistant.\n\nWe help brands leap forward through **design, marketing, and AI**. Ask me anything — services, pricing, or discuss your project! 🚀",
        },
      ]);
    }
  }, [isOpen, hasGreeted]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Show chips after 10 seconds of inactivity
  useEffect(() => {
    let timer;
    if (!isLoading) {
      timer = setTimeout(() => {
        setShowChips(true);
      }, 10000);
    }
    return () => clearTimeout(timer);
  }, [isLoading, messages, input]);

  // Hide chips if user starts typing (after the first message)
  useEffect(() => {
    if (input.trim().length > 0 && messages.length > 1) {
      setShowChips(false);
    }
  }, [input, messages.length]);

  async function send(text) {
    if (!text.trim() || isLoading) return;
    setShowChips(false);
    const userMsg = { role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    const apiMessages = [...messages, userMsg]
      .filter((m) => m.role === "user" || m.role === "assistant")
      .map((m) => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.text }));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", text: data.reply || "There was a problem, please retry!" }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "⚠️ Connection issue. Please WhatsApp us at: **+91 8128121004**" },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  }

  return (
    <>
      {/* Welcome Tooltip */}
      {showTooltip && !isOpen && (
        <div 
          className="bizleap-tooltip"
          style={styles.tooltip} 
          onClick={() => {
            setShowTooltip(false);
            setIsOpen(true);
            setShowChips(true);
            if (!hasFiredConfetti && window.confetti) {
              window.confetti({
                particleCount: 150,
                spread: 70,
                origin: { x: 0.9, y: 0.9 },
                colors: ['#eab308', '#fef08a', '#ca8a04', '#ffffff']
              });
              setHasFiredConfetti(true);
            }
          }}
        >
          <div style={styles.tooltipText}>
            👋 Hi! I'm <strong>Bizleap AI</strong>. How can I help you grow your brand?
          </div>
          <button 
            style={styles.tooltipClose} 
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            aria-label="Close"
          >
            ×
          </button>
          <div style={styles.tooltipArrow} />
        </div>
      )}      {/* FAB */}
      {!isOpen && (
        <button
          className="bizleap-fab"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onClick={() => {
            setIsOpen(true);
            setShowChips(true);
            if (!hasFiredConfetti && window.confetti) {
              window.confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.9 },
                colors: ["#eab308", "#facc15", "#ffffff"],
              });
              setHasFiredConfetti(true);
            }
          }}
          style={styles.fab}
          aria-label="Open Chat"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
          </svg>
          <span style={styles.fabPulse} />
        </button>
      )}

      {/* Chat Panel */}
      <div
        ref={chatPanelRef}
        style={{
          ...styles.panel,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transform: isOpen ? "translateY(0) scale(1)" : "translateY(20px) scale(0.96)",
        }}
      >
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerAvatar}>B</div>
          <div style={styles.headerInfo}>
            <div style={styles.headerName}>Bizleap Assistant</div>
            <div style={styles.headerStatus}>
              <span style={styles.statusDot} />
              Online • Available now
            </div>
          </div>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setShowMenu(!showMenu)}
                style={styles.hamburgerBtn}
                aria-label="Menu"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
              {showMenu && (
                <div style={styles.dropdownMenu}>
                  <button
                    className="bizleap-dropdown-item"
                    style={styles.dropdownItem}
                    onClick={() => {
                      handleStartNew();
                      setShowMenu(false);
                    }}
                  >
                    Start Conversation
                  </button>
                  <button
                    className="bizleap-dropdown-item"
                    style={styles.dropdownItem}
                    onClick={() => {
                      setView(view === "history" ? "chat" : "history");
                      setShowMenu(false);
                    }}
                  >
                    {view === "history" ? "Back to Chat" : "History"}
                  </button>
                </div>
              )}
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              style={styles.hamburgerBtn}
              aria-label="Close"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <a
            href="https://www.bizleap.in/contact"
            target="_blank"
            rel="noreferrer"
            style={styles.headerLink}
            title="Visit website"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>

        {view === "history" ? (
          <div style={styles.historyPanel}>
            <div style={styles.historyHeader}>Conversation History</div>
            {history.length === 0 ? (
              <div style={styles.emptyHistory}>No previous conversations</div>
            ) : (
              history.map((item) => (
                <div key={item.id} className="bizleap-history-item" style={styles.historyItem} onClick={() => handleLoadHistory(item)}>
                  <div style={{ flex: 1, overflow: "hidden" }}>
                    <div style={styles.historyDate}>{item.date}</div>
                    <div style={styles.historyPreview}>{item.preview}</div>
                  </div>
                  <button 
                    className="bizleap-history-delete"
                    style={styles.historyDeleteBtn}
                    onClick={(e) => handleDeleteHistory(e, item.id)}
                    title="Delete conversation"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>
        ) : (
          <>
            {/* Messages */}
            <div 
              style={styles.messages}
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              {messages.map((m, i) => (
                <Message key={i} role={m.role} text={m.text} />
              ))}
              {isLoading && (
                <div style={{ ...styles.msgRow, justifyContent: "flex-start" }}>
                  <div style={styles.botAvatar}>B</div>
                  <div style={styles.botBubble}>
                    <TypingDots />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Chips */}
            {showChips && (
              <div style={styles.chips}>
                {QUICK_CHIPS.map((c) => (
                  <button key={c.label} className="bizleap-chip" style={styles.chip} onClick={() => send(c.msg)}>
                    {c.label}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div style={styles.inputArea}>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                style={styles.input}
                disabled={isLoading}
              />
              <button
                className="bizleap-send-btn"
                onClick={() => send(input)}
                disabled={!input.trim() || isLoading}
                style={{
                  ...styles.sendBtn,
                  background: input.trim() && !isLoading ? "#eab308" : "rgba(255, 255, 255, 0.1)",
                }}
                aria-label="Send"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M2 21L23 12 2 3v7l15 2-15 2v7z" />
                </svg>
              </button>
            </div>
          </>
        )}

        {/* Footer */}
        <div style={styles.footer}>
          <a href="https://www.bizleap.in" target="_blank" rel="noreferrer" style={styles.footerLink}>
            Powered by Bizleap AI
          </a>
        </div>
      </div>

      <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes bounce-dot {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }
        @keyframes slide-up-fade {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up-bounce {
          0% { opacity: 0; transform: translateY(20px); }
          70% { transform: translateY(-3px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-scale {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }

        /* Hover Effects */
        .bizleap-chip:hover {
          background: rgba(255, 255, 255, 0.1) !important;
          transform: translateY(-1px);
        }
        .bizleap-dropdown-item:hover {
          background: rgba(255, 255, 255, 0.05) !important;
        }
        .bizleap-send-btn:not(:disabled):hover {
          transform: scale(1.08);
        }
        .bizleap-send-btn:not(:disabled):active {
          transform: scale(0.95);
        }
        .bizleap-history-item:hover {
          background: rgba(255, 255, 255, 0.1) !important;
          border-color: rgba(255, 255, 255, 0.2) !important;
        }
        .bizleap-history-delete:hover {
          background: rgba(239, 68, 68, 0.2) !important;
          color: #ef4444 !important;
        }
        .bizleap-link:hover {
          opacity: 0.8;
        }
      `}</style>
    </>
  );
}

const styles = {
  fab: {
    position: "fixed",
    bottom: "96px",
    right: "24px",
    width: "58px",
    height: "58px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #eab308, #facc15)",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 20px rgba(234,179,8,0.45)",
    zIndex: 9999,
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  tooltip: {
    position: "fixed",
    bottom: "168px",
    right: "24px",
    background: "rgba(18, 18, 18, 0.95)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    padding: "12px 16px",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    zIndex: 9997,
    maxWidth: "250px",
    animation: "slide-up-bounce 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
    cursor: "pointer",
  },
  tooltipText: {
    color: "#f8fafc",
    fontSize: "13px",
    lineHeight: "1.4",
    fontFamily: "Inter, -apple-system, sans-serif",
  },
  tooltipClose: {
    background: "transparent",
    border: "none",
    color: "rgba(255,255,255,0.5)",
    fontSize: "18px",
    cursor: "pointer",
    padding: "0",
    lineHeight: "1",
    marginTop: "-2px",
    transition: "color 0.15s",
  },
  tooltipArrow: {
    position: "absolute",
    bottom: "-6px",
    right: "22px",
    width: "12px",
    height: "12px",
    background: "rgba(18, 18, 18, 0.95)",
    borderRight: "1px solid rgba(255, 255, 255, 0.1)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    transform: "rotate(45deg)",
    zIndex: -1,
  },
  fabPulse: {
    position: "absolute",
    width: "58px",
    height: "58px",
    borderRadius: "50%",
    background: "rgba(234,179,8,0.4)",
    animation: "pulse-ring 2s ease-out infinite",
    zIndex: -1,
  },
  panel: {
    position: "fixed",
    bottom: "96px",
    right: "24px",
    width: "360px",
    height: "calc(100vh - 120px)",
    maxHeight: "650px",
    background: "rgba(18, 18, 18, 0.85)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "20px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.3)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    zIndex: 9998,
    transition: "opacity 0.4s ease-out, transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    transformOrigin: "bottom right",
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
  },
  header: {
    background: "rgba(0, 0, 0, 0.4)",
    padding: "14px 16px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexShrink: 0,
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
  },
  headerAvatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #eab308, #facc15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    fontWeight: "700",
    color: "white",
    flexShrink: 0,
  },
  headerInfo: { flex: 1 },
  headerName: { color: "#ffffff", fontSize: "14px", fontWeight: "600" },
  headerStatus: {
    color: "#10b981",
    fontSize: "11px",
    display: "flex",
    alignItems: "center",
    gap: "4px",
    marginTop: "2px",
  },
  statusDot: {
    width: "6px",
    height: "6px",
    background: "#10b981",
    borderRadius: "50%",
    display: "inline-block",
  },
  headerLink: {
    display: "flex",
    alignItems: "center",
    padding: "6px",
    borderRadius: "8px",
    textDecoration: "none",
    transition: "background 0.15s",
  },
  messages: {
    flex: 1,
    minHeight: 0,
    height: "100%",
    overflowY: "scroll",
    overscrollBehavior: "contain",
    WebkitOverflowScrolling: "touch",
    padding: "14px",
    display: "block",
    background: "transparent",
    scrollbarWidth: "thin",
    scrollbarColor: "rgba(255, 255, 255, 0.2) transparent",
  },
  msgRow: {
    display: "flex",
    alignItems: "flex-end",
    gap: "7px",
    marginBottom: "10px", // Replace gap
    flexShrink: 0,
    animation: "fade-in-up 0.3s ease-out forwards",
  },
  botAvatar: {
    width: "26px",
    height: "26px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #eab308, #facc15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "11px",
    fontWeight: "700",
    color: "white",
    flexShrink: 0,
  },
  userAvatar: {
    width: "26px",
    height: "26px",
    borderRadius: "50%",
    background: "#fef08a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "11px",
    fontWeight: "700",
    color: "#ca8a04",
    flexShrink: 0,
  },
  bubble: {
    maxWidth: "75%",
    padding: "9px 13px",
    borderRadius: "16px",
    fontSize: "13px",
    lineHeight: "1.55",
    wordBreak: "break-word",
    overflowWrap: "anywhere",
  },
  botBubble: {
    background: "rgba(255, 255, 255, 0.08)",
    color: "#f8fafc",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    borderBottomLeftRadius: "4px",
  },
  userBubble: {
    background: "#eab308",
    color: "#ffffff",
    borderBottomRightRadius: "4px",
  },
  typingWrap: {
    display: "flex",
    gap: "4px",
    alignItems: "center",
    padding: "2px 0",
  },
  dot: {
    display: "inline-block",
    width: "6px",
    height: "6px",
    background: "#eab308",
    borderRadius: "50%",
    animation: "bounce-dot 1.2s infinite",
  },
  chips: {
    display: "flex",
    flexWrap: "nowrap",
    overflowX: "auto",
    gap: "6px",
    padding: "10px 14px",
    background: "transparent",
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
    flexShrink: 0,
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  },
  chip: {
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "20px",
    padding: "5px 11px",
    fontSize: "12px",
    color: "#f8fafc",
    cursor: "pointer",
    transition: "background 0.2s, transform 0.1s",
    whiteSpace: "nowrap",
  },
  inputArea: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 14px",
    background: "transparent",
    borderTop: "1px solid rgba(255, 255, 255, 0.05)",
    flexShrink: 0,
  },
  input: {
    flex: 1,
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "22px",
    padding: "8px 14px",
    fontSize: "13px",
    background: "rgba(255, 255, 255, 0.05)",
    color: "#f8fafc",
    outline: "none",
    fontFamily: "inherit",
  },
  sendBtn: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: "background 0.15s, transform 0.1s",
  },
  footer: {
    padding: "6px 14px 8px",
    background: "transparent",
    textAlign: "center",
    flexShrink: 0,
  },
  footerLink: {
    fontSize: "10px",
    color: "#9ca3af",
    textDecoration: "none",
  },
  actionsBar: {
    display: "none",
  },
  hamburgerBtn: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  dropdownMenu: {
    position: "absolute",
    top: "100%",
    right: "0",
    marginTop: "12px",
    background: "rgba(25, 25, 25, 0.9)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    zIndex: 10,
    minWidth: "150px",
    animation: "fade-in-scale 0.2s ease-out forwards",
    transformOrigin: "top right",
  },
  dropdownItem: {
    background: "transparent",
    border: "none",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
    padding: "10px 14px",
    fontSize: "13px",
    color: "#f8fafc",
    cursor: "pointer",
    textAlign: "left",
    width: "100%",
    transition: "background 0.15s",
  },
  historyPanel: {
    flex: 1,
    overflowY: "auto",
    padding: "14px",
    background: "transparent",
  },
  historyHeader: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#f8fafc",
    marginBottom: "10px",
  },
  historyItem: {
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "8px",
    padding: "10px",
    marginBottom: "8px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "10px",
  },
  historyDate: {
    fontSize: "10px",
    color: "rgba(255, 255, 255, 0.5)",
    marginBottom: "4px",
  },
  historyPreview: {
    fontSize: "12px",
    color: "#f8fafc",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  historyDeleteBtn: {
    background: "transparent",
    border: "none",
    color: "rgba(255, 255, 255, 0.4)",
    cursor: "pointer",
    padding: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "4px",
    transition: "all 0.15s",
  },
  emptyHistory: {
    fontSize: "12px",
    color: "rgba(255, 255, 255, 0.5)",
    textAlign: "center",
    marginTop: "20px",
  },
};
