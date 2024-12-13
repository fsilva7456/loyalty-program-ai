import React, { useState } from 'react';

const ProgramComparison = () => {
  const [programs, setPrograms] = useState([
    {
      name: 'Basic Points',
      features: {
        'Point Earning Rate': '1 point per $1',
        'Redemption Value': '$0.01 per point',
        'Minimum Redemption': '500 points',
        'Expiration': '12 months',
        'Tiers': 'No',
        'Special Perks': 'Birthday bonus only',
        'Integration Complexity': 'Low',
        'Setup Cost': '$',
        'Maintenance Cost': '$'
      },
      pros: [
        'Simple to understand',
        'Easy to implement',
        'Low maintenance',
        'Quick deployment'
      ],
      cons: [
        'Limited engagement features',
        'Basic rewards only',
        'No differentiation',
        'Limited data insights'
      ],
      score: {
        'Customer Appeal': 3,
        'ROI Potential': 2,
        'Implementation Ease': 5,
        'Marketing Impact': 2,
        'Data Value': 2
      }
    },
    {
      name: 'Tiered Program',
      features: {
        'Point Earning Rate': '1-3 points per $1',
        'Redemption Value': '$0.01-0.015 per point',
        'Minimum Redemption': '1000 points',
        'Expiration': '18 months',
        'Tiers': '3 levels',
        'Special Perks': 'Multiple VIP benefits',
        'Integration Complexity': 'Medium',
        'Setup Cost': '$$',
        'Maintenance Cost': '$$'
      },
      pros: [
        'Strong motivation to advance',
        'Premium customer recognition',
        'Flexible rewards',
        'Better data collection'
      ],
      cons: [
        'More complex to manage',
        'Higher setup costs',
        'Requires ongoing optimization',
        'More staff training needed'
      ],
      score: {
        'Customer Appeal': 4,
        'ROI Potential': 4,
        'Implementation Ease': 3,
        'Marketing Impact': 4,
        'Data Value': 4
      }
    },
    {
      name: 'Hybrid Experience',
      features: {
        'Point Earning Rate': 'Variable + bonuses',
        'Redemption Value': 'Dynamic pricing',
        'Minimum Redemption': 'No minimum',
        'Expiration': '24 months',
        'Tiers': 'Progressive unlocks',
        'Special Perks': 'Experiential rewards',
        'Integration Complexity': 'High',
        'Setup Cost': '$$$',
        'Maintenance Cost': '$$$'
      },
      pros: [
        'Highly engaging',
        'Unique experiences',
        'Deep personalization',
        'Rich customer insights'
      ],
      cons: [
        'Complex implementation',
        'Highest cost',
        'Requires dedicated management',
        'Long setup time'
      ],
      score: {
        'Customer Appeal': 5,
        'ROI Potential': 5,
        'Implementation Ease': 2,
        'Marketing Impact': 5,
        'Data Value': 5
      }
    }
  ]);

  const renderStars = (score) => {
    return '★'.repeat(score) + '☆'.repeat(5 - score);
  };

  const [selectedProgram, setSelectedProgram] = useState(null);

  return (
    <div className="program-comparison p-4 bg-white rounded-lg shadow-sm">
      <h3 className="text-xl font-bold mb-4">Program Comparison</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {programs.map((program, index) => (
          <button
            key={index}
            className={`text-left p-4 border rounded-lg hover:border-blue-500 transition-all ${
              selectedProgram === index ? 'border-blue-500 shadow-md' : ''
            }`}
            onClick={() => setSelectedProgram(index)}
          >
            <h4 className="font-bold mb-2">{program.name}</h4>
            <div className="text-sm text-gray-600 mb-2">
              Setup Cost: {program.features['Setup Cost']}<br />
              Complexity: {program.features['Integration Complexity']}
            </div>
            <div className="text-sm">
              {Object.entries(program.score).map(([metric, score]) => (
                <div key={metric} className="flex justify-between">
                  <span>{metric}:</span>
                  <span className="text-yellow-500">{renderStars(score)}</span>
                </div>
              ))}
            </div>
          </button>
        ))}
      </div>

      {selectedProgram !== null && (
        <div className="selected-program-details">
          <h4 className="font-bold mb-4 text-lg">{programs[selectedProgram].name} Details</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-semibold mb-2">Features</h5>
              <div className="space-y-2">
                {Object.entries(programs[selectedProgram].features).map(([feature, value]) => (
                  <div key={feature} className="flex justify-between">
                    <span className="text-gray-600">{feature}:</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h5 className="font-semibold mb-2 text-green-600">Pros</h5>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {programs[selectedProgram].pros.map((pro, index) => (
                    <li key={index}>{pro}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="font-semibold mb-2 text-red-600">Cons</h5>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {programs[selectedProgram].cons.map((con, index) => (
                    <li key={index}>{con}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgramComparison;