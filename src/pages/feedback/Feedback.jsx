import React, { useState } from "react";
import "./feedback.css";

const Feedback = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    rating: "",
    easyNavigation: "",
    foundInfo: "",
    inclusivity: "",
    chatbotHelp: "",
    jobRelevance: "",
    suggestion: "",
    additionalComment: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Feedback:", formData);
    alert("Thank you for your feedback! 🌈");
  };

  return (
    <div className="feedback-page">
      <div className="container">
        <h1>Ardh Naari Shakti: Empowering Transgender Voices</h1>
        <div>
          <p>
            Thanks a bunch for hanging out with us at Ardh Naari Shakti! Your
            thoughts mean the world to us as we work our magic to build a
            kickass online hangout for all our transgender pals! 🏳️‍⚧️✨
          </p>
          <p>
            This lil' feedback form is like our secret treasure chest, where we
            stash all the gems of your thoughts, ideas, and wild dreams about
            our website. Whether you've stumbled upon some rad resources, faced
            a glitch or two, or just wanna share your big brainwaves, we're all
            ears! 🎉💡
          </p>
          <p>
            Your words help us sprinkle more glitter on our rainbow and make
            sure we're giving you exactly what you need. We're all about that
            #TransPower and this is your chance to be our superhero by sharing
            your honest feedback! 💪🚀
          </p>
          <p>
            So, take a chill pill, grab a virtual cuppa, and spill the tea in
            the form below. We promise to keep it real, keep it confidential,
            and use it to make our space even more awesome for you and the whole
            transgender fam! 🌈☕
          </p>
          <p>
            Big hugs and rainbow kisses,
            <br /> The Ardh Naari Shakti Crew 💖🌈✨
          </p>
        </div>

        <form className="feedback-form" onSubmit={handleSubmit}>
          <h2>Feedback</h2>

          {/* Name */}
          <div className="form-group">
            <label htmlFor="username">
              Hi there! We're thrilled to have you here. Before we dive into
              your feedback, may we know what name you go by?
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Enter your answer"
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your Email"
            />
          </div>

          {/* Rating */}
          <div className="form-group">
            <label htmlFor="rating">
              How was your adventure on our website? Give us a rating from
              "Totally Awesome!" to "Needs Improvement."
            </label>
            <select
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              required
            >
              <option value="">Select...</option>
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Average">Average</option>
              <option value="Poor">Poor</option>
            </select>
          </div>

          {/* Easy Navigation */}
          <div className="form-group">
            <label>Did you find it easy to navigate our website?</label>
            <div className="radio-container">
              <div className="radio-input">
                <input
                  type="radio"
                  id="easyYes"
                  name="easyNavigation"
                  value="Yes"
                  checked={formData.easyNavigation === "Yes"}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="easyYes">Yes</label>
              </div>
              <div className="radio-input">
                <input
                  type="radio"
                  id="easyNo"
                  name="easyNavigation"
                  value="No"
                  checked={formData.easyNavigation === "No"}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="easyNo">No</label>
              </div>
            </div>
          </div>

          {/* Found Info */}
          <div className="form-group">
            <label>
              Were you able to find the information or resources you were
              looking for?
            </label>
            <div className="radio-container">
              <div className="radio-input">
                <input
                  type="radio"
                  id="foundYes"
                  name="foundInfo"
                  value="Yes"
                  checked={formData.foundInfo === "Yes"}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="foundYes">Yes</label>
              </div>
              <div className="radio-input">
                <input
                  type="radio"
                  id="foundNo"
                  name="foundInfo"
                  value="No"
                  checked={formData.foundInfo === "No"}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="foundNo">No</label>
              </div>
            </div>
          </div>

          {/* Inclusivity */}
          <div className="form-group">
            <label>
              Did you feel that our website was inclusive and represented the
              transgender community well?
            </label>
            <div className="radio-container">
              <div className="radio-input">
                <input
                  type="radio"
                  id="inclusiveYes"
                  name="inclusivity"
                  value="Yes"
                  checked={formData.inclusivity === "Yes"}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="inclusiveYes">Yes</label>
              </div>
              <div className="radio-input">
                <input
                  type="radio"
                  id="inclusiveNo"
                  name="inclusivity"
                  value="No"
                  checked={formData.inclusivity === "No"}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="inclusiveNo">No</label>
              </div>
            </div>
          </div>

          {/* Chatbot Help */}
          <div className="form-group">
            <label>
              Did you find our chat bot helpful and efficient in assisting you?
            </label>
            <div className="radio-container-long">
              <div className="radio-input">
                <input
                  type="radio"
                  id="chatbotYes"
                  name="chatbotHelp"
                  value="Yes"
                  checked={formData.chatbotHelp === "Yes"}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="chatbotYes">
                  Yes, it was helpful and efficient.
                </label>
              </div>
              <div className="radio-input">
                <input
                  type="radio"
                  id="chatbotNo"
                  name="chatbotHelp"
                  value="No"
                  checked={formData.chatbotHelp === "No"}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="chatbotNo">
                  No, I encountered difficulties or found it ineffective.
                </label>
              </div>
            </div>
          </div>

          {/* Job Relevance */}
          <div className="form-group">
            <label>
              Did you find the job opportunities provided by us relevant to your
              needs and interests?
            </label>
            <div className="radio-container-long">
              <div className="radio-input">
                <input
                  type="radio"
                  id="jobYes"
                  name="jobRelevance"
                  value="Yes"
                  checked={formData.jobRelevance === "Yes"}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="jobYes">
                  Yes, they were relevant and aligned with my needs.
                </label>
              </div>
              <div className="radio-input">
                <input
                  type="radio"
                  id="jobNo"
                  name="jobRelevance"
                  value="No"
                  checked={formData.jobRelevance === "No"}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="jobNo">
                  No, I found them unrelated or not suitable.
                </label>
              </div>
            </div>
          </div>

          {/* Suggestions */}
          <div className="form-group">
            <label>Any suggestions for improvement?</label>
            <input
              type="text"
              id="suggestion"
              name="suggestion"
              value={formData.suggestion}
              onChange={handleChange}
              required
              placeholder="Enter your answer"
            />
          </div>

          {/* Additional Comments */}
          <div className="form-group">
            <label>
              Please feel free to share any additional comments, feedback, or
              concerns you may have about our website:
            </label>
            <input
              type="text"
              id="additional-comment"
              name="additionalComment"
              value={formData.additionalComment}
              onChange={handleChange}
              required
              placeholder="Enter your answer"
            />
          </div>

          <button className="button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
