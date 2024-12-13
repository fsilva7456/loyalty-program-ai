import React from 'react';

const CompetitorAnalysis = ({ analysisData }) => {
  const parseAnalysis = (text) => {
    if (!text) return null;

    const sections = text.split(/\d\.\s+/).filter(Boolean);
    
    const parsedData = {
      competitors: [],
      marketGaps: [],
      bestPractices: [],
      differentiation: []
    };

    sections.forEach((section) => {
      const [title, ...content] = section.split('\n').filter(Boolean);
      
      if (title.toLowerCase().includes('competitor')) {
        const competitors = content.filter(line => line.includes('-')).map(line => {
          const [name, ...details] = line.replace('-', '').trim().split(':');
          return { name, details: details.join(':').trim() };
        });
        parsedData.competitors = competitors;
      }
      
      if (title.toLowerCase().includes('market gaps')) {
        parsedData.marketGaps = content.filter(line => line.includes('-'))
          .map(line => line.replace('-', '').trim());
      }
      
      if (title.toLowerCase().includes('best practices')) {
        parsedData.bestPractices = content.filter(line => line.includes('-'))
          .map(line => line.replace('-', '').trim());
      }
      
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
    <div className="p-6 space-y-8">
      {/* Competitor Programs Table */}
      <div className="competitor-section">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Key Competitor Programs
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Competitor
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Program Details
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.competitors.map((competitor, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {competitor.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {competitor.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Market Gaps Cards */}
      <div className="market-gaps-section">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
          Market Gaps & Opportunities
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.marketGaps.map((gap, index) => (
            <div 
              key={index} 
              className="p-4 bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-lg shadow-sm"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <p className="ml-3 text-sm text-gray-600">{gap}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Best Practices Section */}
      <div className="best-practices-section">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Industry Best Practices
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.bestPractices.map((practice, index) => (
            <div 
              key={index} 
              className="p-4 bg-gradient-to-br from-green-50 to-white border border-green-100 rounded-lg shadow-sm"
            >
              <div className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-sm text-gray-600">{practice}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Differentiation Strategy Section */}
      <div className="differentiation-section">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
          </svg>
          Recommended Differentiation Strategy
        </h3>
        <div className="bg-gradient-to-br from-purple-50 to-white border border-purple-100 rounded-lg shadow-sm p-6">
          <ul className="space-y-4">
            {data.differentiation.map((strategy, index) => (
              <li key={index} className="flex items-start">
                <svg className="h-5 w-5 text-purple-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                <p className="text-sm text-gray-600">{strategy}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CompetitorAnalysis;