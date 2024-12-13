import React, { useState, useEffect } from 'react';

const RewardCalculator = ({ industry }) => {
  const [spending, setSpending] = useState(100);
  const [frequency, setFrequency] = useState(2);
  const [timeframe, setTimeframe] = useState('month');

  const industryMultipliers = {
    retail: 1.0,
    restaurant: 1.2,
    services: 0.8,
    ecommerce: 1.1,
    wellness: 0.9
  };

  const calculateRewards = () => {
    const basePoints = spending * frequency * (timeframe === 'month' ? 1 : 12);
    const industryMultiplier = industryMultipliers[industry] || 1;
    
    return [
      {
        tier: 'Basic',
        points: Math.round(basePoints * industryMultiplier),
        savings: (basePoints * industryMultiplier * 0.01).toFixed(2),
        perks: 2
      },
      {
        tier: 'Silver',
        points: Math.round(basePoints * industryMultiplier * 1.25),
        savings: (basePoints * industryMultiplier * 0.015).toFixed(2),
        perks: 4
      },
      {
        tier: 'Gold',
        points: Math.round(basePoints * industryMultiplier * 1.5),
        savings: (basePoints * industryMultiplier * 0.02).toFixed(2),
        perks: 6
      }
    ];
  };

  const [rewardData, setRewardData] = useState(calculateRewards());

  useEffect(() => {
    setRewardData(calculateRewards());
  }, [spending, frequency, timeframe, industry]);

  return (
    <div className="reward-calculator p-4 bg-white rounded-lg shadow-sm">
      <h3 className="text-xl font-bold mb-4">Reward Calculator</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Average Spend</label>
          <input
            type="number"
            min="1"
            value={spending}
            onChange={(e) => setSpending(Math.max(1, parseInt(e.target.value) || 0))}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Visit Frequency</label>
          <input
            type="number"
            min="1"
            value={frequency}
            onChange={(e) => setFrequency(Math.max(1, parseInt(e.target.value) || 0))}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Timeframe</label>
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          >
            <option value="month">Per Month</option>
            <option value="year">Per Year</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {rewardData.map((tier) => (
          <div key={tier.tier} className="p-4 border rounded-lg bg-gradient-to-b from-white to-gray-50">
            <div className="flex justify-between items-center mb-2">
              <h5 className="font-bold text-lg">{tier.tier}</h5>
              <span className="text-sm text-gray-500">{tier.perks} perks</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Points:</span>
                <span className="font-medium">{tier.points.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Savings:</span>
                <span className="font-medium text-green-600">${tier.savings}</span>
              </div>
              <div className="relative pt-2">
                <div className="w-full h-2 bg-gray-200 rounded">
                  <div 
                    className="h-2 bg-blue-600 rounded" 
                    style={{ 
                      width: `${(tier.points / (rewardData[2].points)) * 100}%`,
                      transition: 'width 0.3s ease-in-out'
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold mb-2">Projected Annual Value</h4>
        <div className="text-sm text-gray-600">
          <p>Based on your spending patterns and {industry} industry multiplier:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Total Points: {Math.round(rewardData[2].points * (timeframe === 'month' ? 12 : 1)).toLocaleString()}</li>
            <li>Maximum Savings: ${(parseFloat(rewardData[2].savings) * (timeframe === 'month' ? 12 : 1)).toFixed(2)}</li>
            <li>Available Perks: {rewardData[2].perks}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RewardCalculator;