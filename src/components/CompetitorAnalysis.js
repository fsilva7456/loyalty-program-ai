import React from 'react';

const CompetitorAnalysis = ({ analysisData }) => {
  // Function to parse the raw analysis text into structured data
  const parseAnalysis = (text) => {
    if (!text) return null;

    // Split into sections using numbered headers
    const sections = text.split(/\d\.\s+/).filter(Boolean);
    
    const parsedData = {
      competitors: [],
      marketGaps: [],
      bestPractices: [],
      differentiation: []
    };

    sections.forEach((section, index) => {
      const [title, ...content] = section.split('\n').filter(Boolean);
      
      // Parse competitor programs
      if (title.toLowerCase().includes('competitor')) {
        const competitors = content.filter(line => line.includes('-')).map(line => {
          const [name, ...details] = line.replace('-', '').trim().split(':');
          return { name, details: details.join(':').trim() };
        });
        parsedData.competitors = competitors;
      }
      
      // Parse market gaps
      if (title.toLowerCase().includes('market gaps')) {
        parsedData.marketGaps = content.filter(line => line.includes('-'))
          .map(line => line.replace('-', '').trim());
      }
      
      // Parse best practices
      if (title.toLowerCase().includes('best practices')) {
        parsedData.bestPractices = content.filter(line => line.includes('-'))
          .map(line => line.replace('-', '').trim());
      }
      
      // Parse differentiation strategy
      if (title.toLowerCase().includes('differentiation')) {
        parsedData.differentiation = content.filter(line => line.includes('-'))
          .map(line => line.replace('-', '').trim());
      }
    });

    return parsedData;
  };

  const data = parseAnalysis(analysisData);
  if (!data) return null;

  return (
    <div className="competitor-analysis-formatted space-y-6">
      {/* Competitor Programs Table */}
      <div className="competitor-section">
        <h3 className="text-lg font-semibold mb-3">Key Competitor Programs</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left font-semibold text-gray-900 border-b">Competitor</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-900 border-b">Program Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.competitors.map((competitor, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{competitor.name}</td>
                  <td className="py-3 px-4">{competitor.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Market Gaps Cards */}
      <div className="market-gaps-section">
        <h3 className="text-lg font-semibold mb-3">Market Gaps & Opportunities</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.marketGaps.map((gap, index) => (
            <div key={index} className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
              <div className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <p>{gap}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Best Practices Section */}
      <div className="best-practices-section">
        <h3 className="text-lg font-semibold mb-3">Industry Best Practices</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.bestPractices.map((practice, index) => (
            <div key={index} className="p-4 bg-green-50 border border-green-100 rounded-lg">
              <div className="flex items-center space-x-2">
                <span className="text-green-500 font-bold">✓</span>
                <p>{practice}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Differentiation Strategy Section */}
      <div className="differentiation-section">
        <h3 className="text-lg font-semibold mb-3">Recommended Differentiation Strategy</h3>
        <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
          <ul className="space-y-3">
            {data.differentiation.map((strategy, index) => (
              <li key={index} className="flex items-start">
                <span className="text-purple-500 mr-2">★</span>
                <p>{strategy}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CompetitorAnalysis;