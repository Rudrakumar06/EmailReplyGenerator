import { useState } from "react";

const TONES = [
  { label: "Professional", value: "professional", icon: "💼" },
  { label: "Friendly",     value: "friendly",     icon: "😊" },
  { label: "Formal",       value: "formal",        icon: "🏛️" },
  { label: "Concise",      value: "concise",       icon: "⚡" },
  { label: "Apologetic",   value: "apologetic",    icon: "🙏" },
];

const API_URL = "http://localhost:8080/api/email/generate";

export default function EmailReplyGenerator() {
  const [emailContent, setEmailContent] = useState("");
  const [tone, setTone]                 = useState("professional");
  const [reply, setReply]               = useState("");
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState("");
  const [copied, setCopied]             = useState(false);

  const handleGenerate = async () => {
    if (!emailContent.trim()) {
      setError("Please paste an email to reply to.");
      return;
    }

    setLoading(true);
    setError("");
    setReply("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailContent, tone }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Something went wrong.");
      }

      const data = await response.text();
      setReply(data);
    } catch (err) {
      setError(
        err.message ||
          "Could not connect to the server. Make sure your Spring Boot app is running on port 8080."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(reply).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleClear = () => {
    setEmailContent("");
    setReply("");
    setError("");
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>✉️ Email Reply Generator</h1>
        <p style={styles.subtitle}>
          Paste an email, choose a tone, and get an AI-generated reply instantly.
        </p>
      </div>

      <div style={styles.layout}>
        {/* LEFT — Input */}
        <div style={styles.column}>
          {/* Email Input */}
          <div style={styles.card}>
            <label style={styles.label}>📩 Email Content</label>
            <textarea
              style={styles.textarea}
              placeholder="Paste the email you want to reply to..."
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              rows={10}
            />
            <div style={styles.charCount}>{emailContent.length} characters</div>
          </div>

          {/* Tone Selector */}
          <div style={styles.card}>
            <label style={styles.label}>🎨 Select Tone</label>
            <div style={styles.toneGrid}>
              {TONES.map((t) => (
                <button
                  key={t.value}
                  style={{
                    ...styles.toneBtn,
                    ...(tone === t.value ? styles.toneBtnActive : {}),
                  }}
                  onClick={() => setTone(t.value)}
                >
                  <span>{t.icon}</span>
                  <span>{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div style={styles.actions}>
            <button
              style={{
                ...styles.generateBtn,
                ...(loading ? styles.generateBtnDisabled : {}),
              }}
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span style={styles.spinner} /> Generating...
                </>
              ) : (
                "✨ Generate Reply"
              )}
            </button>

            <button style={styles.clearBtn} onClick={handleClear}>
              🗑️ Clear
            </button>
          </div>

          {/* Error */}
          {error && (
            <div style={styles.errorBox}>
              ⚠️ {error}
            </div>
          )}
        </div>

        {/* RIGHT — Output */}
        <div style={styles.column}>
          <div style={{ ...styles.card, flex: 1 }}>
            <div style={styles.outputHeader}>
              <label style={styles.label}>💬 Generated Reply</label>
              {reply && (
                <button style={styles.copyBtn} onClick={handleCopy}>
                  {copied ? "✅ Copied!" : "📋 Copy"}
                </button>
              )}
            </div>

            {loading ? (
              <div style={styles.loadingPlaceholder}>
                <div style={styles.loadingDot} />
                <p style={styles.loadingText}>Generating your reply...</p>
              </div>
            ) : reply ? (
              <div style={styles.replyBox}>{reply}</div>
            ) : (
              <div style={styles.emptyState}>
                <p style={styles.emptyIcon}>📭</p>
                <p style={styles.emptyText}>
                  Your generated reply will appear here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f8f9fc",
    padding: "2rem 1.5rem",
    fontFamily: "'Segoe UI', sans-serif",
  },
  header: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#1a1a2e",
    margin: "0 0 8px",
  },
  subtitle: {
    fontSize: "1rem",
    color: "#6b7280",
    margin: 0,
  },
  layout: {
    display: "flex",
    gap: "1.5rem",
    maxWidth: "1100px",
    margin: "0 auto",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  column: {
    flex: 1,
    minWidth: "300px",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "1.25rem",
    boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
    border: "1px solid #e5e7eb",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#374151",
    letterSpacing: "0.02em",
  },
  textarea: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    lineHeight: "1.6",
    color: "#111827",
    backgroundColor: "#f9fafb",
    resize: "vertical",
    fontFamily: "inherit",
    outline: "none",
    transition: "border-color 0.15s",
  },
  charCount: {
    fontSize: "12px",
    color: "#9ca3af",
    textAlign: "right",
  },
  toneGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
    gap: "8px",
  },
  toneBtn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
    padding: "10px 8px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    backgroundColor: "#f9fafb",
    color: "#6b7280",
    fontSize: "12px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.15s",
    fontFamily: "inherit",
  },
  toneBtnActive: {
    border: "2px solid #6366f1",
    backgroundColor: "#eef2ff",
    color: "#4338ca",
  },
  actions: {
    display: "flex",
    gap: "10px",
  },
  generateBtn: {
    flex: 1,
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#6366f1",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "opacity 0.15s",
    fontFamily: "inherit",
  },
  generateBtnDisabled: {
    opacity: 0.6,
    cursor: "not-allowed",
  },
  clearBtn: {
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    backgroundColor: "#ffffff",
    color: "#6b7280",
    fontSize: "14px",
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "all 0.15s",
  },
  errorBox: {
    backgroundColor: "#fef2f2",
    border: "1px solid #fecaca",
    borderRadius: "8px",
    padding: "10px 14px",
    fontSize: "13px",
    color: "#dc2626",
  },
  outputHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  copyBtn: {
    padding: "5px 12px",
    borderRadius: "6px",
    border: "1px solid #e5e7eb",
    backgroundColor: "#f9fafb",
    color: "#374151",
    fontSize: "12px",
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "all 0.15s",
  },
  replyBox: {
    fontSize: "14px",
    lineHeight: "1.75",
    color: "#111827",
    whiteSpace: "pre-wrap",
    padding: "12px",
    backgroundColor: "#f9fafb",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    minHeight: "200px",
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "200px",
    gap: "8px",
  },
  emptyIcon: {
    fontSize: "2.5rem",
    margin: 0,
  },
  emptyText: {
    fontSize: "14px",
    color: "#9ca3af",
    margin: 0,
    textAlign: "center",
  },
  loadingPlaceholder: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "200px",
    gap: "12px",
  },
  loadingText: {
    fontSize: "14px",
    color: "#9ca3af",
    margin: 0,
  },
  loadingDot: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    border: "3px solid #e5e7eb",
    borderTopColor: "#6366f1",
    animation: "spin 0.8s linear infinite",
  },
  spinner: {
    display: "inline-block",
    width: "14px",
    height: "14px",
    border: "2px solid rgba(255,255,255,0.4)",
    borderTopColor: "#fff",
    borderRadius: "50%",
    animation: "spin 0.7s linear infinite",
  },
};
