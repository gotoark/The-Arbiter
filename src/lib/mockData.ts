import { ComparisonResult } from '@/types/comparison';

export const getMockComparison = (techStackA: string, techStackB?: string, useCase?: string): ComparisonResult => {
  // Generate mock data based on common tech stack patterns
  const mockData: Record<string, ComparisonResult> = {
    'react': {
      optionA: {
        name: 'React + Node.js + PostgreSQL',
        score: 8.5,
        strengths: [
          'Large ecosystem and community support',
          'Component-based architecture for reusability',
          'Strong TypeScript integration',
          'Excellent developer tools and debugging',
          'PostgreSQL provides ACID compliance and reliability'
        ],
        weaknesses: [
          'Steep learning curve for beginners',
          'Rapid ecosystem changes require constant updates',
          'Bundle size can become large without optimization',
          'PostgreSQL setup complexity for small projects'
        ],
        tradeOffs: [
          'Performance vs Development Speed: Fast development but requires optimization',
          'Flexibility vs Complexity: Highly flexible but can lead to decision paralysis',
          'Community vs Stability: Large community but frequent breaking changes'
        ]
      },
      optionB: {
        name: 'Vue.js + Express + MongoDB',
        score: 7.8,
        strengths: [
          'Gentler learning curve and intuitive syntax',
          'Excellent documentation and guides',
          'Flexible architecture (progressive framework)',
          'MongoDB provides schema flexibility',
          'Lightweight and fast initial setup'
        ],
        weaknesses: [
          'Smaller ecosystem compared to React',
          'Less job market demand',
          'MongoDB lacks ACID transactions in some scenarios',
          'Fewer third-party integrations'
        ],
        tradeOffs: [
          'Simplicity vs Ecosystem: Easier to learn but fewer resources',
          'Flexibility vs Structure: Schema-less DB but potential data inconsistency',
          'Speed vs Scalability: Fast prototyping but scaling challenges'
        ]
      },
      recommendation: 'For enterprise applications requiring robust data consistency and large team collaboration, React + Node.js + PostgreSQL offers better long-term maintainability. For rapid prototyping and smaller teams, Vue.js + Express + MongoDB provides faster initial development.',
      useCase: useCase || 'Web application development'
    },
    'angular': {
      optionA: {
        name: 'Angular + .NET Core + SQL Server',
        score: 8.2,
        strengths: [
          'Enterprise-grade framework with strong conventions',
          'Built-in TypeScript support and tooling',
          'Comprehensive testing framework included',
          'Strong integration with Microsoft ecosystem',
          'Robust dependency injection system'
        ],
        weaknesses: [
          'Steep learning curve and complex setup',
          'Heavy framework with large bundle sizes',
          'Frequent major version updates',
          'Microsoft ecosystem lock-in potential'
        ],
        tradeOffs: [
          'Structure vs Flexibility: Highly opinionated but reduces decision fatigue',
          'Performance vs Features: Feature-rich but heavier initial load',
          'Enterprise vs Agility: Great for large teams but slower iteration'
        ]
      },
      optionB: {
        name: 'React + Node.js + PostgreSQL',
        score: 8.0,
        strengths: [
          'More flexible and lightweight approach',
          'Larger community and job market',
          'Better performance for client-side applications',
          'Cross-platform compatibility',
          'Faster development cycles'
        ],
        weaknesses: [
          'Requires more architectural decisions',
          'Less built-in structure for large teams',
          'Need to integrate multiple tools manually',
          'Potential for inconsistent code patterns'
        ],
        tradeOffs: [
          'Freedom vs Structure: More choices but requires more decisions',
          'Speed vs Convention: Faster development but needs team discipline',
          'Innovation vs Stability: Cutting-edge features but more frequent changes'
        ]
      },
      recommendation: 'Angular + .NET Core + SQL Server excels in enterprise environments with established Microsoft infrastructure and large development teams requiring strict conventions. React + Node.js + PostgreSQL offers more flexibility and faster iteration for startups and agile teams.',
      useCase: useCase || 'Enterprise web application'
    },
    'default': {
      optionA: {
        name: techStackA,
        score: 7.5,
        strengths: [
          'Established technology with proven track record',
          'Good community support and documentation',
          'Suitable for the specified use case',
          'Reasonable learning curve for developers',
          'Adequate performance characteristics'
        ],
        weaknesses: [
          'May have some legacy constraints',
          'Limited scalability in certain scenarios',
          'Potential vendor lock-in considerations',
          'Maintenance overhead for complex setups'
        ],
        tradeOffs: [
          'Stability vs Innovation: Proven but may lack cutting-edge features',
          'Cost vs Performance: Budget-friendly but performance limitations',
          'Simplicity vs Power: Easy to use but limited advanced capabilities'
        ]
      },
      optionB: {
        name: techStackB || 'Modern Cloud-Native Stack',
        score: 8.0,
        strengths: [
          'Modern architecture with cloud-first design',
          'Excellent scalability and performance',
          'Strong developer experience and tooling',
          'Future-proof technology choices',
          'Microservices-ready architecture'
        ],
        weaknesses: [
          'Higher complexity and learning curve',
          'Potential over-engineering for simple projects',
          'Higher infrastructure costs initially',
          'Requires specialized knowledge'
        ],
        tradeOffs: [
          'Complexity vs Capability: More powerful but harder to master',
          'Cost vs Scalability: Higher initial investment but better long-term scaling',
          'Speed vs Quality: Longer setup time but better maintainability'
        ]
      },
      recommendation: 'The choice depends on your team\'s expertise, project timeline, and long-term scalability requirements. Consider starting with the simpler option and migrating to more complex solutions as your needs grow.',
      useCase: useCase || 'General application development'
    }
  };

  // Determine which mock data to use based on tech stack input
  const key = techStackA.toLowerCase().includes('react') ? 'react' :
              techStackA.toLowerCase().includes('angular') ? 'angular' :
              'default';

  return mockData[key];
};