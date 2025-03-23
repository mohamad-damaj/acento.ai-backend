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
      question: "This is a simple question",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ultricies enim eu vulputate consectetur. Nullam vitae tempus nisi, a dapibus.",
    },
    {
      question: "This is a simple question",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ultricies enim eu vulputate consectetur. Nullam vitae tempus nisi, a dapibus.",
    },
    {
      question: "This is a simple question",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ultricies enim eu vulputate consectetur. Nullam vitae tempus nisi, a dapibus.",
    },
    {
      question: "This is a simple question",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ultricies enim eu vulputate consectetur. Nullam vitae tempus nisi, a dapibus.",
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
            Finding a job is hard. <br></br>We get it.
          </h1>
          <p className="hero-description">
            Ascend in your public speaking abilities and ace your next interview
            with Acento.ai.
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </span>
          <span> Maecenas ultricies enim eu vulputate consectetur.</span>
        </div>

        <div id="features" className="feature-cards">
          <div className="feature-card">
            <div className="feature-icon"></div> {/* Placeholder for icon */}
            <h3 className="feature-title">Here's one feature</h3>
            <p className="feature-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              ligula neque, feugiat eu malesuada elementum.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon"></div> {/* Placeholder for icon */}
            <h3 className="feature-title">Here's two features</h3>
            <p className="feature-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              ligula neque, feugiat eu malesuada elementum.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon"></div> {/* Placeholder for icon */}
            <h3 className="feature-title">Here's three features</h3>
            <p className="feature-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              ligula neque, feugiat eu malesuada elementum.
            </p>
          </div>
        </div>
      </section>

      <section className="faq-section">
        <div className="faq-left">
          <h2 className="faq-title">Popular Questions</h2>
          <p className="faq-subtitle">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ligula
            neque, feugiat eu malesuada elementum.
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
              <div
                className={`faq-answer ${openIndex === index ? "open" : ""}`}
              >
                {item.answer}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div className="cta">
          <h3 className="cta-title">This is a really cool title</h3>
          <p className="cta-subtitle">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ligula
            neque, feugiat eu malesuada elementum.
          </p>
          <div className="hero-buttons">
            <button className="signup-button">Sign Up</button>
            <button className="features-button">Features</button>
          </div>
        </div>
      </section>

      <section className="footer">
        <div className="footer-left">
          © 2025 Placeholder. All rights reserved.
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
