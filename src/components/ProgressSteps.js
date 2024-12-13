import React from 'react';

const ProgressSteps = ({ currentStep }) => {
  const steps = [
    { id: 1, name: 'Competitor Analysis', description: 'Analyzing market data' },
    { id: 2, name: 'Program Design', description: 'Creating your program' },
    { id: 3, name: 'Business Case', description: 'Building ROI projections' }
  ];

  return (
    <div className="max-w-3xl mx-auto mb-12">
      <div className="relative">
        {/* Progress bar background */}
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t-2 border-gray-200"></div>
        </div>
        
        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step, stepIdx) => {
            const isComplete = currentStep > step.id;
            const isCurrent = currentStep === step.id;
            
            return (
              <div key={step.id} className="flex flex-col items-center">
                <div className="flex items-center justify-center">
                  <span
                    className={`relative z-10 w-10 h-10 flex items-center justify-center rounded-full
                      ${isComplete ? 'bg-blue-600' : isCurrent ? 'bg-blue-500' : 'bg-gray-200'}
                      ${isComplete || isCurrent ? 'text-white' : 'text-gray-600'}
                      transition-colors duration-200`}
                  >
                    {isComplete ? (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span className="text-sm font-semibold">{step.id}</span>
                    )}
                  </span>
                </div>
                <div className="mt-3 flex flex-col items-center">
                  <span
                    className={`text-sm font-medium
                      ${isComplete || isCurrent ? 'text-blue-600' : 'text-gray-500'}`}
                  >
                    {step.name}
                  </span>
                  <span className="text-xs text-gray-500 mt-1">{step.description}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressSteps;