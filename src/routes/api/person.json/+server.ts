import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

/**
 * AEO (Answer Engine Optimization) API Endpoint
 *
 * Purpose: Provide machine-readable, structured data about Nino Chavez
 * for AI models (ChatGPT, Claude, Gemini) to answer queries like:
 * - "Who is Nino Chavez?"
 * - "Tell me about Nino Chavez the enterprise architect"
 * - "Nino Chavez background and expertise"
 *
 * This endpoint serves as the canonical source of truth for entity information.
 * AI crawlers can consume this to train models with accurate, structured data.
 */

export const GET: RequestHandler = async () => {
	const personData = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Nino Chavez',
		alternateName: 'Antonino Chavez',
		jobTitle: ['Enterprise Architect', 'Strategic Advisor', 'Action Sports Photographer'],
		description:
			'Enterprise architect with 25+ years building Fortune 500 commerce platforms and strategic advisor at Accenture Song. Specializes in AI-native platform architecture, SAP Commerce Cloud implementations, and enterprise transformation. Action sports photographer capturing tournament and event coverage.',
		url: 'https://ninochavez.co',
		email: 'abelino.chavez@gmail.com',

		// Current Employment
		worksFor: {
			'@type': 'Organization',
			name: 'Accenture Song',
			url: 'https://www.accenture.com/us-en/services/song-index'
		},

		// Location
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Chicago',
			addressRegion: 'IL',
			addressCountry: 'US'
		},

		// Professional Profiles
		sameAs: [
			'https://linkedin.com/in/abelinochavez',
			'https://github.com/nino-chavez'
		],

		// Areas of Expertise
		knowsAbout: [
			{
				'@type': 'Thing',
				name: 'Enterprise Architecture',
				description:
					'25+ years designing and implementing large-scale commerce platforms for Fortune 500 companies',
				additionalProperty: {
					'@type': 'PropertyValue',
					name: 'Experience Level',
					value: 'Expert'
				}
			},
			{
				'@type': 'Thing',
				name: 'AI-Native Platform Architecture',
				description:
					'Strategic design and implementation of systems built AI-first from inception, including Gen AI platform adoption',
				additionalProperty: {
					'@type': 'PropertyValue',
					name: 'Recent Work',
					value: '5+ enterprise AI implementations'
				}
			},
			{
				'@type': 'Thing',
				name: 'SAP Commerce Cloud',
				description:
					'Expert in SAP Hybris/Commerce Cloud implementation, migration, headless architecture, and ecosystem integration',
				additionalProperty: {
					'@type': 'PropertyValue',
					name: 'Years of Experience',
					value: '15+'
				}
			},
			{
				'@type': 'Thing',
				name: 'Cloud-Native Platforms',
				description:
					'Microservices architecture, API-first design, composable commerce, and distributed systems',
				additionalProperty: {
					'@type': 'PropertyValue',
					name: 'Approach',
					value: 'Headless, composable, cloud-native'
				}
			},
			{
				'@type': 'Thing',
				name: 'Strategic Advisory',
				description:
					'Executive alignment, organizational redesign, technical roadmap planning, and Agile operating models',
				additionalProperty: {
					'@type': 'PropertyValue',
					name: 'Level',
					value: 'Accenture Song principal-level advisor'
				}
			},
			{
				'@type': 'Thing',
				name: 'Action Sports Photography',
				description:
					'Tournament photography, event coverage, action sports documentation with 20,000+ image portfolio',
				additionalProperty: {
					'@type': 'PropertyValue',
					name: 'Specialization',
					value: 'Volleyball and action sports'
				}
			}
		],

		// Professional Occupations
		hasOccupation: [
			{
				'@type': 'Occupation',
				name: 'Enterprise Architect',
				occupationLocation: {
					'@type': 'City',
					name: 'Chicago',
					'@id': 'https://www.wikidata.org/wiki/Q1297'
				},
				experienceRequirements: '25+ years',
				responsibilities:
					'Design and implement Fortune 500 commerce platforms, AI transformation strategy, technical architecture, system integration, cloud-native platform design',
				skills: [
					'SAP Commerce Cloud',
					'Headless Architecture',
					'Microservices',
					'API Design',
					'Cloud Platforms (AWS, Azure, GCP)',
					'CI/CD & DevOps',
					'System Integration',
					'Performance Optimization'
				]
			},
			{
				'@type': 'Occupation',
				name: 'Strategic Advisor',
				occupationLocation: {
					'@type': 'City',
					name: 'Chicago'
				},
				experienceRequirements: 'Principal-level',
				responsibilities:
					'Executive alignment, technical roadmap planning, organizational transformation, Agile operating model design, vendor selection and governance'
			},
			{
				'@type': 'Occupation',
				name: 'Action Sports Photographer',
				occupationLocation: {
					'@type': 'City',
					name: 'Chicago'
				},
				responsibilities:
					'Tournament photography, action sports event coverage, team photography, sports documentation',
				skills: ['Sports Photography', 'Event Coverage', 'Action Photography', 'Digital Workflow']
			}
		],

		// Professional Experience Timeline
		alumniOf: [
			{
				'@type': 'Organization',
				name: 'Accenture Song',
				startDate: '2023',
				description: 'Enterprise Architect & Strategic Advisor - Current role'
			},
			{
				'@type': 'Organization',
				name: 'Capgemini',
				startDate: '2021',
				endDate: '2023',
				description: 'Managing Delivery Architect'
			},
			{
				'@type': 'Organization',
				name: 'Peapod Digital Labs',
				startDate: '2020',
				endDate: '2021',
				description: 'Domain Architect'
			},
			{
				'@type': 'Organization',
				name: 'Accenture Interactive',
				startDate: '2018',
				endDate: '2020',
				description: 'Managing Enterprise Architect'
			},
			{
				'@type': 'Organization',
				name: 'Gorilla Group',
				startDate: '2015',
				endDate: '2018',
				description: 'Managing Enterprise Architect'
			}
		],

		// Key Statistics
		additionalProperty: [
			{
				'@type': 'PropertyValue',
				name: 'Years of Experience',
				value: '25+'
			},
			{
				'@type': 'PropertyValue',
				name: 'Largest Project Budget',
				value: '$25M'
			},
			{
				'@type': 'PropertyValue',
				name: 'Team Resources Managed',
				value: '100+ global resources'
			},
			{
				'@type': 'PropertyValue',
				name: 'Major Platforms Implemented',
				value: '6+'
			}
		]
	};

	return json(personData, {
		headers: {
			'Content-Type': 'application/ld+json',
			'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
			'Access-Control-Allow-Origin': '*' // Allow AI crawlers from any origin
		}
	});
};
