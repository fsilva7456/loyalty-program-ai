import React, { useState } from 'react';
import OpenAI from 'openai';
import ProgressSteps from './components/ProgressSteps';
import CollapsibleSection from './components/CollapsibleSection';
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

  // Previous handler functions remain the same
  const handleSubmit = async (e) => { /* ... */ };
  const handleCopy = async (text) => { /* ... */ };
  const formatProgramOutput = (text) => { /* ... */ };

  return (
    <div className="container">
      <header>
        <h1>AI Loyalty Program Designer</h1>
        <p>Enter your business details to generate a comprehensive loyalty program</p>
      </header>

      {currentStep > 0 && <ProgressSteps currentStep={currentStep} />}

      {/* Previous form section remains the same */}
      <form onSubmit={handleSubmit} className="input-form">
        {/* ... form content ... */}
      </form>

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {competitorAnalysis && (
        <CollapsibleSection 
          title="Competitive Analysis" 
          defaultExpanded={true}
        >
          <div className="output competitor-analysis">
            <div className="output-header">
              <button 
                onClick={() => handleCopy(competitorAnalysis)} 
                className={`copy-button ${copySuccess ? 'success' : ''}`}
              >
                {copySuccess ? 'Copied!' : 'Copy to Clipboard'}
              </button>
            </div>
            <div className="program-content">
              {formatProgramOutput(competitorAnalysis)}
            </div>
          </div>
        </CollapsibleSection>
      )}

      {generatedProgram && (
        <CollapsibleSection 
          title="Program Design & Behavioral Science" 
          defaultExpanded={currentStep === 2}
        >
          <div className="output program-design">
            <div className="output-header">
              <button 
                onClick={() => handleCopy(generatedProgram)} 
                className={`copy-button ${copySuccess ? 'success' : ''}`}
              >
                {copySuccess ? 'Copied!' : 'Copy to Clipboard'}
              </button>
            </div>
            <div className="program-content">
              {formatProgramOutput(generatedProgram)}
            </div>
          </div>
        </CollapsibleSection>
      )}

      {businessCase && (
        <CollapsibleSection 
          title="Business Case" 
          defaultExpanded={currentStep === 3}
        >
          <div className="output business-case">
            <div className="output-header">
              <button 
                onClick={() => handleCopy(businessCase)} 
                className={`copy-button ${copySuccess ? 'success' : ''}`}
              >
                {copySuccess ? 'Copied!' : 'Copy to Clipboard'}
              </button>
            </div>
            <div className="program-content">
              {formatProgramOutput(businessCase)}
            </div>
          </div>
        </CollapsibleSection>
      )}
    </div>
  );
}

export default App;