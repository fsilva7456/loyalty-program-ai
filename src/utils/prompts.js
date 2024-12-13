export const generatePrompts = (businessName, industry, options = {}) => {
  const competitorPrompt = `You are a market research expert specializing in ${industry} loyalty programs. For ${businessName}, provide a detailed competitor analysis focused on their industry. Include:

1. Key Competitor Programs
- Analyze 3-4 leading ${industry} loyalty programs
- Focus on unique features and their effectiveness
- Include specific examples from market leaders

2. Market Gaps
- Identify underserved customer needs in ${industry}
- Highlight technological opportunities
- Note emerging trends in customer behavior

3. Best Practices
- Detail ${industry}-specific success factors
- Include engagement metrics and benchmarks
- Highlight innovative approaches

4. Differentiation Strategy
- Recommend unique positioning for ${businessName}
- Focus on industry-specific advantages
- Include digital integration opportunities

Provide concrete examples and industry-specific metrics where possible.`;

  const programPrompt = (competitorAnalysis) => `You are a loyalty program design expert specializing in ${industry} with deep knowledge of behavioral science. Based on this competitor analysis:
${competitorAnalysis}

Create a detailed loyalty program proposal for ${businessName}. Include:

1. Program Overview
- Core value proposition for ${industry} customers
- Digital and physical touchpoint integration
- Key differentiators from competitors

2. Behavioral Science Foundation
- ${industry}-specific customer psychology
- Engagement triggers and reward timing
- Habit formation strategies

3. Reward Structure
- Industry-calibrated point values
- Tier benefits aligned with ${industry} preferences
- Special perks and exclusive experiences

4. Implementation Plan
- Phased rollout strategy
- Staff training requirements
- Technology integration needs

5. Customer Journey Design
- Key moments of delight
- Friction point elimination
- Mobile and digital experience

For each element, explicitly connect design choices to behavioral science principles and ${industry} best practices.`;

  const businessCasePrompt = (competitorAnalysis, programDesign) => `You are a business strategy consultant specializing in ${industry}. Based on this analysis:

Competitor Analysis:
${competitorAnalysis}

Program Design:
${programDesign}

Create a comprehensive business case for implementing this loyalty program. Include:

1. Market Opportunity
- ${industry}-specific market size
- Customer lifetime value impact
- Competitive advantage assessment

2. Financial Projections
- Implementation costs breakdown
- Revenue impact scenarios
- ROI timeline and metrics

3. Customer Impact
- Retention rate improvements
- Average transaction increase
- Engagement metrics

4. Risk Analysis
- ${industry}-specific challenges
- Technology risks
- Mitigation strategies

5. Success Metrics
- Key performance indicators
- Industry benchmarks
- Monitoring framework

Include specific numbers and assumptions based on ${industry} standards.`;

  return {
    competitorPrompt,
    programPrompt,
    businessCasePrompt
  };
};