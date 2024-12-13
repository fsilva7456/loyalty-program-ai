import React, { useState } from 'react';

const CollapsibleSection = ({ title, children, defaultExpanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="collapsible-section">
      <div 
        className="section-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2>{title}</h2>
        <span className="toggle-icon">
          {isExpanded ? '−' : '+'}
        </span>
      </div>
      <div className={`section-content ${isExpanded ? '' : 'collapsed'}`}>
        {children}
      </div>
    </div>
  );
};

export default CollapsibleSection;
