import React from "react";
import "./terms.css";

export const Terms = () => {
  return (
    <div className="terms-page">
      <div className="container">
        <div className="header">
          <h1>Terms of Service</h1>
          <p className="subtitle">Please read these terms carefully before using our service</p>
        </div>

        <div className="intro">
          <p>
            Welcome to <span className="brand">Taara</span>. By accessing or using our website, you agree to the following terms and conditions.
          </p>
        </div>

        <div className="section">
          <h2><span className="number">1</span> Use of Our Service</h2>
          <p>
            You agree to use the platform only for lawful purposes and in a way that does not infringe the rights of others or restrict their use of the platform.
          </p>
        </div>

        <div className="section">
          <h2><span className="number">2</span> Account Responsibility</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account.
          </p>
        </div>

        <div className="section">
          <h2><span className="number">3</span> Intellectual Property</h2>
          <p>
            All content, logos, graphics, and software are the property of Taara or its partners and are protected by copyright and intellectual property laws.
          </p>
        </div>

        <div className="section">
          <h2><span className="number">4</span> User Conduct</h2>
          <p className="important">
            Users must not upload harmful, abusive, or misleading content. We reserve the right to suspend accounts violating these terms.
          </p>
        </div>

        <div className="section">
          <h2><span className="number">5</span> Changes to the Terms</h2>
          <p>
            We may update these Terms of Service at any time. Continued use of the site implies acceptance of the revised terms.
          </p>
        </div>

        <div className="section">
          <h2><span className="number">6</span> Termination</h2>
          <p>
            We reserve the right to terminate or restrict access to users who violate our terms without prior notice.
          </p>
        </div>

        <div className="contact-section">
          <h2><span className="number">7</span> Contact Us</h2>
          <p>
            If you have any questions about these terms, please reach out through the <a href="/contact">Contact Page</a>.
          </p>
        </div>
      </div>
    </div>
  );
};