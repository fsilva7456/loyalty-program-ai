import React, { useState } from 'react';

const ProgramCustomizer = ({ onCustomizationChange }) => {
  const [customizations, setCustomizations] = useState({
    pointValue: 0.01, // $1 = 1 point
    tiers: [
      { name: 'Basic', threshold: 0, benefits: ['Base earning rate', 'Special offers'] },
      { name: 'Silver', threshold: 1000, benefits: ['1.25x points', 'Free shipping', 'Priority support'] },
      { name: 'Gold', threshold: 5000, benefits: ['1.5x points', 'VIP events', 'Exclusive products', 'Concierge service'] }
    ],
    features: [
      { id: 'points', enabled: true, name: 'Points per purchase' },
      { id: 'birthday', enabled: true, name: 'Birthday bonus' },
      { id: 'referral', enabled: true, name: 'Referral rewards' },
      { id: 'tiers', enabled: true, name: 'Tier progression' },
      { id: 'expiration', enabled: false, name: 'Point expiration' },
      { id: 'partnerships', enabled: false, name: 'Partner rewards' }
    ],
    behavioralTriggers: [
      { id: 'streak', enabled: true, name: 'Visit streaks', description: 'Reward consistent engagement' },
      { id: 'milestone', enabled: true, name: 'Spending milestones', description: 'Celebrate customer achievements' },
      { id: 'seasonal', enabled: true, name: 'Seasonal promotions', description: 'Time-based incentives' },
      { id: 'social', enabled: false, name: 'Social sharing', description: 'Encourage brand advocacy' }
    ]
  });

  const handleFeatureToggle = (featureId) => {
    setCustomizations(prev => {
      const newFeatures = prev.features.map(feature =>
        feature.id === featureId ? { ...feature, enabled: !feature.enabled } : feature
      );
      const newCustomizations = { ...prev, features: newFeatures };
      onCustomizationChange(newCustomizations);
      return newCustomizations;
    });
  };

  const handleTriggerToggle = (triggerId) => {
    setCustomizations(prev => {
      const newTriggers = prev.behavioralTriggers.map(trigger =>
        trigger.id === triggerId ? { ...trigger, enabled: !trigger.enabled } : trigger
      );
      const newCustomizations = { ...prev, behavioralTriggers: newTriggers };
      onCustomizationChange(newCustomizations);
      return newCustomizations;
    });
  };

  const handlePointValueChange = (value) => {
    setCustomizations(prev => {
      const newCustomizations = { ...prev, pointValue: parseFloat(value) };
      onCustomizationChange(newCustomizations);
      return newCustomizations;
    });
  };

  return (
    <div className="program-customizer p-4 bg-white rounded-lg shadow-sm">
      <h3 className="text-xl font-bold mb-4">Program Customization</h3>

      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2">Point Value</h4>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={customizations.pointValue}
            onChange={(e) => handlePointValueChange(e.target.value)}
            className="p-2 border rounded-md w-24"
          />
          <span className="text-sm text-gray-600">$ per point</span>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2">Program Features</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {customizations.features.map((feature) => (
            <div key={feature.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={feature.enabled}
                onChange={() => handleFeatureToggle(feature.id)}
                className="rounded"
              />
              <label>{feature.name}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2">Behavioral Triggers</h4>
        <div className="grid grid-cols-1 gap-4">
          {customizations.behavioralTriggers.map((trigger) => (
            <div key={trigger.id} className="flex items-center justify-between p-2 border rounded-md">
              <div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={trigger.enabled}
                    onChange={() => handleTriggerToggle(trigger.id)}
                    className="rounded"
                  />
                  <label className="font-medium">{trigger.name}</label>
                </div>
                <p className="text-sm text-gray-600 ml-6">{trigger.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2">Tier Structure</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {customizations.tiers.map((tier, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <h5 className="font-bold">{tier.name}</h5>
              <p className="text-sm text-gray-600">{tier.threshold.toLocaleString()} points</p>
              <ul className="text-sm mt-2">
                {tier.benefits.map((benefit, i) => (
                  <li key={i} className="text-gray-700">• {benefit}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgramCustomizer;