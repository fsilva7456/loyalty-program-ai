import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import { AlertCircle, Loader2, Copy, CheckCircle2 } from 'lucide-react';
import ProgressSteps from './components/ProgressSteps';
import CollapsibleSection from './components/CollapsibleSection';
import CompetitorAnalysis from './components/CompetitorAnalysis';
import ProgramSummary from './components/ProgramSummary';
import ProgramTiers from './components/ProgramTiers';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Your OpenAI API integration logic here
      // const response = await openai.chat.completions.create({...})
      
      // Mock data for demonstration
      const mockData = {
        competitorAnalysis: {
          competitors: [
            { name: 'Competitor A', strengths: ['Strong rewards', 'Easy signup'] },
            { name: 'Competitor B', strengths: ['Digital integration', 'Personalization'] }
          ],
          recommendations: ['Focus on unique value proposition', 'Implement digital rewards']
        },
        program: {
          tiers: [
            { name: 'Bronze', points: 0, benefits: ['2% cashback', 'Birthday reward'] },
            { name: 'Silver', points: 1000, benefits: ['3% cashback', 'Free shipping'] },
            { name: 'Gold', points: 5000, benefits: ['5% cashback', 'Priority service'] }
          ],
          metrics: {
            expectedEngagement: '45%',
            projectedROI: '280%',
            customerRetention: '35%'
          }
        }
      };

      setCompetitorAnalysis(mockData.competitorAnalysis);
      setGeneratedProgram(mockData.program);
      setCurrentStep(1);
    } catch (err) {
      setError('Failed to generate program. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(type);
    setTimeout(() => setCopySuccess(''), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <header className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              AI Loyalty Program Designer
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Generate a data-driven loyalty program tailored to your business needs
            </p>
          </header>
        </div>
      </div>

      {/* Main Content */}
      <main className="-mt-32">
        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
          {/* Progress Steps */}
          <div className="bg-white rounded-lg shadow-sm px-5 py-6 sm:px-6 mb-6">
            <ProgressSteps currentStep={currentStep} />
          </div>

          {/* Form Section */}
          <div className="bg-white rounded-lg shadow-sm px-5 py-6 sm:px-6 mb-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
                    Business Name
                  </label>
                  <input
                    type="text"
                    id="businessName"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
                    Industry
                  </label>
                  <select
                    id="industry"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="retail">Retail</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="services">Professional Services</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="wellness">Health & Wellness</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                      Generating...
                    </>
                  ) : (
                    'Generate Program'
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Error Message */}
          <Transition
            show={!!error}
            enter="transition-opacity duration-150"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="rounded-md bg-red-50 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">{error}</p>
                </div>
              </div>
            </div>
          </Transition>

          {/* Generated Content */}
          {currentStep > 0 && (
            <div className="space-y-6">
              {/* Competitor Analysis */}
              <CollapsibleSection title="Competitive Analysis" defaultExpanded>
                <div className="bg-white rounded-lg shadow-sm px-5 py-6">
                  <CompetitorAnalysis data={competitorAnalysis} />
                </div>
              </CollapsibleSection>

              {/* Program Summary */}
              <CollapsibleSection title="Program Overview" defaultExpanded>
                <div className="bg-white rounded-lg shadow-sm px-5 py-6">
                  <ProgramSummary data={generatedProgram?.metrics} />
                </div>
              </CollapsibleSection>

              {/* Program Tiers */}
              <CollapsibleSection title="Program Tiers" defaultExpanded>
                <div className="bg-white rounded-lg shadow-sm px-5 py-6">
                  <ProgramTiers tiers={generatedProgram?.tiers} />
                </div>
              </CollapsibleSection>

              {/* Business Case */}
              <CollapsibleSection title="Business Case" defaultExpanded>
                <div className="bg-white rounded-lg shadow-sm px-5 py-6">
                  <div className="prose max-w-none">
                    <div className="flex justify-end mb-4">
                      <button
                        onClick={() => handleCopy(businessCase, 'case')}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        {copySuccess === 'case' ? (
                          <>
                            <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 mr-2" />
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                    {businessCase}
                  </div>
                </div>
              </CollapsibleSection>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;