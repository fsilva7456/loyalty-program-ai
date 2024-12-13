import React, { useState } from 'react';
import ProgressSteps from './components/ProgressSteps';
import CompetitorAnalysis from './components/CompetitorAnalysis';
import ProgramSummary from './components/ProgramSummary';
import ProgramTiers from './components/ProgramTiers';
import { generatePrompts } from './utils/prompts';

function App() {
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('retail');
  const [currentStep, setCurrentStep] = useState(0);
  const [generatedProgram, setGeneratedProgram] = useState(null);
  const [competitorAnalysis, setCompetitorAnalysis] = useState(null);
  const [businessCase, setBusinessCase] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
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
        },
        businessCase: 'Sample business case text with ROI projections and implementation timeline.'
      };

      setCompetitorAnalysis(mockData.competitorAnalysis);
      setGeneratedProgram(mockData.program);
      setBusinessCase(mockData.businessCase);
      setCurrentStep(1);
    } catch (err) {
      setError('Failed to generate program. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>AI Loyalty Program Designer</h1>
      
      {/* Basic Form */}
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="businessName">Business Name:</label>
            <input
              type="text"
              id="businessName"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="industry">Industry:</label>
            <select
              id="industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            >
              <option value="retail">Retail</option>
              <option value="restaurant">Restaurant</option>
              <option value="services">Professional Services</option>
              <option value="ecommerce">E-commerce</option>
              <option value="wellness">Health & Wellness</option>
            </select>
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Generating...' : 'Generate Program'}
          </button>
        </form>
      </div>

      {/* Error Display */}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      {/* Results Section */}
      {currentStep > 0 && (
        <div>
          {competitorAnalysis && (
            <div>
              <h2>Competitive Analysis</h2>
              <CompetitorAnalysis data={competitorAnalysis} />
            </div>
          )}

          {generatedProgram && (
            <>
              <h2>Program Overview</h2>
              <ProgramSummary data={generatedProgram.metrics} />
              
              <h2>Program Tiers</h2>
              <ProgramTiers tiers={generatedProgram.tiers} />
            </>
          )}

          {businessCase && (
            <div>
              <h2>Business Case</h2>
              <p>{businessCase}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;