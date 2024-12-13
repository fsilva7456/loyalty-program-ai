import React, { useState } from 'react';
import OpenAI from 'openai';
import './App.css';

function App() {
  const [businessName, setBusinessName] = useState('');
  const [generatedProgram, setGeneratedProgram] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setCopySuccess(false);

    try {
      const openai = new OpenAI({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true
      });

      const prompt = `Create a detailed loyalty program proposal for ${businessName}. Format the response with these sections:
      1. Program Overview
      2. Reward Structure
      3. Implementation Plan
      4. Cost Considerations
      5. Success Metrics`;

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      });

      setGeneratedProgram(response.choices[0].message.content);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to generate program. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedProgram);
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
      if (index === 0) return null; // Skip the first empty split
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
        <p>Enter your business name to generate a custom loyalty program</p>
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
              <span>Generating...</span>
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

      {generatedProgram && (
        <div className="output">
          <div className="output-header">
            <h2>Your Loyalty Program</h2>
            <button 
              onClick={handleCopy} 
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