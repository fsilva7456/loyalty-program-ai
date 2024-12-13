import React, { useState } from 'react';
import OpenAI from 'openai';

function App() {
  const [businessName, setBusinessName] = useState('');
  const [generatedProgram, setGeneratedProgram] = useState('');
  const [competitorAnalysis, setCompetitorAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const searchCompetitors = async (businessName) => {
    const searchQuery = `${businessName} competitors loyalty program rewards`;
    const searchResponse = await fetch('/api/brave-web-search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: searchQuery, count: 5 })
    });

    const searchData = await searchResponse.json();
    return searchData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setCopySuccess(false);

    try {
      // First, search for competitor information
      const competitorData = await searchCompetitors(businessName);
      
      const openai = new OpenAI({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true
      });

      // Analyze competitor data first
      const competitorPrompt = `Based on this search data about competitors: ${JSON.stringify(competitorData)},
      provide a competitive analysis for ${businessName}'s loyalty program. Include:
      1. Key Competitor Programs
      2. Market Gaps and Opportunities
      3. Competitive Advantages to Target
      4. Recommendations for Differentiation`;

      const competitorResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: competitorPrompt }],
        temperature: 0.7,
      });

      setCompetitorAnalysis(competitorResponse.choices[0].message.content);

      // Then generate the loyalty program incorporating competitive insights
      const programPrompt = `Create a detailed loyalty program proposal for ${businessName}, incorporating our competitive analysis. Format the response with these sections:
      1. Program Overview
      2. Reward Structure
      3. Implementation Plan
      4. Cost Considerations
      5. Success Metrics
      Make sure to highlight competitive advantages and unique features that will help the business stand out.`;

      const programResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: programPrompt }],
        temperature: 0.7,
      });

      setGeneratedProgram(programResponse.choices[0].message.content);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to generate program. Please check your API key and try again.');
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
              <span>Analyzing competitors & generating program...</span>
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