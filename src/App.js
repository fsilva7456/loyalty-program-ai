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

  return null; // Component render will be added in next update
}

export default App;