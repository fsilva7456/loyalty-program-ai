import React from 'react';

const ProgressSteps = ({ currentStep }) => {
  const steps = [
    { id: 1, name: 'Competitor Analysis' },
    { id: 2, name: 'Program Design' },
    { id: 3, name: 'Business Case' }
  ];

  return (
    <div className="mb-8">
      <div className="flex justify-between">
        {steps.map((step, index) => {
          const isActive = currentStep >= step.id;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className="flex-1 relative">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {currentStep > step.id ? (
                    <CheckIcon />
                  ) : (
                    <span>{step.id}</span>
                  )}
                </div>
                <span className={`mt-2 text-sm ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                  {step.name}
                </span>
              </div>
              {!isLast && (
                <div
                  className={`absolute top-5 -right-1/2 w-full h-0.5 ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CheckIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

export default ProgressSteps;