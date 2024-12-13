import React, { useState } from 'react';
import OpenAI from 'openai';

function App() {
  const [businessName, setBusinessName] = useState('');
  const [generatedProgram, setGeneratedProgram] = useState('');
  const [competitorAnalysis, setCompetitorAnalysis] = useState('');
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

    try {
      const openai = new OpenAI({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true
      });

      // Get competitor analysis first
      const competitorPrompt = `You are a market research expert. For a business named ${businessName}, provide a detailed competitor analysis of loyalty programs in their industry. Include:
      1. Key Competitor Programs - Analyze existing loyalty programs in the industry
      2. Market Gaps - Identify underserved areas and opportunities
      3. Best Practices - List what works well in the industry
      4. Differentiation Strategy - Recommend how ${businessName} can stand out

      Be specific and provide real examples where possible.`;

      const competitorResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: competitorPrompt }],
        temperature: 0.7,
      });

      setCompetitorAnalysis(competitorResponse.choices[0].message.content);

      // Then generate the loyalty program based on the analysis
      const programPrompt = `You are a loyalty program design expert. Based on this competitor analysis:
      ${competitorResponse.choices[0].message.content}

      Create a detailed loyalty program proposal for ${businessName}. Include:
      1. Program Overview - Key features and unique selling points
      2. Reward Structure - Point system, tiers, and benefits
      3. Implementation Plan - Timeline and key steps
      4. Cost Considerations - Expected investment and ROI
      5. Success Metrics - KPIs to track

      Make it practical and focused on competitive advantages.`;

      const programResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: programPrompt }],
        temperature: 0.7,
      });

      setGeneratedProgram(programResponse.choices[0].message.content);
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

  const formatProgramOutput = (text) => {
    if (!text) return null;
    const sections = text.split(/\d\.\s/);
    return sections.map((section, index) => {
      if (index === 0) return null;
      return (
        <div key={index} className="program-section">
          <h3>{section.split('\n')[0]}</h3>
          <p>{section.split('\n').slice(1).join('\n')}</p>
        </div>
      );
    });
  };

  return (
    <div className="container">
      <header>
        <h1>AI Loyalty Program Designer</h1>
        <p>Enter your business name to generate a custom loyalty program with competitive analysis</p>
      </header>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Business Name:</label>
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            required
            placeholder="Enter your business name"
          />
        </div>
        <button type="submit" disabled={isLoading} className="submit-button">
          {isLoading ? (
            <>
              <div className="spinner"></div>
              <span>Analyzing market & generating program...</span>
            </>
          ) : (
            'Generate Program'
          )}
        </button>
      </form>

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {competitorAnalysis && (
        <div className="output competitor-analysis">
          <div className="output-header">
            <h2>Competitive Analysis</h2>
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
      )}

      {generatedProgram && (
        <div className="output">
          <div className="output-header">
            <h2>Your Loyalty Program</h2>
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
      )}
    </div>
  );
}

export default App;