import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  Cpu,
  Globe,
  Shield,
  Zap,
  Mail,
  BarChart3,
  Database,
  Code2,
  Layers,
  HelpCircle,
  ChevronDown,
} from "lucide-react";

function About() {
  const [isSending, setIsSending] = useState(false);

  // State for the interactive FAQ section
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const data = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    };

    setIsSending(true);

    try {
      const response = await fetch("https://formspree.io/f/xqabjdwz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("✅ Inquiry submitted to COINIQ.");
        form.reset();
      } else {
        toast.error("❌ Failed to send message.");
      }
    } catch (error) {
      toast.error("⚠️ Something went wrong.");
    } finally {
      setIsSending(false);
    }
  };

  const faqs = [
    {
      q: "Where does COINIQ get its pricing and volume data?",
      a: "Our data layer aggregates tick-by-tick information from multiple enterprise-grade crypto nodes and public APIs like CoinGecko. This ensures highly precise, real-time metrics for price, market capitalization, and historical volume metrics.",
    },
    {
      q: "How does the Llama 3.1 AI analysis tool function?",
      a: "COINIQ utilizes fine-tuned language models to parse market data metrics, trending velocity volumes, and recent financial news feeds. The integrated intelligence compiles a summary of current market sentiment without executing direct asset trades.",
    },
    {
      q: "Can I track custom parameters or set automated price triggers?",
      a: "Yes. By saving assets directly into your watchlist or tracking purchases via the portfolio ledger panel, you can maintain persistent dashboards that monitor changes over 24-hour cycles.",
    },
  ];

  return (
    <div
      className="container about-page-wrapper"
      style={{ padding: "4rem 1rem", minHeight: "100vh" }}
    >
      <div className="about-content-container" style={{ width: "100%" }}>
        {/* 🌟 Centered Hero Section */}
        <motion.section
          className="about-hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <h1 className="brand-title">
            The Intelligence Behind <span className="text-gold">COINIQ</span>
          </h1>
          <p
            className="hero-subtitle"
            style={{
              color: "#a1a1aa",
              fontSize: "1.15rem",
              maxWidth: "700px",
              margin: "1rem auto 0",
            }}
          >
            Bridging the gap between complex market data arrays and actionable
            investment intelligence.
          </p>
        </motion.section>

        {/* 🚀 Feature Grid (3 Columns) */}
        <div
          className="feature-grid-pro"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
            width: "100%",
            marginBottom: "5rem",
          }}
        >
          <div className="pro-feature-card">
            <Zap className="icon-gold" size={32} />
            <h3>Real-Time Tracking</h3>
            <p>
              Live price updates and market cap rankings powered by
              enterprise-grade APIs.
            </p>
          </div>

          <div className="pro-feature-card">
            <Cpu className="icon-blue" size={32} />
            <h3>AI Analysis</h3>
            <p>
              Llama 3.1 intelligence to help you identify long-term investment
              opportunities.
            </p>
          </div>

          <div className="pro-feature-card">
            <Shield className="icon-green" size={32} />
            <h3>Web3 Ready</h3>
            <p>
              Seamlessly track market parameters to monitor global blockchain
              holdings and historical movements.
            </p>
          </div>
        </div>

        {/* 📊 Section 1: Our Mission & Core Strategy (New Content) */}
        <section style={{ width: "100%", marginBottom: "5rem" }}>
          <div
            style={{
              background: "linear-gradient(135deg, #18181b, #121214)",
              padding: "3rem",
              borderRadius: "24px",
              border: "1px solid rgba(255, 255, 255, 0.05)",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "12px",
                alignItems: "center",
                marginBottom: "1.5rem",
              }}
            >
              <BarChart3 style={{ color: "var(--accent-color)" }} size={28} />
              <h2 style={{ margin: 0, fontSize: "1.8rem" }}>
                Democratizing Digital Assets
              </h2>
            </div>
            <p
              style={{
                color: "#d1d1d6",
                lineHeight: "1.7",
                fontSize: "1rem",
                marginBottom: "1.5rem",
              }}
            >
              The digital asset horizon is expanding rapidly, rendering standard
              tracking metrics obsolete. At COINIQ, our mission is to cut
              through transactional static by aggregating complex data matrices
              into crisp, lightweight, and modern workspaces.
            </p>
            <p
              style={{
                color: "#d1d1d6",
                lineHeight: "1.7",
                fontSize: "1rem",
              }}
            >
              We believe financial sovereignty is built upon three
              non-negotiable vectors: extreme processing speed, factual clarity,
              and intuitive analytical tools. By matching streaming pricing
              tickers with conversational AI frameworks, we equip you with
              institutional-grade insight.
            </p>
          </div>
        </section>

        {/* ⚙️ Section 2: Technical Architecture Breakdown (New Content) */}
        <section style={{ width: "100%", marginBottom: "5rem" }}>
          <h2
            style={{
              fontSize: "2rem",
              marginBottom: "2rem",
              textAlign: "center",
            }}
          >
            Engineered for <span className="text-gold">Sustained Speed</span>
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "1.5rem",
              width: "100%",
            }}
          >
            <div
              style={{
                background: "#1c1c1f",
                padding: "2rem",
                borderRadius: "16px",
                borderLeft: "4px solid #00aaff",
              }}
            >
              <Database
                style={{ color: "#00aaff", marginBottom: "1rem" }}
                size={24}
              />
              <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "1.2rem" }}>
                Low-Latency Pipeline
              </h4>
              <p
                style={{
                  color: "#a1a1aa",
                  fontSize: "0.9rem",
                  lineHeight: "1.5",
                  margin: 0,
                }}
              >
                Ticks and structural order streams pass through highly optimized
                caching protocols to completely avoid front-end rendering lag.
              </p>
            </div>

            <div
              style={{
                background: "#1c1c1f",
                padding: "2rem",
                borderRadius: "16px",
                borderLeft: "4px solid var(--accent-color)",
              }}
            >
              <Code2
                style={{ color: "var(--accent-color)", marginBottom: "1rem" }}
                size={24}
              />
              <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "1.2rem" }}>
                Declarative State
              </h4>
              <p
                style={{
                  color: "#a1a1aa",
                  fontSize: "0.9rem",
                  lineHeight: "1.5",
                  margin: 0,
                }}
              >
                Built upon fine-tuned React hook lifecycles, ensuring your
                search arrays, pagination offsets, and active sorting values
                swap instantly.
              </p>
            </div>

            <div
              style={{
                background: "#1c1c1f",
                padding: "2rem",
                borderRadius: "16px",
                borderLeft: "4px solid #00e676",
              }}
            >
              <Layers
                style={{ color: "#00e676", marginBottom: "1rem" }}
                size={24}
              />
              <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "1.2rem" }}>
                Unified Normalization
              </h4>
              <p
                style={{
                  color: "#a1a1aa",
                  fontSize: "0.9rem",
                  lineHeight: "1.5",
                  margin: 0,
                }}
              >
                Cross-references metric variances across multi-token listings to
                present balanced fiat translations across USD, INR, and EUR
                values.
              </p>
            </div>
          </div>
        </section>

        {/* ❓ Section 3: Interactive FAQ (New Content) */}
        <section style={{ width: "100%", marginBottom: "6rem" }}>
          <div
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "2.5rem",
            }}
          >
            <HelpCircle style={{ color: "var(--accent-color)" }} size={26} />
            <h2 style={{ margin: 0, fontSize: "2rem" }}>
              Frequently Asked Questions
            </h2>
          </div>

          <div
            style={{
              maxWidth: "800px",
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              width: "100%",
            }}
          >
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                style={{
                  background: "#1a1a1a",
                  border: "1px solid #333",
                  borderRadius: "12px",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                }}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  style={{
                    width: "100%",
                    background: "none",
                    border: "none",
                    padding: "1.25rem 1.5rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    color: "#fff",
                    textLeft: "left",
                  }}
                >
                  <span
                    style={{
                      fontSize: "1.05rem",
                      fontWeight: "600",
                      textAlign: "left",
                    }}
                  >
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={18}
                    style={{
                      color: "var(--accent-color)",
                      transform:
                        openFaq === idx ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                    }}
                  />
                </button>
                {openFaq === idx && (
                  <div
                    style={{
                      padding: "0 1.5rem 1.5rem 1.5rem",
                      color: "#a1a1aa",
                      fontSize: "0.95rem",
                      lineHeight: "1.6",
                      borderTop: "1px solid rgba(255,255,255,0.03)",
                    }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 📬 Contact Section (Two Columns) */}
        <section
          className="contact-section-split"
          style={{ width: "100%", marginBottom: "4rem" }}
        >
          <div className="contact-text">
            <h2>
              Get in touch with the <span className="text-gold">IQ Team</span>
            </h2>

            <p
              style={{
                color: "#a1a1aa",
                lineHeight: "1.6",
                marginBottom: "2rem",
              }}
            >
              Have questions about our data sources, AI configurations, or
              partnership opportunities? Drop us a line and an engineer will
              reply directly.
            </p>

            <div className="contact-details">
              <p
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  margin: "12px 0",
                }}
              >
                <Mail style={{ color: "var(--accent-color)" }} size={18} />{" "}
                adityagoud930@gmail.com
              </p>

              <p
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  margin: "12px 0",
                }}
              >
                <Globe style={{ color: "var(--accent-color)" }} size={18} />{" "}
                Global Support 24/7
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="about-contact-form">
            <div className="form-row">
              <input name="name" placeholder="Name" required />
              <input name="email" type="email" placeholder="Email" required />
            </div>

            <textarea
              name="message"
              placeholder="How can we help?"
              rows="4"
              required
            />

            <button type="submit" disabled={isSending}>
              {isSending ? "Processing..." : "Send Message"}
            </button>
          </form>
        </section>

        <footer
          className="about-footer"
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.05)",
            paddingTop: "2rem",
            width: "100%",
            textAlign: "center",
            color: "#52525b",
          }}
        >
          <p style={{ fontSize: "0.9rem" }}>
            © {new Date().getFullYear()} COINIQ Ecosystem • Precision Data •
            Financial Freedom
          </p>
        </footer>
      </div>
    </div>
  );
}

export default About;
