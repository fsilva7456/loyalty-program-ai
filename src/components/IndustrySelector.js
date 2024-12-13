import React from 'react';

const industries = [
  {
    id: 'retail',
    name: 'Retail',
    description: 'For physical and online stores',
    template: {
      features: ['Points per purchase', 'Tiered rewards', 'Birthday bonuses'],
      behavioralPrinciples: ['Loss aversion', 'Goal gradient effect'],
    }
  },
  {
    id: 'restaurant',
    name: 'Restaurant',
    description: 'For dining establishments',
    template: {
      features: ['Visit frequency rewards', 'Special occasion perks', 'Friend referral bonuses'],
      behavioralPrinciples: ['Social proof', 'Habit formation'],
    }
  },
  {
    id: 'services',
    name: 'Professional Services',
    description: 'For service-based businesses',
    template: {
      features: ['Service packages', 'Loyalty tiers', 'Early access benefits'],
      behavioralPrinciples: ['Commitment-consistency', 'Scarcity'],
    }
  }
];

function IndustrySelector({ onSelect }) {
  return (
    <div className="industry-selector">
      <h2>Select Your Industry</h2>
      <div className="industry-grid">
        {industries.map((industry) => (
          <button
            key={industry.id}
            className="industry-card"
            onClick={() => onSelect(industry)}
          >
            <h3>{industry.name}</h3>
            <p>{industry.description}</p>
            <ul>
              {industry.template.features.slice(0, 2).map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </button>
        ))}
      </div>
    </div>
  );
}

export default IndustrySelector;