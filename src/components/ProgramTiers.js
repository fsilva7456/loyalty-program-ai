import React from 'react';

const ProgramTiers = () => {
  const tiers = [
    {
      name: 'Bronze',
      points: '0',
      color: 'from-yellow-700 to-yellow-900',
      benefits: [
        'Base points earning rate',
        'Member-only discounts',
        'Birthday reward',
        'Email updates'
      ]
    },
    {
      name: 'Silver',
      points: '1,000',
      color: 'from-gray-400 to-gray-600',
      benefits: [
        '1.25x points earning rate',
        'Priority customer service',
        'Exclusive events access',
        'Free shipping on orders',
        'Early access to sales'
      ]
    },
    {
      name: 'Gold',
      points: '5,000',
      color: 'from-yellow-400 to-yellow-600',
      benefits: [
        '1.5x points earning rate',
        'VIP customer service',
        'Priority waitlist',
        'Free express shipping',
        'Dedicated account manager',
        'Annual reward bonus'
      ]
    },
    {
      name: 'Platinum',
      points: '10,000',
      color: 'from-purple-600 to-purple-800',
      benefits: [
        '2x points earning rate',
        'Concierge service',
        'Exclusive products',
        'Free returns',
        'Surprise gifts',
        'Special events',
        'Partner benefits'
      ]
    }
  ];

  return (
    <div className="py-6">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Program Tiers & Benefits</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tiers.map((tier, index) => (
          <div
            key={tier.name}
            className={`relative rounded-lg overflow-hidden transition-transform hover:scale-105 transform duration-200`}
          >
            {/* Tier Header */}
            <div className={`bg-gradient-to-r ${tier.color} p-6 text-white`}>
              <h4 className="text-xl font-semibold">{tier.name}</h4>
              <div className="mt-2 flex items-baseline">
                <span className="text-sm">Points Required:</span>
                <span className="ml-2 font-bold">{tier.points}</span>
              </div>
            </div>

            {/* Benefits List */}
            <div className="bg-white p-6 border-x border-b border-gray-200 h-full">
              <ul className="space-y-3">
                {tier.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm text-gray-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Progress Indicator */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200">
              <div
                className="h-full bg-white bg-opacity-50"
                style={{ width: `${(index + 1) * 25}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgramTiers;