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
import './styles/components.css';

function App() {
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('retail');
  const [currentStep, setCurrentStep] = useState(0);
  const [generatedProgram, setGeneratedProgram] = useState('');
  const [competitorAnalysis, setCompetitorAnalysis] = useState('');
  const [businessCase, setBusinessCase] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setCopySuccess(false);
    setCompetitorAnalysis('');
    setGeneratedProgram('');
    setBusinessCase('');
    setCurrentStep(1);

    try {
      const openai = new OpenAI({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true
      });

      const prompts = generatePrompts(businessName, industry);

      // Get competitor analysis
      setCurrentStep(1);
      const competitorResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompts.competitorPrompt }],
        temperature: 0.7,
      });

      setCompetitorAnalysis(competitorResponse.choices[0].message.content);

      // Generate program design
      setCurrentStep(2);
      const programResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ 
          role: "user", 
          content: prompts.programPrompt(competitorResponse.choices[0].message.content) 
        }],
        temperature: 0.7,
      });

      setGeneratedProgram(programResponse.choices[0].message.content);

      // Generate business case
      setCurrentStep(3);
      const businessCaseResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ 
          role: "user", 
          content: prompts.businessCasePrompt(
            competitorResponse.choices[0].message.content,
            programResponse.choices[0].message.content
          ) 
        }],
        temperature: 0.7,
      });

      setBusinessCase(businessCaseResponse.choices[0].message.content);

    } catch (error) {
      console.error('Error:', error);
      setError('Error: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Loyalty Program Designer</h1>
        <p className="text-gray-600">Enter your business details to generate a comprehensive loyalty program</p>
      </header>

      {currentStep > 0 && <ProgressSteps currentStep={currentStep} />}

      <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-8">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Business Name:</label>
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            required
            placeholder="Enter your business name"
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Industry:</label>
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            required
            className="w-full p-2 border rounded-md"
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
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
        >
          {isLoading ? 'Generating...' : 'Generate Program'}
        </button>
      </form>

      {error && (
        <div className="text-red-600 mb-4">
          <p>{error}</p>
        </div>
      )}

      {competitorAnalysis && (
        <CollapsibleSection title="Competitive Analysis" defaultExpanded={true}>
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4">
              <CompetitorAnalysis analysisData={competitorAnalysis} />
            </div>
          </div>
        </CollapsibleSection>
      )}

      {generatedProgram && (
        <CollapsibleSection title="Program Design" defaultExpanded={currentStep === 2}>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="mb-4">
              <button 
                onClick={() => handleCopy(generatedProgram)}
                className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md text-sm"
              >
                {copySuccess ? 'Copied!' : 'Copy to Clipboard'}
              </button>
            </div>
            <div className="prose max-w-none">
              {generatedProgram.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
        </CollapsibleSection>
      )}

      {businessCase && (
        <CollapsibleSection title="Business Case" defaultExpanded={currentStep === 3}>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="mb-4">
              <button 
                onClick={() => handleCopy(businessCase)}
                className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md text-sm"
              >
                {copySuccess ? 'Copied!' : 'Copy to Clipboard'}
              </button>
            </div>
            <div className="prose max-w-none">
              {businessCase.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
        </CollapsibleSection>
      )}
    </div>
  );
}

export default App;