import React, { useState } from 'react';
import OpenAI from 'openai';
import ProgressSteps from './components/ProgressSteps';
import CollapsibleSection from './components/CollapsibleSection';
import CompetitorAnalysis from './components/CompetitorAnalysis';
import RewardCalculator from './components/RewardCalculator';
import ProgramCustomizer from './components/ProgramCustomizer';
import ImplementationGuide from './components/ImplementationGuide';
import ProgramComparison from './components/ProgramComparison';
import { generatePrompts } from './utils/prompts';

function App() {
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('retail');
  const [currentStep, setCurrentStep] = useState(0);
  const [generatedProgram, setGeneratedProgram] = useState('');
  const [competitorAnalysis, setCompetitorAnalysis] = useState('');
  const [businessCase, setBusinessCase] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState('');

  // Existing handleSubmit and other functions remain the same

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Loyalty Program Designer
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Generate a data-driven loyalty program tailored to your business needs
          </p>
        </header>

        {currentStep > 0 && <ProgressSteps currentStep={currentStep} />}

        <div className="max-w-xl mx-auto mb-12 bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">
                Business Name
              </label>
              <input
                id="businessName"
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                required
                placeholder="Enter your business name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                Industry
              </label>
              <select
                id="industry"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option value="retail">Retail</option>
                <option value="restaurant">Restaurant</option>
                <option value="services">Professional Services</option>
                <option value="ecommerce">E-commerce</option>
                <option value="wellness">Health & Wellness</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Generating program...</span>
                </div>
              ) : (
                'Generate Program'
              )}
            </button>
          </form>
        </div>

        {error && (
          <div className="max-w-xl mx-auto mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {competitorAnalysis && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <CollapsibleSection title="Competitive Analysis" defaultExpanded={true}>
                <CompetitorAnalysis analysisData={competitorAnalysis} />
              </CollapsibleSection>
            </div>
          )}

          {generatedProgram && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <CollapsibleSection title="Program Design" defaultExpanded={currentStep === 2}>
                <div className="p-6">
                  <div className="mb-4">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(generatedProgram);
                        setCopySuccess('program');
                        setTimeout(() => setCopySuccess(''), 2000);
                      }}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      {copySuccess === 'program' ? (
                        <>
                          <svg className="-ml-1 mr-2 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Copied!
                        </>
                      ) : (
                        <>Copy to Clipboard</>
                      )}
                    </button>
                  </div>
                  <div className="prose max-w-none">
                    {generatedProgram.split('\n').map((line, i) => (
                      <p key={i} className="mb-2">{line}</p>
                    ))}
                  </div>
                </div>
              </CollapsibleSection>
            </div>
          )}

          {businessCase && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <CollapsibleSection title="Business Case" defaultExpanded={currentStep === 3}>
                <div className="p-6">
                  <div className="mb-4">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(businessCase);
                        setCopySuccess('case');
                        setTimeout(() => setCopySuccess(''), 2000);
                      }}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      {copySuccess === 'case' ? (
                        <>
                          <svg className="-ml-1 mr-2 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Copied!
                        </>
                      ) : (
                        <>Copy to Clipboard</>
                      )}
                    </button>
                  </div>
                  <div className="prose max-w-none">
                    {businessCase.split('\n').map((line, i) => (
                      <p key={i} className="mb-2">{line}</p>
                    ))}
                  </div>
                </div>
              </CollapsibleSection>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;