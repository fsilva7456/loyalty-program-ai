import React, { useState } from 'react';
import OpenAI from 'openai';

function App() {
  const [businessName, setBusinessName] = useState('');
  const [generatedProgram, setGeneratedProgram] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const openai = new OpenAI({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true
      });

      const prompt = `Create a loyalty program proposal for a business called ${businessName}. Include program structure, rewards, and implementation suggestions.`;

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      });

      setGeneratedProgram(response.choices[0].message.content);
    } catch (error) {
      console.error('Error:', error);
      setGeneratedProgram('Error generating program. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>AI Loyalty Program Designer</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Business Name:</label>
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Generating...' : 'Generate Program'}
        </button>
      </form>

      {generatedProgram && (
        <div className="output">
          <h2>Generated Program:</h2>
          <pre>{generatedProgram}</pre>
        </div>
      )}
    </div>
  );
}

export default App;