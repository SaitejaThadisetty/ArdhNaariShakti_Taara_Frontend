import React, { useState } from "react";
import "./jobs.css";

export const Jobs = () => {
  const [sortOrder, setSortOrder] = useState("newest");
  const [search, setSearch] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [remoteOnly, setRemoteOnly] = useState(false);

  const jobData = [
    {
      company: "KM Trans Logistics",
      role: "Product Manager",
      date: "February 6, 2024",
      jobType: "Full-time",
      location: "New Delhi",
      remote: false,
      description:
        "Conducting market research and analysis to identify opportunities and understand customer needs. Defining product vision, strategy, and roadmap...",
      image:
        "https://www.nicepng.com/png/detail/258-2585308_job-search-skills-girl-using-laptop-png.png",
      link: "https://www.naukri.com/job-listings-product-manager-k-m-trans-logistic-pvt-ltd-new-delhi-4-to-8-years-230223502826?src=seo_srp",
    },
    {
      company: "V-Logis",
      role: "Regional Sales Executive - North",
      date: "January 23, 2024",
      jobType: "Full-time",
      location: "Delhi NCR",
      remote: false,
      description:
        "We are seeking a highly motivated Sales executive with 2+ years extensive experience in the 3PL industry...",
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop",
      link: "https://www.naukri.com/job-listings-regional-sales-executive-north-v-logis-a-division-of-v-trans-i-ltd-delhi-ncr-2-to-5-years-180124006333?src=seo_srp",
    },
    {
      company: "Reckitt",
      role: "R&D Sr. Officer, Health Operations",
      date: "January 18, 2024",
      jobType: "Full-time",
      location: "Gurugram",
      remote: false,
      description:
        "Focusing on one category – Health, Home or Hygiene - you'll find new ways to improve our products...",
      image:
        "https://adash.com/img/vibration-diagnostics/what-is-vibration-meter-analyzer.jpg",
      link: "https://careers.reckitt.com/job/Gurugram-R&D-Sr_-Officer%2C-Health-Operations-Hary-NA/1023776101",
    },
    {
      company: "Tanaq Management Services LLC",
      role: "Data Analyst",
      date: "January 16, 2024",
      jobType: "Contract",
      location: "Remote",
      remote: true,
      description:
        "We are seeking a Data Analyst to join our team in support of a project for the CDC...",
      image: "https://miro.medium.com/v2/resize:fit:1400/0*2fBIH8UQ8qij8fE7.jpg",
      link: "https://recruiting.paylocity.com/recruiting/jobs/Details/2257371",
    },
    {
      company: "Meta",
      role: "UX Researcher, Qualitative",
      date: "January 15, 2024",
      jobType: "Full-time",
      location: "Bangalore",
      remote: true,
      description:
        "Our UX Research team is designing for the global diversity of human needs...",
      image:
        "https://www.testingtime.com/app/uploads/2022/03/UX-Designer-vs.-UX-Researcher-scaled.jpg",
      link: "https://www.metacareers.com/jobs/638857250931296/",
    },
    {
      company: "Meta",
      role: "Employment Investigator",
      date: "January 12, 2024",
      jobType: "Part-time",
      location: "Remote",
      remote: true,
      description:
        "Responsible for conducting prompt, thorough investigations including research, interviews...",
      image:
        "https://www.idissindia.com/detective-agency/pre-and-post-employment-verificationlog-agency-in-chennai.png",
      link: "https://www.metacareers.com/jobs/355075494150397/",
    },
  ];

  const filteredJobs = jobData.filter((job) => {
    const matchesSearch =
      job.role.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.description.toLowerCase().includes(search.toLowerCase());

    const matchesJobType = jobTypeFilter ? job.jobType === jobTypeFilter : true;
    const matchesLocation = locationFilter
      ? job.location.toLowerCase().includes(locationFilter.toLowerCase())
      : true;
    const matchesRemote = remoteOnly ? job.remote === true : true;

    return matchesSearch && matchesJobType && matchesLocation && matchesRemote;
  });

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className="container">
      <div className="filter-container" style={{ gap: "0.8rem" }}>
        <input
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="filter-input"
        />

        <select
          value={jobTypeFilter}
          onChange={(e) => setJobTypeFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">All Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
        </select>

        <input
          type="text"
          placeholder="Location"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="filter-input"
        />

        <label className="filter-label" style={{ fontWeight: "500" }}>
          <input
            type="checkbox"
            checked={remoteOnly}
            onChange={(e) => setRemoteOnly(e.target.checked)}
            style={{ marginRight: "4px" }}
          />
          Remote Only
        </label>

        <label htmlFor="sortOrder" className="filter-label">
          Sort by Date:
        </label>
        <select
          id="sortOrder"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="filter-select"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      <div className="jobs-grid">
        {sortedJobs.map((job, idx) => (
          <div className="card-wrapper fade-in" key={idx}>
            <div className="single-blog">
              <div className="image-wrapper zoom-hover">
                <img src={job.image} alt={`${job.company} - ${job.role}`} />
              </div>
              <div className="content-wrapper">
                <h2>{job.role}</h2>
                <div className="company-info">
                  <h4>{job.company}</h4>
                </div>
                <div className="blog-meta">
                  <p className="blog-meta date-posted">
                    <span>Date Posted: {job.date}</span>
                  </p>
                </div>
                <p className="blog-text">{job.description}</p>
                <div className="button-container">
                  <a
                    href={job.link}
                    target="_blank"
                    rel="noreferrer"
                    className="read-more-btn"
                  >
                    Apply Here
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};