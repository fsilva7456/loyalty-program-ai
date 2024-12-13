import React, { useState } from 'react';

const ImplementationGuide = ({ programDetails, industry }) => {
  const [activePhase, setActivePhase] = useState(0);
  const [activeTasks, setActiveTasks] = useState({});

  const implementationPhases = [
    {
      name: 'Planning & Setup',
      duration: '4-6 weeks',
      tasks: [
        { task: 'Define program objectives and KPIs', status: 'pending' },
        { task: 'Design point structure and rewards', status: 'pending' },
        { task: 'Create program terms and conditions', status: 'pending' },
        { task: 'Select technology platform/vendor', status: 'pending' }
      ],
      technicalNotes: [
        'Document API requirements',
        'Plan data architecture',
        'Define security requirements'
      ]
    },
    {
      name: 'Technical Implementation',
      duration: '6-8 weeks',
      tasks: [
        { task: 'Set up loyalty platform integration', status: 'pending' },
        { task: 'Configure POS/ecommerce integration', status: 'pending' },
        { task: 'Implement customer data tracking', status: 'pending' },
        { task: 'Set up reward automation', status: 'pending' }
      ],
      technicalNotes: [
        'API endpoint setup',
        'Database configuration',
        'Testing environment setup'
      ]
    },
    {
      name: 'Staff Training',
      duration: '2-3 weeks',
      tasks: [
        { task: 'Develop training materials', status: 'pending' },
        { task: 'Conduct staff training sessions', status: 'pending' },
        { task: 'Create quick reference guides', status: 'pending' },
        { task: 'Set up support processes', status: 'pending' }
      ],
      technicalNotes: [
        'Admin portal training',
        'Troubleshooting procedures',
        'Support ticket system setup'
      ]
    },
    {
      name: 'Launch & Marketing',
      duration: '4-5 weeks',
      tasks: [
        { task: 'Prepare marketing materials', status: 'pending' },
        { task: 'Plan launch promotions', status: 'pending' },
        { task: 'Execute soft launch', status: 'pending' },
        { task: 'Monitor and optimize', status: 'pending' }
      ],
      technicalNotes: [
        'Analytics tracking setup',
        'A/B testing configuration',
        'Performance monitoring'
      ]
    }
  ];

  const toggleTask = (phaseIndex, taskIndex) => {
    setActiveTasks(prev => {
      const key = `${phaseIndex}-${taskIndex}`;
      return { ...prev, [key]: !prev[key] };
    });
  };

  const calculateProgress = (phaseIndex) => {
    const phaseTasks = implementationPhases[phaseIndex].tasks;
    const completedTasks = phaseTasks.filter((_, taskIndex) => 
      activeTasks[`${phaseIndex}-${taskIndex}`]
    ).length;
    return (completedTasks / phaseTasks.length) * 100;
  };

  return (
    <div className="implementation-guide p-4 bg-white rounded-lg shadow-sm">
      <h3 className="text-xl font-bold mb-4">Implementation Guide</h3>

      <div className="flex space-x-4 mb-6 overflow-x-auto">
        {implementationPhases.map((phase, index) => (
          <button
            key={index}
            onClick={() => setActivePhase(index)}
            className={`px-4 py-2 rounded-md whitespace-nowrap ${
              activePhase === index
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {phase.name}
          </button>
        ))}
      </div>

      <div className="current-phase">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-lg font-semibold">
            {implementationPhases[activePhase].name}
          </h4>
          <span className="text-sm text-gray-600">
            Duration: {implementationPhases[activePhase].duration}
          </span>
        </div>

        <div className="progress-bar mb-4 bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${calculateProgress(activePhase)}%` }}
          ></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="tasks">
            <h5 className="font-semibold mb-2">Tasks</h5>
            {implementationPhases[activePhase].tasks.map((task, taskIndex) => (
              <div
                key={taskIndex}
                className="flex items-center space-x-2 mb-2"
                onClick={() => toggleTask(activePhase, taskIndex)}
              >
                <input
                  type="checkbox"
                  checked={activeTasks[`${activePhase}-${taskIndex}`] || false}
                  onChange={() => {}}
                  className="rounded"
                />
                <span className={activeTasks[`${activePhase}-${taskIndex}`] ? 'line-through text-gray-500' : ''}>
                  {task.task}
                </span>
              </div>
            ))}
          </div>

          <div className="technical-notes">
            <h5 className="font-semibold mb-2">Technical Notes</h5>
            <ul className="list-disc list-inside text-sm text-gray-700">
              {implementationPhases[activePhase].technicalNotes.map((note, index) => (
                <li key={index} className="mb-1">{note}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImplementationGuide;