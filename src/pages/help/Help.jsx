import React from "react";
import "./help.css";

export const Help = () => {
  return (
    <div className="help-page">
      <div className="container">
        <div className="header">
          <h1>Help Center</h1>
          <p className="subtitle">We're here to help you with any questions or issues</p>
        </div>

        <div className="intro">
          <p>
            Welcome to the <span className="brand">Taara</span> Help Center. We're here to assist you with any issues, questions, or guidance you may need while using our platform.
          </p>
        </div>

        <div className="section">
          <h2><span className="number">1</span> Frequently Asked Questions (FAQs)</h2>
          
          <div className="faq-item">
            <h3>How do I find shelters or jobs?</h3>
            <p>Go to the respective pages via the navigation bar. Use filters to refine your search by location or category.</p>
          </div>

          <div className="faq-item">
            <h3>How can I contact someone for support?</h3>
            <p>Visit the <a href="/contact">Contact</a> page to reach out directly through our form or find official contact details.</p>
          </div>

          <div className="faq-item">
            <h3>Can I contribute or volunteer?</h3>
            <p>Yes! Please get in touch via the Contact page and mention how you'd like to help.</p>
          </div>

          <div className="faq-item important">
            <h3>Is my personal information safe?</h3>
            <p>Absolutely. We value your privacy and do not share your data without consent. See our <a href="/privacy">Privacy Policy</a>.</p>
          </div>
        </div>

        <div className="contact-section">
          <h2><span className="number">2</span> Still Need Help?</h2>
          <p>
            If your question wasn't answered above, feel free to reach out. We aim to respond within 24–48 hours.
          </p>
          <p className="cta">
            👉 Visit the <a href="/contact">Contact Page</a> to send us your query.
          </p>
        </div>
      </div>
    </div>
  );
};