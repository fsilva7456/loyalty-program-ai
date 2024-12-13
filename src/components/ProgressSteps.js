import React from 'react';

const ProgressSteps = ({ currentStep }) => {
  const steps = [
    { id: 1, name: 'Competitor Analysis', status: 'completed' },
    { id: 2, name: 'Program Design', status: 'active' },
    { id: 3, name: 'Business Case', status: 'pending' }
  ].map(step => ({
    ...step,
    status: currentStep > step.id ? 'completed' : currentStep === step.id ? 'active' : 'pending'
  }));

  return (
    <div className="progress-container">
      <div className="progress-steps">
        {steps.map((step) => (
          <div key={step.id} className="progress-step">
            <div className={`step-indicator ${step.status}`}>
              {step.status === 'completed' ? '✓' : step.id}
            </div>
            <span className="step-name">{step.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressSteps;
