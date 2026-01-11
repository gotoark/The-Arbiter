'use client';

import { useState } from 'react';
import { ComparisonRequest } from '@/types/comparison';

interface ComparisonFormProps {
  onSubmit: (data: ComparisonRequest) => void;
  isLoading: boolean;
}

const SAMPLE_DATA = [
  // Web Development Stacks
  {
    techStackA: 'React + Node.js + PostgreSQL',
    techStackB: 'Vue.js + Express + MongoDB',
    useCase: 'Building a scalable e-commerce platform with real-time inventory management'
  },
  {
    techStackA: 'Angular + .NET Core + SQL Server',
    techStackB: 'React + Spring Boot + MySQL',
    useCase: 'Enterprise resource planning system for a large corporation'
  },
  {
    techStackA: 'Next.js + Prisma + Supabase',
    techStackB: 'Nuxt.js + Strapi + Firebase',
    useCase: 'Content management system for a media company with high traffic'
  },
  
  // Mobile Development
  {
    techStackA: 'Flutter + Firebase + Cloud Functions',
    techStackB: 'React Native + AWS Amplify + Lambda',
    useCase: 'Cross-platform mobile app for social networking with real-time messaging'
  },
  {
    techStackA: 'Native iOS (Swift + UIKit)',
    techStackB: 'Native Android (Kotlin + Jetpack Compose)',
    useCase: 'High-performance gaming app requiring platform-specific optimizations'
  },
  
  // Backend & API Development
  {
    techStackA: 'Django + Redis + Celery',
    techStackB: 'FastAPI + RabbitMQ + Kubernetes',
    useCase: 'High-performance API for machine learning model serving'
  },
  {
    techStackA: 'GraphQL + Apollo Server + MongoDB',
    techStackB: 'REST API + Express + PostgreSQL',
    useCase: 'Flexible API for a multi-client application (web, mobile, desktop)'
  },
  
  // Cloud Services Comparison
  {
    techStackA: 'AWS (EC2 + RDS + S3 + CloudFront)',
    techStackB: 'Google Cloud (Compute Engine + Cloud SQL + Cloud Storage + CDN)',
    useCase: 'Hosting a global SaaS application with 99.9% uptime requirements'
  },
  {
    techStackA: 'AWS Lambda + API Gateway + DynamoDB',
    techStackB: 'Vercel Functions + Supabase + Edge Runtime',
    useCase: 'Serverless architecture for a startup with unpredictable traffic patterns'
  },
  {
    techStackA: 'Azure DevOps + Azure Container Registry',
    techStackB: 'GitHub Actions + Docker Hub + Kubernetes',
    useCase: 'CI/CD pipeline for a microservices architecture with automated testing'
  },
  
  // Database & Storage Solutions
  {
    techStackA: 'PostgreSQL + Redis Caching',
    techStackB: 'MongoDB + Elasticsearch',
    useCase: 'Data storage for a content-heavy application with complex search requirements'
  },
  {
    techStackA: 'Amazon RDS (MySQL) + ElastiCache',
    techStackB: 'Google Cloud Firestore + Memorystore',
    useCase: 'Database solution for a real-time collaborative application'
  },
  
  // Authentication & Security
  {
    techStackA: 'Auth0 + JWT Tokens',
    techStackB: 'Firebase Authentication + Custom Backend',
    useCase: 'User authentication system for a B2B SaaS platform with SSO requirements'
  },
  {
    techStackA: 'AWS Cognito + IAM Roles',
    techStackB: 'Supabase Auth + Row Level Security',
    useCase: 'Multi-tenant application with granular permission controls'
  },
  
  // Modern & Cutting Edge
  {
    techStackA: 'Svelte + Deno + EdgeDB',
    techStackB: 'Solid.js + Bun + PlanetScale',
    useCase: 'Modern web application with edge computing requirements'
  },
  {
    techStackA: 'Astro + Tailwind + Netlify',
    techStackB: 'Remix + Styled Components + Vercel',
    useCase: 'Static site with dynamic features for a marketing agency'
  },
  
  // Enterprise & Legacy
  {
    techStackA: 'Laravel + Vue.js + Redis',
    techStackB: 'Ruby on Rails + React + Sidekiq',
    useCase: 'Rapid prototyping for a startup MVP with user authentication'
  },
  {
    techStackA: 'Java Spring Boot + Hibernate + Oracle',
    techStackB: '.NET Core + Entity Framework + SQL Server',
    useCase: 'Legacy system modernization for a financial institution'
  },
  
  // Performance & Scale
  {
    techStackA: 'Go + Gin + CockroachDB',
    techStackB: 'Rust + Actix + TimescaleDB',
    useCase: 'Microservices architecture for IoT data processing'
  },
  {
    techStackA: 'Node.js + Express + MongoDB Sharding',
    techStackB: 'Python + FastAPI + PostgreSQL + Read Replicas',
    useCase: 'High-throughput API handling millions of requests per day'
  },
  
  // DevOps & Infrastructure
  {
    techStackA: 'Docker + Kubernetes + Helm',
    techStackB: 'Docker Swarm + Traefik + Portainer',
    useCase: 'Container orchestration for a medium-sized development team'
  },
  {
    techStackA: 'Terraform + AWS + GitLab CI',
    techStackB: 'Pulumi + Azure + GitHub Actions',
    useCase: 'Infrastructure as Code for multi-environment deployment'
  },
  
  // AI & Machine Learning
  {
    techStackA: 'Python + TensorFlow + MLflow + Kubernetes',
    techStackB: 'Python + PyTorch + Weights & Biases + Docker',
    useCase: 'Machine learning pipeline for computer vision model training and deployment'
  },
  {
    techStackA: 'AWS SageMaker + Lambda + S3',
    techStackB: 'Google AI Platform + Cloud Functions + Cloud Storage',
    useCase: 'Serverless ML inference system for real-time predictions'
  },
  
  // E-commerce & Payment
  {
    techStackA: 'Shopify + Liquid + Shopify Payments',
    techStackB: 'WooCommerce + PHP + Stripe + PayPal',
    useCase: 'E-commerce platform for a growing retail business with international sales'
  },
  {
    techStackA: 'Stripe Connect + Webhooks',
    techStackB: 'PayPal Marketplace + REST API',
    useCase: 'Multi-vendor marketplace with complex payment splitting requirements'
  }
];

export const ComparisonForm = ({ onSubmit, isLoading }: ComparisonFormProps) => {
  const [techStackA, setTechStackA] = useState('');
  const [techStackB, setTechStackB] = useState('');
  const [useCase, setUseCase] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!techStackA.trim()) {
      alert('TECH STACK A REQUIRED - SYSTEM ERROR');
      return;
    }

    onSubmit({
      techStackA: techStackA.trim(),
      techStackB: techStackB.trim() || undefined,
      useCase: useCase.trim() || undefined,
    });
  };

  const fillSampleData = () => {
    const randomSample = SAMPLE_DATA[Math.floor(Math.random() * SAMPLE_DATA.length)];
    setTechStackA(randomSample.techStackA);
    setTechStackB(randomSample.techStackB);
    setUseCase(randomSample.useCase);
  };

  const clearForm = () => {
    setTechStackA('');
    setTechStackB('');
    setUseCase('');
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="space-y-6 cyber-card p-8 rounded-lg relative scan-lines">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
        
        {/* Sample Data Controls */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-cyan-400 uppercase tracking-wider">
            &gt; COMPARISON PARAMETERS
          </h2>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={fillSampleData}
              className="px-3 py-1 bg-green-400/10 border border-green-400 text-green-400 rounded font-mono text-xs uppercase tracking-wider hover:bg-green-400/20 transition-all"
            >
              [ SAMPLE DATA ]
            </button>
            <button
              type="button"
              onClick={clearForm}
              className="px-3 py-1 bg-red-400/10 border border-red-400 text-red-400 rounded font-mono text-xs uppercase tracking-wider hover:bg-red-400/20 transition-all"
            >
              [ CLEAR ]
            </button>
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="techStackA" className="block text-sm font-bold text-cyan-400 uppercase tracking-wider">
            &gt; TECH STACK ALPHA [REQUIRED]
          </label>
          <input
            type="text"
            id="techStackA"
            value={techStackA}
            onChange={(e) => setTechStackA(e.target.value)}
            placeholder="ENTER PRIMARY STACK..."
            className="w-full px-4 py-3 cyber-input rounded font-mono text-sm tracking-wide"
            required
          />
          <div className="h-px bg-gradient-to-r from-cyan-400 via-transparent to-cyan-400"></div>
        </div>

        <div className="space-y-2">
          <label htmlFor="techStackB" className="block text-sm font-bold text-pink-400 uppercase tracking-wider">
            &gt; TECH STACK BETA [OPTIONAL]
          </label>
          <input
            type="text"
            id="techStackB"
            value={techStackB}
            onChange={(e) => setTechStackB(e.target.value)}
            placeholder="ENTER RIVAL STACK OR LEAVE FOR AI SELECTION..."
            className="w-full px-4 py-3 cyber-input rounded font-mono text-sm tracking-wide"
          />
          <div className="h-px bg-gradient-to-r from-pink-400 via-transparent to-pink-400"></div>
        </div>

        <div className="space-y-2">
          <label htmlFor="useCase" className="block text-sm font-bold text-green-400 uppercase tracking-wider">
            &gt; MISSION PARAMETERS [RECOMMENDED]
          </label>
          <textarea
            id="useCase"
            value={useCase}
            onChange={(e) => setUseCase(e.target.value)}
            placeholder="DESCRIBE PROJECT REQUIREMENTS, SCALE, CONSTRAINTS..."
            rows={4}
            className="w-full px-4 py-3 cyber-input rounded font-mono text-sm tracking-wide resize-none"
          />
          <div className="h-px bg-gradient-to-r from-green-400 via-transparent to-green-400"></div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 neon-button rounded font-bold text-lg tracking-widest relative overflow-hidden group"
        >
          {/* Animated border rings when loading */}
          {isLoading && (
            <>
              <div className="absolute inset-0 rounded border-2 border-cyan-400 animate-ping opacity-75"></div>
              <div className="absolute inset-0 rounded border border-pink-400 animate-pulse"></div>
              <div className="absolute -inset-2 rounded border border-green-400/50 animate-spin" style={{ animationDuration: '3s' }}></div>
            </>
          )}
          
          {/* Scanning line effect when loading */}
          {isLoading && (
            <div className="absolute inset-0 overflow-hidden rounded">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan"></div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent animate-scan-reverse"></div>
            </div>
          )}
          
          {/* Particle effects when loading */}
          {isLoading && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="particle particle-1"></div>
              <div className="particle particle-2"></div>
              <div className="particle particle-3"></div>
              <div className="particle particle-4"></div>
              <div className="particle particle-5"></div>
              <div className="particle particle-6"></div>
            </div>
          )}
          
          {/* Matrix-style data stream when loading */}
          {isLoading && (
            <div className="absolute inset-0 overflow-hidden rounded opacity-30">
              <div className="data-stream data-stream-1"></div>
              <div className="data-stream data-stream-2"></div>
              <div className="data-stream data-stream-3"></div>
            </div>
          )}
          
          {/* Holographic overlay when loading */}
          {isLoading && (
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-transparent to-pink-400/10 animate-pulse rounded"></div>
          )}
          
          <span className="relative z-10 flex items-center justify-center space-x-3">
            {isLoading && (
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            )}
            <span>
              {isLoading ? '[ ANALYZING SYSTEMS... ]' : '[ INITIATE COMPARISON ]'}
            </span>
            {isLoading && (
              <div className="loading-spinner"></div>
            )}
          </span>
        </button>
        
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
      </form>

      {/* Help Text */}
      <div className="mt-4 text-center">
        <p className="text-gray-400 font-mono text-xs">
          NEW TO THE ARBITER? TRY SAMPLE DATA TO SEE HOW IT WORKS
        </p>
      </div>
    </div>
  );
};