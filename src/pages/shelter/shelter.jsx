import React, { useState, useMemo, useCallback, useRef } from "react";
import "./shelter.css";
import {shelterData} from "./data/shelterData"

const SearchAndFilterBar = React.memo(function SearchAndFilterBar({
  filterBy,
  setFilterBy,
  searchTerm,
  setSearchTerm,
  filters,
  onFilterChange,
}) {

  // Normalizes input (single spaces, no leading double-space) without stealing cursor
  const handleFilterInput = (field, raw) => {
    const value = raw.replace(/\s{2,}/g, ' ');
    onFilterChange(field, value);
  };

  return (
    <>
      <div className="search-filter-bar">
        <select
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
          className="filter-dropdown"
          aria-label="Select primary field to search"
          name="primaryFilter"
        >
          <option value="state">State</option>
          <option value="city">City</option>
          <option value="district">District</option>
          <option value="shelterName">Shelter House</option>
          <option value="address">Address</option>
          <option value="contactPerson">Contact Person</option>
        </select>

        <div className="search-input-wrapper">
          <span className="search-icon" aria-hidden="true">🔍</span>
          <input
            type="text"
            name="mainSearch"
            autoComplete="off"
            placeholder={`Search by ${filterBy}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            aria-label={`Search shelters by ${filterBy}`}
          />
        </div>
      </div>

      <div className="multi-filter-bar">
        {/* State */}
        <div className="filter-group">
          <label htmlFor="filter-state">State</label>
          <input
            id="filter-state"
            name="state"
            autoComplete="off"
            inputMode="text"
            placeholder="e.g. Gujarat"
            aria-label="Filter by state"
            value={filters.state}
            onChange={(e) => handleFilterInput('state', e.target.value)}
          />
        </div>
        {/* City */}
        <div className="filter-group">
          <label htmlFor="filter-city">City</label>
          <input
            id="filter-city"
            name="city"
            autoComplete="off"
            inputMode="text"
            placeholder="e.g. Jaipur"
            aria-label="Filter by city"
            value={filters.city}
            onChange={(e) => handleFilterInput('city', e.target.value)}
          />
        </div>
        {/* District */}
        <div className="filter-group">
          <label htmlFor="filter-district">District</label>
          <input
            id="filter-district"
            name="district"
            autoComplete="off"
            inputMode="text"
            placeholder="e.g. Vadodara"
            aria-label="Filter by district"
            value={filters.district}
            onChange={(e) => handleFilterInput('district', e.target.value)}
          />
        </div>
        {/* Shelter Name */}
        <div className="filter-group">
          <label htmlFor="filter-shelterName">Shelter</label>
          <input
            id="filter-shelterName"
            name="shelterName"
            autoComplete="off"
            inputMode="text"
            placeholder="Shelter name"
            aria-label="Filter by shelter name"
            value={filters.shelterName}
            onChange={(e) => handleFilterInput('shelterName', e.target.value)}
          />
        </div>
      </div>
    </>
  );
});

export const Shelter = () => {
  // Group related states together for better organization
  // Search and filtering states
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("state");
  const [filters, setFilters] = useState({
    state: "",
    city: "",
    district: "",
    shelterName: ""
  });

  // Table presentation states
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedShelter, setSelectedShelter] = useState(null);

  const tableTopRef = useRef(null);

  // Event handlers with useCallback for better performance
  const handleFilterChange = useCallback((field, value) => {
    setFilters(prev => {
      if (prev[field] === value) return prev; // avoid unnecessary re-renders
      return { ...prev, [field]: value };
    });
    setCurrentPage(1);
  }, [setCurrentPage]);

  const handleSort = useCallback((field) => {
    setSortField(prevSortField => {
      if (prevSortField === field) {
        setSortDirection(prevDirection => prevDirection === 'asc' ? 'desc' : 'asc');
        return field;
      }
      setSortDirection('asc');
      return field;
    });
  }, []);

  // Filter data with proper memoization
  const filteredData = useMemo(() => {
    return shelterData.filter((item) => {
      // First apply main search filter
      const filterValue = item[filterBy]?.toString().toLowerCase() || "";
      if (searchTerm && !filterValue.includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Then apply multi-filters
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true; // Skip empty filters
        const itemValue = (item[key] || "").toString().toLowerCase();
        return itemValue.includes(value.toLowerCase());
      });
    });
  }, [shelterData, filterBy, searchTerm, filters]);

  // Sort the filtered data with proper handling of null/undefined values
  const sortedData = useMemo(() => {
    if (!sortField) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = (a[sortField] ?? "").toString().toLowerCase();
      const bValue = (b[sortField] ?? "").toString().toLowerCase();

      return sortDirection === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
  }, [filteredData, sortField, sortDirection]);

  // Calculate pagination with safeguards for empty data
  const totalItems = sortedData.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  // Ensure currentPage is within valid range
  const safeCurrentPage = Math.min(Math.max(1, currentPage), Math.max(1, totalPages));

  if (safeCurrentPage !== currentPage) {
    setCurrentPage(safeCurrentPage);
  }

  const indexOfLastItem = safeCurrentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  const handlePageChange = useCallback((newPage) => {
    setCurrentPage(newPage);
    // scroll right after state request
    setTimeout(scrollToTop, 0);
  }, [scrollToTop]);

  const handleItemsPerPageChange = useCallback((value) => {
    setItemsPerPage(value);
    setCurrentPage(1);
    setTimeout(scrollToTop, 0);
  }, [scrollToTop]);

  // Component for the pagination controls
  const PaginationControls = () => (
    <div className="pagination-controls">
      <button
        onClick={() => handlePageChange(safeCurrentPage - 1)}
        disabled={safeCurrentPage === 1}
        className="pagination-button"
        aria-label="Previous page"
      >
        <span aria-hidden="true">←</span> Previous
      </button>

      <div className="pagination-info">
        <span className="page-info">
          Page {safeCurrentPage} of {totalPages}
        </span>
        <span className="results-info">
          ({totalItems} {totalItems === 1 ? 'result' : 'results'})
        </span>
      </div>

      <button
        onClick={() => handlePageChange(safeCurrentPage + 1)}
        disabled={safeCurrentPage === totalPages || totalPages === 0}
        className="pagination-button"
        aria-label="Next page"
      >
        Next <span aria-hidden="true">→</span>
      </button>

      <div className="items-per-page-container">
        <label htmlFor="items-per-page">Show:</label>
        <select
          id="items-per-page"
          value={itemsPerPage}
          onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
          className="items-per-page"
          aria-label="Items per page"
        >
          <option value={5} style={{ color: "black" }}>5</option>
          <option value={10} style={{ color: "black" }} >10</option>
          <option value={20} style={{ color: "black" }}>20</option>
          <option value={50} style={{ color: "black" }}>50</option>
        </select>
      </div>
    </div>
  );

  // Shelter card component for mobile view
  const ShelterCard = ({ shelter }) => {
    const handleCardClick = () => setSelectedShelter(shelter);

    return (
      <div
        className="shelter-card"
        onClick={handleCardClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
        aria-label={`View details for ${shelter.shelterName}`}
      >
        <h3 className="card-title">{shelter.shelterName}</h3>
        <div className="card-content">
          <p>
            <strong>Location:</strong>
            <span>
              {shelter.city}
              {shelter.city && shelter.state ? ', ' : ''}
              {shelter.state}
            </span>
          </p>
          <p>
            <strong>Contact:</strong>
            <span>{shelter.contactPerson}</span>
          </p>
          <p>
            <strong>Phone:</strong>
            <a href={`tel:${shelter.phone}`} className="card-phone" onClick={(e) => e.stopPropagation()}>
              {shelter.phone}
            </a>
          </p>
        </div>
        <div className="card-actions">
          <a
            href={`mailto:${shelter.email}`}
            className="card-button email-button"
            onClick={(e) => e.stopPropagation()}
            aria-label={`Email ${shelter.shelterName}`}
          >
            <span aria-hidden="true">✉</span> Email
          </a>
          <a
            href={shelter.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="card-button map-button"
            onClick={(e) => e.stopPropagation()}
            aria-label={`View map for ${shelter.shelterName}`}
          >
            <span aria-hidden="true">🗺️</span> Map
          </a>
        </div>
      </div>
    );
  };

  // Modal component for shelter details
  const ShelterModal = ({ shelter, onClose }) => {
    if (!shelter) return null;

    const modalRef = React.useRef(null);

    React.useEffect(() => {
      // Focus the modal when it opens
      if (modalRef.current) {
        modalRef.current.focus();

        // Scroll the modal into view if needed
        // This ensures the modal is visible regardless of where it was triggered
        window.scrollTo({
          top: window.pageYOffset - 50, // Slight offset from current position
          behavior: "smooth"
        });

        // Alternative approach: center the modal in viewport
        const viewportHeight = window.innerHeight;
        const modalHeight = modalRef.current.offsetHeight;

        if (modalHeight > viewportHeight * 0.8) {
          window.scrollTo({
            top: window.pageYOffset - 100,
            behavior: "smooth"
          });
        } else {
          // Center the modal in the current viewport
          const rect = modalRef.current.getBoundingClientRect();
          const modalTop = rect.top;
          const modalCenter = modalTop + (modalHeight / 2);
          const viewportCenter = viewportHeight / 2;
          const scrollAdjustment = modalCenter - viewportCenter;

          if (Math.abs(scrollAdjustment) > 50) { // Only adjust if significantly off-center
            window.scrollTo({
              top: window.pageYOffset + scrollAdjustment,
              behavior: "smooth"
            });
          }
        }
      }

      // Prevent body scrolling when modal is open
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = 'visible';
      };
    }, []);

    // Close on escape key
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    return (
      <div
        className="modal-overlay"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div
          className="modal-content"
          onClick={(e) => e.stopPropagation()}
          ref={modalRef}
          tabIndex="-1"
          onKeyDown={handleKeyDown}
        >
          <button
            className="close-modal"
            onClick={onClose}
            aria-label="Close details"
          >
            ×
          </button>
          <h2 id="modal-title">{shelter.shelterName}</h2>
          <div className="shelter-details">
            <div className="detail-row">
              <strong>Address:</strong>
              <span>{shelter.address}</span>
            </div>
            <div className="detail-row">
              <strong>Contact Person:</strong>
              <span>{shelter.contactPerson}</span>
            </div>
            <div className="detail-row">
              <strong>Phone:</strong>
              <span className="detail-phone">{shelter.phone}</span>
            </div>
            <div className="detail-row">
              <strong>Email:</strong>
              <a href={`mailto:${shelter.email}`} className="detail-link">
                {shelter.email}
              </a>
            </div>
            <div className="detail-row">
              <strong>Location:</strong>
              <span>{shelter.city}, {shelter.district}, {shelter.state} {shelter.pincode}</span>
            </div>
            <a
              href={shelter.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="view-map-btn"
            >
              <span aria-hidden="true">🗺️</span> View on Google Maps
            </a>
          </div>
        </div>
      </div>
    );
  };
  // Table header component with sort indicators
  const TableHeader = ({ field, children }) => (
    <th
      onClick={(e) => {
        if (field) {
          e.stopPropagation(); // Prevent row click event
          handleSort(field);
        }
      }}
      className={field ? 'sortable' : ''}
      aria-sort={field && sortField === field ? sortDirection : undefined}
    >
      {children}
      {field && sortField === field && (
        <span className="sort-indicator" aria-hidden="true">
          {sortDirection === 'asc' ? ' ↑' : ' ↓'}
        </span>
      )}
    </th>
  );

  const activeFilterEntries = Object.entries(filters).filter(([, v]) => v?.trim());
  const clearSingleFilter = (key) =>
    setFilters((prev) => ({ ...prev, [key]: "" }));
  const clearAllFilters = () =>
    setFilters({ state: "", city: "", district: "", shelterName: "" });

  return (
    <div className="shelter-page">
      <div className="shelter-header">
        <h1>🏠 Shelter Houses Directory</h1>
        <p>
          Safe havens and support centers across India providing shelter, care,
          and assistance to those in need.
        </p>
      </div>

      <div className="filters-help">
        {activeFilterEntries.length > 0 && (
          <div className="active-filters" aria-label="Active filters">
            {activeFilterEntries.map(([k, v]) => (
              <span key={k} className="filter-chip">
                <span className="filter-chip__label">{k}:</span>
                <span className="filter-chip__value" title={v}>{v}</span>
                <button
                  type="button"
                  className="filter-chip__close"
                  aria-label={`Remove ${k} filter`}
                  onClick={() => clearSingleFilter(k)}
                >
                  ×
                </button>
              </span>
            ))}
            <button
              type="button"
              className="clear-filters-btn"
              onClick={clearAllFilters}
              aria-label="Clear all filters"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Search and filter controls */}
      <SearchAndFilterBar
        filterBy={filterBy}
        setFilterBy={setFilterBy}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      {/* Results count display */}
      <div className="results-summary">
        <p>Showing {currentItems.length} of {totalItems} shelters</p>
      </div>

      {/* Mobile view - Card layout */}
      <div className="shelter-cards-container">
        {currentItems.length > 0 ? (
          currentItems.map((item) => (
            <ShelterCard key={item.id} shelter={item} />
          ))
        ) : (
          <div className="no-results">
            No shelters found matching your criteria.
          </div>
        )}
      </div>

      {/* Desktop view - Table layout */}
      <div className="table-container" ref={tableTopRef}>
        <table className="shelter-table" aria-label="Shelter houses directory">
          <thead>
            <tr>
              <TableHeader>S.no</TableHeader>
              <TableHeader>Location</TableHeader>
              <TableHeader field="shelterName">Shelter House</TableHeader>
              <TableHeader field="address">Address</TableHeader>
              <TableHeader field="contactPerson">Contact Person</TableHeader>
              <TableHeader>Phone</TableHeader>
              <TableHeader>Email</TableHeader>
              <TableHeader field="state">State</TableHeader>
              <TableHeader field="district">District</TableHeader>
              <TableHeader field="city">City</TableHeader>
              <TableHeader field="pincode">Pincode</TableHeader>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((item, index) => (
                <tr
                  key={item.id}
                  onClick={() => setSelectedShelter(item)}
                  className="clickable-row"
                >
                  <td>{indexOfFirstItem + index + 1}</td>
                  <td>
                    <a
                      href={item.mapLink}
                      className="map-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`View map for ${item.shelterName}`}
                    >
                      View Map
                    </a>
                  </td>
                  <td className="shelter-name">{item.shelterName}</td>
                  <td>{item.address}</td>
                  <td className="contact-person">
                    {item.contactPerson}
                    <br />
                    <small>Project Director</small>
                  </td>
                  <td className="contact-number">
                    <a href={`tel:${item.phone}`}>{item.phone}</a>
                  </td>
                  <td>
                    <a
                      href={`mailto:${item.email}`}
                      className="email-link"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`Email ${item.shelterName}`}
                    >
                      {item.email}
                    </a>
                  </td>
                  <td>{item.state}</td>
                  <td>{item.district}</td>
                  <td>{item.city}</td>
                  <td>{item.pincode}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="no-results-cell">
                  No shelters found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <PaginationControls />

      {/* Detail view modal */}
      {selectedShelter && (
        <ShelterModal
          shelter={selectedShelter}
          onClose={() => setSelectedShelter(null)}
        />
      )}
    </div>
  );
};