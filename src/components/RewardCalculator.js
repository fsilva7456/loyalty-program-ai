import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

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
        points: basePoints * industryMultiplier,
        savings: (basePoints * industryMultiplier * 0.01).toFixed(2),
        perks: 2
      },
      {
        tier: 'Silver',
        points: basePoints * industryMultiplier * 1.25,
        savings: (basePoints * industryMultiplier * 0.015).toFixed(2),
        perks: 4
      },
      {
        tier: 'Gold',
        points: basePoints * industryMultiplier * 1.5,
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

      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2">Projected Rewards</h4>
        <div className="w-full h-64">
          <BarChart
            width={600}
            height={300}
            data={rewardData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="tier" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="points" fill="#8884d8" name="Points" />
            <Bar dataKey="savings" fill="#82ca9d" name="Savings ($)" />
          </BarChart>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {rewardData.map((tier) => (
          <div key={tier.tier} className="p-4 border rounded-lg">
            <h5 className="font-bold">{tier.tier}</h5>
            <div className="text-sm">
              <p>Points: {Math.round(tier.points)}</p>
              <p>Savings: ${tier.savings}</p>
              <p>Perks: {tier.perks}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RewardCalculator;