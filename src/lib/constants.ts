// This file defines constants used throughout the application, such as configuration values or static data.

import type { InsightArticle, Project } from './types';

export const PROJECTS: Project[] = [
    // Featured: this SvelteKit portfolio (live, with real repo)
    {
        id: 'ai-native-portfolio',
        title: 'AI‑Native Portfolio Experience',
        subtitle: 'This site — SvelteKit + multi‑agent workflow',
        description:
            "Complete AI‑native portfolio orchestrating specialized agents for development, validation, and visual QA. Production‑grade SvelteKit, centralized copy, lazy‑loaded sections, EXIF‑aware gallery modal, and Playwright audits.",
        category: 'ai-native-systems',
        technologies: ['SvelteKit', 'Svelte 4', 'TypeScript', 'Tailwind CSS', 'Playwright', 'Vercel'],
        featured: true,
        isShowcase: true,
    demo: 'https://nino.photos',
    repository: 'https://github.com/nino-chavez/website',
        imageUrl: 'https://picsum.photos/seed/portfolio-sveltekit/1200/800',
        year: 2025,
        status: 'live',
        outcomes: [
            'Centralized copy system to prevent drift',
            'Lazy‑loaded sections with accessible transitions',
            'Gallery modal with EXIF overlays and proper semantics',
            'Automated visual and accessibility checks via Playwright'
        ],
        metrics: {
            performance: 'Core Web Vitals ≥95',
            scale: 'Static‑optimized SSG + edge caching',
            timeline: 'React → SvelteKit migration completed'
        },
        tags: ['SvelteKit', 'Portfolio', 'Accessibility', 'Performance']
    },
    // Personal blog: AI, architecture, commerce, leadership
    {
        id: 'signal-dispatch-blog',
        title: 'Signal Dispatch — Personal Blog',
        subtitle: 'AI, architecture, commerce, leadership',
        description:
            'Long-form writing on AI-native development, enterprise architecture, and leadership. Built for clarity and speed with a focus on accessibility and reading experience.',
        category: 'ai-native-systems',
        technologies: ['MDX', 'Vercel'],
        featured: false,
        imageUrl: 'https://picsum.photos/seed/signal-dispatch/1200/800',
        demo: 'https://signal-dispatch-blog.vercel.app',
        repository: 'https://github.com/nino-chavez/signal-dispatch-blog',
        year: 2025,
        status: 'in-progress',
        outcomes: ['Accessible reading experience', 'Fast loads, minimal layout shift'],
        metrics: {
            performance: 'Optimized for readability',
            scale: 'Static hosting (CDN)',
            timeline: 'Active updates'
        },
        tags: ['Writing', 'AI', 'Architecture']
    },
    // Enterprise AI governance framework
    {
        id: 'aegis-framework',
        title: 'AI Agent Development Governance',
        subtitle: 'Constitutional governance for AI agent code',
        description:
            'Framework for consistent, compliant, and trackable AI‑generated code. Enforces standards across tools with governance patterns, validation, and reproducible blueprints.',
        category: 'ai-native-systems',
        technologies: ['TypeScript', 'CLI', 'Docs'],
        featured: false,
        imageUrl: 'https://picsum.photos/seed/aegis/1200/800',
        link: 'https://github.com/signal-x-studio/aegis-framework',
        repository: 'https://github.com/signal-x-studio/aegis-framework',
        year: 2024,
        status: 'in-progress',
    outcomes: ['Agent consistency', 'Quality enforcement', 'Multi‑agent coordination'],
        metrics: {
            performance: 'Governed code generation',
            scale: 'Team & enterprise use',
            timeline: 'Active framework development'
        },
        tags: ['Governance', 'Compliance', 'AI Agents']
    },
    // 72‑hour enterprise integration proof
    {
        id: 'smugmug-reference',
    title: 'AI‑Velocity Enterprise App (72h)',
        subtitle: 'SmugMug API reference application',
        description:
            'Enterprise‑grade reference built solo in 72 hours by orchestrating specialized AI agents. Includes OAuth 1.0a, AI photo search, bulk operations, and extensive documentation.',
        category: 'system-integration',
        technologies: ['React', 'TypeScript', 'OAuth 1.0a', 'Semantic Search'],
        featured: false,
        imageUrl: 'https://picsum.photos/seed/smugmug/1200/800',
        link: 'https://github.com/signal-x-studio/smugmug-api-reference-app',
        repository: 'https://github.com/signal-x-studio/smugmug-api-reference-app',
        demo: 'https://signal-x-studio.github.io/smugmug-api-reference-app/',
        year: 2024,
        status: 'completed',
        outcomes: ['20k+ LOC + 78k words docs', '98.8% cost reduction', 'Enterprise OAuth integration'],
        metrics: {
            performance: '20x velocity (proof)',
            scale: 'Production‑ready reference',
            timeline: '72‑hour delivery'
        },
        tags: ['AI‑accelerated', 'Integration', 'Proof']
    },
    // AI‑native commerce intelligence
    {
        id: 'commerce-prompt-analyzer',
        title: 'AI Studio Commerce App',
        subtitle: 'Prompt analysis and Gemini integration',
        description:
            'AI Studio application scaffold with Gemini integration. Runs locally with simple setup and environment configuration for rapid experimentation.',
        category: 'ai-native-systems',
        technologies: ['AI Studio', 'TypeScript', 'Gemini'],
        featured: false,
        imageUrl: 'https://picsum.photos/seed/commerce-analyzer/1200/800',
        link: 'https://github.com/signal-x-studio/commerce-prompt-analyzer',
        repository: 'https://github.com/signal-x-studio/commerce-prompt-analyzer',
        year: 2025,
        status: 'in-progress',
        outcomes: ['Gemini API ready', 'Local dev in minutes'],
        metrics: {
            performance: 'Rapid prototyping',
            scale: 'App template',
            timeline: 'Ongoing improvements'
        },
        tags: ['AI', 'Prototype']
    }
];

export const PROJECT_CATEGORIES = [
  { id: 'all', label: 'All Projects', count: PROJECTS.length },
  { id: 'enterprise-commerce', label: 'Enterprise Commerce', count: PROJECTS.filter(p => p.category === 'enterprise-commerce').length },
  { id: 'ai-native-systems', label: 'AI-Native Systems', count: PROJECTS.filter(p => p.category === 'ai-native-systems').length },
  { id: 'platform-architecture', label: 'Platform Architecture', count: PROJECTS.filter(p => p.category === 'platform-architecture').length },
  { id: 'system-integration', label: 'System Integration', count: PROJECTS.filter(p => p.category === 'system-integration').length },
  { id: 'performance-optimization', label: 'Performance Optimization', count: PROJECTS.filter(p => p.category === 'performance-optimization').length },
  { id: 'infrastructure', label: 'Infrastructure', count: PROJECTS.filter(p => p.category === 'infrastructure').length }
] as const;

export const INSIGHTS_ARTICLES: InsightArticle[] = [
    {
        id: 'commerce-integration-reality',
        title: 'When "Simple Integration" Isn\'t',
        subtitle: 'Commerce platform field notes',
        platform: 'Blog',
        excerpt: 'Connecting SAP Commerce to warehouse systems sounds straightforward in the architecture deck. Then you meet the legacy ERP that thinks it\'s 1997, inventory data that updates "eventually," and business rules that exist only in someone\'s head.',
        imageUrl: 'https://picsum.photos/seed/integration-reality/600/400',
        link: 'https://blog.nino.photos',
        readTime: '7 min read',
        date: '2024-09-15',
        category: 'Field Notes',
        tags: ['Commerce', 'Integration', 'Reality Check', 'Legacy Systems'],
        insights: [
            'Documentation describes the system they wish they had, not the one that exists',
            'Every integration has an "undocumented behavior" that breaks everything',
            'The phrase "it should be straightforward" is a warning sign',
            'Success is measured in fires that don\'t start, not features shipped'
        ]
    },
    {
        id: 'reading-the-road',
        title: 'Reading the Road',
        subtitle: 'Pattern recognition in systems and surfing',
        platform: 'Blog',
        excerpt: 'Surfers read conditions, not predictions. Position, timing, response. Enterprise architecture operates the same way: constraint analysis over roadmap promises, deployment windows over sprint velocity.',
        imageUrl: 'https://picsum.photos/seed/pattern-recognition/600/400',
        link: 'https://blog.nino.photos',
        readTime: '6 min read',
        date: '2024-08-22',
        category: 'Systems Thinking',
        tags: ['Strategy', 'Pattern Recognition', 'Surfing', 'Architecture'],
        insights: [
            'The best architectures respond to reality, not PowerPoint projections',
            'Positioning matters more than prediction',
            'Small signals reveal big problems before they cascade',
            'Sometimes the right move is to paddle around the wave'
        ]
    },
    {
        id: 'quiet-leadership',
        title: 'Holding Up the Mirror',
        subtitle: 'Quiet leadership in loud organizations',
        platform: 'LinkedIn',
        excerpt: 'Fortune 500 companies don\'t need another voice in the room. They need someone to reflect what\'s actually happening—the gaps between strategy and execution, the technical debt nobody wants to talk about, the assumptions that stopped being true three years ago.',
        imageUrl: 'https://picsum.photos/seed/leadership/600/400',
        link: 'https://www.linkedin.com/in/nino-chavez/',
        readTime: '8 min read',
        date: '2024-07-18',
        category: 'Leadership',
        tags: ['Enterprise', 'Strategy', 'Consulting', 'Signal'],
        insights: [
            'Most organizations know their problems—they need permission to act',
            'Listening reveals more than talking ever will',
            'The questions you ask define the answers you get',
            'Technical leadership is about clarity, not authority'
        ]
    },
    {
        id: 'ai-native-shift',
        title: 'Answer-First Commerce',
        subtitle: 'Rethinking assumptions in an AI-native world',
        platform: 'Blog',
        excerpt: 'Current work at Accenture Song: AI commerce transformation frameworks for Fortune 500 retailers. When customers expect answers instead of search results, your entire commerce platform needs rethinking—not retrofitting.',
        imageUrl: 'https://picsum.photos/seed/ai-commerce/600/400',
        link: 'https://blog.nino.photos',
        readTime: '10 min read',
        date: '2024-06-25',
        category: 'AI Strategy',
        tags: ['AI', 'Commerce', 'Transformation', 'Strategy'],
        insights: [
            'Search-first architecture doesn\'t map to answer-first experiences',
            'AI isn\'t a feature layer—it changes core assumptions',
            'The hardest part isn\'t the technology, it\'s organizational readiness',
            'Best approach: progressive enhancement, not big-bang replacement'
        ]
    }
];

export const CAREER_MILESTONES = [
    {
        year: 2025,
        era: 'Song',
        scale: 'Accenture',
        role: 'Principal Advisor',
        achievement:
            'Leading AI-native commerce innovation at Accenture, bridging strategic vision with hands-on technical implementation for enterprise clients.',
        current: true
    },
    {
        year: 2020,
        era: 'Strategic Advisory',
        scale: 'Enterprise Architecture & AI-Native Strategy',
        role: 'Enterprise Architect & Strategic Advisor',
        achievement:
            'As a trusted advisor to enterprise clients, I guide leadership teams beyond incremental transformation toward fundamental business reinvention. My role merges architecture, delivery, and organizational strategy to build the capabilities required for the AI-native era.',
        details:
            'Architecting AI-Native Readiness • Driving Strategic Foresight • Enabling Agile Operating Models • Aligning Executive Vision with Execution • Leading commerce platform modernization for composable, data-rich foundations'
    },
    {
        year: 2015,
        era: 'Enterprise Leadership',
        scale: 'Fortune 500 Commerce Platforms',
        role: 'Managing Enterprise Architect',
        achievement:
            'Transitioned from hands-on engineering leadership to enterprise architecture and technical advisory. Led implementation efforts on large-scale commerce platforms, then gradually moved into shaping the strategy behind them.',
        details:
            'Advising clients on platform selection, technical roadmaps, and architectural design • Led cross-functional teams through complex eCommerce builds (SAP Commerce, Magento, Salesforce Commerce Cloud) • Defined patterns, standards, and architectures that bridged engineering execution with long-term platform vision'
    },
    {
        year: 2010,
        era: 'Scale & Growth',
        scale: '100K→1M users',
        role: 'Engineering Lead',
        achievement:
            'Elevated from individual contributor to engineering leadership, scaling custom solutions while establishing foundational enterprise engineering practices. Led cross-functional teams through complex platform builds, balancing technical delivery with emerging leadership responsibilities.',
        details:
            'Transitioned from senior developer to engineering lead roles • Scaled platforms from hundreds of thousands to millions of users • Established delivery methodologies and team coordination patterns • Built foundation for enterprise-level system design and architecture practices'
    },
    {
        year: 2000,
        era: 'Foundation Building',
        scale: 'Individual Contributor Growth',
        role: 'Software Engineer',
        achievement:
            'Built a strong foundation in software development and systems integration across consulting firms, agencies, and enterprise organizations. Progressed from junior developer to senior software engineer, mastering full-stack development and complex system design.',
        details:
            'Progressed from junior to senior software engineer roles • Full-stack development using Java, .NET, and open-source frameworks • Solution architecture for retail, B2B, and CMS-driven platforms • Built expertise in agile delivery and cross-functional collaboration'
    }
];

export const FOCUS_AREAS = [
    {
        area: 'Enterprise Commerce Architecture',
        description: 'Designing scalable commerce platforms that serve millions of users',
        color: 'violet'
    },
    {
        area: 'AI-Native Development',
        description: 'Building with AI as core infrastructure, not just an add-on',
        color: 'cyan'
    },
    {
        area: 'Systems Integration',
        description: 'Connecting legacy systems that were never meant to work together',
        color: 'green'
    },
    {
        area: 'Technical Leadership',
        description: 'Guiding teams through complex technical challenges',
        color: 'violet'
    },
    {
        area: 'Performance Engineering',
        description: 'Optimizing systems for maximum efficiency and user experience',
        color: 'cyan'
    }
];

export const ARCHITECTURAL_DOMAINS = [
    {
        area: 'System Design & Architecture',
        description: 'Scalable, event-driven, and decoupled architectures that survive production.',
        capabilities: [
            'Event-driven order orchestration for high-volume commerce',
            'Distributed systems resilience and failure isolation patterns',
            'API design and microservices decomposition strategies'
        ]
    },
    {
        area: 'Data & Orchestration',
        description: 'Designing the "single source of truth" and orchestration engines for complex, real-time data flow.',
        capabilities: [
            'Real-time data pipelines for mission-critical systems',
            'Cross-platform integration architecture',
            'Event sourcing and CQRS pattern implementation'
        ]
    },
    {
        area: 'AI & Governance',
        description: 'Implementing frameworks and AI-Ops workflows to move AI from experiment to production safely.',
        capabilities: [
            'AI governance frameworks for production deployment safety',
            'Multi-agent orchestration and constitutional AI patterns',
            'Production AI observability and risk mitigation strategies'
        ]
    },
    {
        area: 'Enterprise Commerce',
        description: 'Platform architecture for commerce systems where downtime costs millions.',
        capabilities: [
            'Fortune 500 commerce platform modernization',
            'Headless and composable architecture strategies',
            'Legacy modernization and strangler fig patterns'
        ]
    }
];

// Legacy export for backward compatibility (deprecated)
export const TECHNICAL_DEPTH = ARCHITECTURAL_DOMAINS;

// Interactive Panel System: Capability Mapping
// Maps focus areas to their corresponding architectural domains
export const CAPABILITY_SYSTEM = {
  'enterprise-commerce': {
    id: 'enterprise-commerce',
    focusArea: {
      title: 'Enterprise Commerce Architecture',
      description: 'Designing scalable commerce platforms that serve millions of users',
      color: 'violet'
    },
    domain: {
      area: 'Enterprise Commerce',
      description: 'Platform architecture for commerce systems where downtime costs millions.',
      capabilities: [
        'Fortune 500 commerce platform modernization',
        'Headless and composable architecture strategies',
        'Legacy modernization and strangler fig patterns'
      ]
    }
  },
  'ai-native': {
    id: 'ai-native',
    focusArea: {
      title: 'AI-Native Development',
      description: 'Building with AI as core infrastructure, not just an add-on',
      color: 'cyan'
    },
    domain: {
      area: 'AI & Governance',
      description: 'Implementing frameworks and AI-Ops workflows to move AI from experiment to production safely.',
      capabilities: [
        'AI governance frameworks for production deployment safety',
        'Multi-agent orchestration and constitutional AI patterns',
        'Production AI observability and risk mitigation strategies'
      ]
    }
  },
  'systems-integration': {
    id: 'systems-integration',
    focusArea: {
      title: 'Systems Integration',
      description: 'Connecting legacy systems that were never meant to work together',
      color: 'green'
    },
    domain: {
      area: 'Data & Orchestration',
      description: 'Designing the "single source of truth" and orchestration engines for complex, real-time data flow.',
      capabilities: [
        'Real-time data pipelines for mission-critical systems',
        'Cross-platform integration architecture',
        'Event sourcing and CQRS pattern implementation'
      ]
    }
  },
  'technical-leadership': {
    id: 'technical-leadership',
    focusArea: {
      title: 'Technical Leadership',
      description: 'Guiding teams through complex technical challenges',
      color: 'violet'
    },
    domain: {
      area: 'System Design & Architecture',
      description: 'Scalable, event-driven, and decoupled architectures that survive production.',
      capabilities: [
        'Event-driven order orchestration for high-volume commerce',
        'Distributed systems resilience and failure isolation patterns',
        'API design and microservices decomposition strategies'
      ]
    }
  },
  'performance': {
    id: 'performance',
    focusArea: {
      title: 'Performance Engineering',
      description: 'Optimizing systems for maximum efficiency and user experience',
      color: 'cyan'
    },
    domain: {
      area: 'System Design & Architecture',
      description: 'Scalable, event-driven, and decoupled architectures that survive production.',
      capabilities: [
        'Event-driven order orchestration for high-volume commerce',
        'Distributed systems resilience and failure isolation patterns',
        'API design and microservices decomposition strategies'
      ]
    }
  }
} as const;

export const CAPABILITY_IDS = Object.keys(CAPABILITY_SYSTEM) as Array<keyof typeof CAPABILITY_SYSTEM>;

// Named exports only; consumers should import what they need explicitly.

// Ensure named export visibility for bundlers
// end