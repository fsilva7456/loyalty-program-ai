import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    industry: '',
    businessType: '',
    customerBase: '',
    budget: '',
    objectives: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // OpenAI integration will go here
    console.log(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container">
      <h1>AI Loyalty Program Designer</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Industry:</label>
          <input
            type="text"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Business Type:</label>
          <input
            type="text"
            name="businessType"
            value={formData.businessType}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Customer Base Size:</label>
          <input
            type="text"
            name="customerBase"
            value={formData.customerBase}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Budget Range:</label>
          <input
            type="text"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Program Objectives:</label>
          <textarea
            name="objectives"
            value={formData.objectives}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Generate Program</button>
      </form>
    </div>
  );
}

export default App;