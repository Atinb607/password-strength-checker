// src/components/CriteriaList.jsx

import React from "react";

export default function CriteriaList({ criteriaMet = [], criteriaLabels = [] }) {
  return (
    <div className="criteria-list">
      {criteriaLabels.map((label, i) => (
        <div key={i} className="criterion">
          <span
            className="bullet"
            style={{background: criteriaMet[i] ? "#59c47e" : "#ccc"}}
            aria-label={criteriaMet[i] ? "met" : "not met"}
          />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
