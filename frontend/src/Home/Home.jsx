import React, { useState } from "react";
import "./../index.css";
import "./Home.css";
import lines from "./../assets/lines.svg";
import logo1 from "./../assets/logos/logo1.svg";
import logo2 from "./../assets/logos/logo2.svg";
import logo3 from "./../assets/logos/logo3.svg";
import logo4 from "./../assets/logos/logo4.svg";
import logo5 from "./../assets/logos/logo5.svg";
import logo6 from "./../assets/logos/logo6.svg";
import logo7 from "./../assets/logos/logo7.svg";
import logo8 from "./../assets/logos/logo8.svg";
import logo9 from "./../assets/logos/logo9.svg";
import logo10 from "./../assets/logos/logo10.svg";
import logo11 from "./../assets/logos/logo11.svg";
import logo12 from "./../assets/logos/logo12.svg";
import arrow from "./../assets/arrow.svg";
import { signIn } from "../services/auth";
import { Link } from "react-router";

const HomePage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      question: "How does the resume analysis work?",
      answer:
        "Our platform lets you upload your resume and a target job description. It then checks the resume based on industry standard \
        ensures your resume is ATS-friendly, and offers tailored suggestions to match the position's requirements.\
        You'll receive clear, actionable feedback on how to reorganize your content, highlight relevant skills, and remove potential red flags.",
    },
    {
      question: "Can this tool help if my first language isn't English?",
      answer:
        "Absolutely! Our audio and text analysis features are designed to help non-native English speakers refine their communication.\
        We identify filler words, grammar issues, and unclear phrasing—then provide tips for improving clarity and tone.\
        This guidance is especially helpful for immigrants who may need extra support navigating Western workplace expectations.",
    },
    {
      question: "What's the difference between Speech Analysis and Vocal Analysis?",
      answer:
        "Speech Analysis focuses on what you say: It transcribes your spoken words, flags grammar errors, counts filler words, measures words per minute, and checks overall comprehensibility and structure. <br/><br/>Vocal Analysis looks at how you sound: It evaluates your tone, volume, and pitch so you can adjust for a more confident, engaging delivery.",
    },
    {
      question: "Is my data kept private and secure?",
      answer:
        "Yes. We prioritize user confidentiality. Any resume or audio file you upload is processed securely, and we do not share your information with third parties. All feedback is generated solely to help you improve your employability and is not stored beyond your session unless you choose to save it for personal reference.",
    },
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          {/* <div className="logo-icon"></div> */}
          <span className="logo-name">Acento.ai</span>
        </div>
        <div className="navbar-middle">
          <a href="#" className="nav-link">
            Link A
          </a>
          <a href="#" className="nav-link">
            Another Link
          </a>
          <a href="#" className="nav-link">
            One More
          </a>
          <a href="#" className="nav-link">
            Also This
          </a>
        </div>
        <div className="navbar-right">
          <a href="#" className="nav-link login">
            Login
          </a>
          <Link to={"/auth"}>
            <button
              className="signup-button"
              onClick={() => {
                console.log("Signing in!");
                signIn("abcd@gmail.com", "password");
              }}
            >
              Sign Up
            </button>
          </Link>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
          Articulate Your Voice. <br></br>Empower Your Future.
          </h1>
          <p className="hero-description">
          Enhance your speech, polish your resume, and conquer your next interview with Acento.ai
          </p>
          <div className="hero-buttons">
            <button className="signup-button">Sign Up</button>
            <button
              onClick={() => (window.location.href = "#features")}
              className="features-button"
            >
              Features
            </button>
          </div>
          {/* <p className="no-credit-card">no credit card required</p> */}
          <img src={lines} alt="Lines" className="lines-svg" />
        </div>
      </section>

      <section className="teaser-section">
        <div className="teaser" />
      </section>

      {/* <section className="businesses-section">
        <h2 className="section-title">Businesses we've landed</h2>
        <div className="logo-grid">
          <div className="logo-item">
            <img src={logo1} alt="Logo 1" />
          </div>
          <div className="logo-item">
            <img src={logo2} alt="Logo 2" />
          </div>
          <div className="logo-item">
            <img src={logo3} alt="Logo 3" />
          </div>
          <div className="logo-item">
            <img src={logo4} alt="Logo 4" />
          </div>
          <div className="logo-item">
            <img src={logo5} alt="Logo 5" />
          </div>
          <div className="logo-item">
            <img src={logo6} alt="Logo 6" />
          </div>
          <div className="logo-item">
            <img src={logo7} alt="Logo 1" />
          </div>
          <div className="logo-item">
            <img src={logo8} alt="Logo 2" />
          </div>
          <div className="logo-item">
            <img src={logo9} alt="Logo 3" />
          </div>
          <div className="logo-item">
            <img src={logo10} alt="Logo 4" />
          </div>
          <div className="logo-item">
            <img src={logo11} alt="Logo 5" />
          </div>
          <div className="logo-item">
            <img src={logo12} alt="Logo 6" />
          </div>
        </div>
      </section> */}

      <section className="features-section">
        <div className="section-description">
          <span className="highlighted">
          Speak with clarity.
          </span>
          <span> Let our AI refine your voice and elevate your confidence.</span>
        </div>

        <div id="features" className="feature-cards">
          <div className="feature-card">
            <div className="feature-icon"></div> {/* Placeholder for icon */}
            <h3 className="feature-title">Speech Analysis</h3>
            <p className="feature-text">Assess your interview performance by examining transcription accuracy, filler word frequency,
               words-per-minute, grammar, and content structure to ensure clear communication.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon"></div> {/* Placeholder for icon */}
            <h3 className="feature-title">Vocal Analysis</h3>
            <p className="feature-text">
            Evaluate tone, pitch, and volume to help you deliver a confident 
            and engaging verbal presence during interviews and presentations.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon"></div> {/* Placeholder for icon */}
            <h3 className="feature-title">Resume Analysis</h3>
            <p className="feature-text">
            Compare your resume against job descriptions for ATS compatibility and cultural appropriateness, 
            offering tailored feedback to maximize relevance and impact.
            </p>
          </div>
        </div>
      </section>

      <section className="faq-section">
        <div className="faq-left">
          <h2 className="faq-title">Popular Questions</h2>
          <p className="faq-subtitle">
          Not seeing your question here? Check out our Help Center for more detailed articles, 
          or reach out to our support team at support@yourdomain.com. We're here to help you get the most out of our platform!
          </p>
        </div>

        <div className="faq-right">
          {faqData.map((item, index) => (
            <div className="faq-item" key={index}>
              <div
                className="faq-question"
                onClick={() => toggleAccordion(index)}
              >
                {item.question}
                <span
                  className={`faq-arrow ${openIndex === index ? "open" : ""}`}
                >
                  <img src={arrow} alt="Arrow" />
                </span>
              </div>
              <div className={`faq-answer ${openIndex === index ? "open" : ""}`}>
                {item.answer.split("<br/>").map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div className="cta">
          <h3 className="cta-title">Empower Your Career. </h3>
          <p className="cta-subtitle">
          Refine your resume, master interview skills, and navigate cultural norms—our AI-driven platform guides you ever
          </p>
          <div className="hero-buttons">
            <button className="signup-button">Sign Up</button>
            <button className="features-button">Features</button>
          </div>
        </div>
      </section>

      <section className="footer">
        <div className="footer-left">
          © 2025 Acento.ai . All rights reserved.
        </div>
        <div className="footer-right">
          <a href="#" className="footer-link">
            Link A
          </a>
          <a href="#" className="footer-link">
            Another Link
          </a>
          <a href="#" className="footer-link">
            One More
          </a>
          <a href="#" className="footer-link">
            Also This
          </a>
        </div>
      </section>
    </>
  );
};

export default HomePage;
