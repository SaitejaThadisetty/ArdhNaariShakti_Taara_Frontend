import React from "react";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import "../contact/contact.css";

export const Contact = () => {
  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>We would love to hear from you!</p>
      </div>

      {/* Contact Info */}
      <div className="contact-info">
        <div className="contact-item">
          <MdEmail className="contact-icon" />
          <span>hello@taara.org</span>
        </div>
        <div className="contact-item">
          <MdPhone className="contact-icon" />
          <span>+1 (555) 123-4567</span>
        </div>
        <div className="contact-item">
          <MdLocationOn className="contact-icon" />
          <span>123 Innovation Street, Tech City, TC 12345</span>
        </div>
      </div>

      {/* Contact Form */}
      <div className="contact-form">
        <h2>Send us a Message</h2>
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea placeholder="Your Message" required></textarea>
        <button type="submit">Send Message</button>
      </div>
    </div>
  );
};
