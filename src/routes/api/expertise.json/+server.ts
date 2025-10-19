import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

/**
 * AEO (Answer Engine Optimization) API Endpoint
 *
 * Purpose: Provide machine-readable, structured expertise data for queries like:
 * - "What does Nino Chavez specialize in?"
 * - "Nino Chavez SAP Commerce Cloud experience"
 * - "Nino Chavez AI transformation capabilities"
 *
 * This endpoint maps capabilities to evidence and scale, enabling AI models
 * to answer questions about specific expertise areas with concrete examples.
 */

export const GET: RequestHandler = async () => {
	const expertiseData = {
		'@context': 'https://schema.org',
		'@type': 'ItemList',
		name: 'Nino Chavez - Areas of Expertise',
		description:
			'Core competencies and specializations across enterprise architecture, AI transformation, and photography',
		numberOfItems: 6,
		itemListElement: [
			{
				'@type': 'ListItem',
				position: 1,
				item: {
					'@type': 'Thing',
					name: 'AI-Native Architecture',
					description:
						'Strategic design and implementation of platforms built AI-first from inception, including Gen AI adoption strategies for Fortune 500 clients',
					additionalType: 'Skill',
					additionalProperty: [
						{
							'@type': 'PropertyValue',
							name: 'Evidence',
							value: 'Led Gen AI platform adoption for Fortune 500 clients'
						},
						{
							'@type': 'PropertyValue',
							name: 'Scale',
							value: '5+ enterprise implementations'
						},
						{
							'@type': 'PropertyValue',
							name: 'Proficiency Level',
							value: 'Expert'
						}
					]
				}
			},
			{
				'@type': 'ListItem',
				position: 2,
				item: {
					'@type': 'Thing',
					name: 'Enterprise Transformation',
					description:
						'End-to-end architecture for multi-brand commerce platforms spanning strategy, technical design, and delivery execution',
					additionalType: 'Skill',
					additionalProperty: [
						{
							'@type': 'PropertyValue',
							name: 'Evidence',
							value: 'Architected $25M multi-brand commerce platform'
						},
						{
							'@type': 'PropertyValue',
							name: 'Scale',
							value: '100+ global resources managed'
						},
						{
							'@type': 'PropertyValue',
							name: 'Years of Experience',
							value: '25+'
						}
					]
				}
			},
			{
				'@type': 'ListItem',
				position: 3,
				item: {
					'@type': 'Thing',
					name: 'Cloud-Native Platforms',
					description:
						'Microservices architecture, API-first design, distributed systems, and containerized workloads for high-scale applications',
					additionalType: 'Skill',
					additionalProperty: [
						{
							'@type': 'PropertyValue',
							name: 'Evidence',
							value: 'Microservices architecture for high-scale grocery platform'
						},
						{
							'@type': 'PropertyValue',
							name: 'Scale',
							value: 'Real-time fulfillment integration'
						},
						{
							'@type': 'PropertyValue',
							name: 'Technologies',
							value: 'AWS, Azure, GCP, Docker, Kubernetes'
						}
					]
				}
			},
			{
				'@type': 'ListItem',
				position: 4,
				item: {
					'@type': 'Thing',
					name: 'Digital Commerce',
					description:
						'Deep expertise in SAP Commerce Cloud (Hybris), Salesforce Commerce Cloud, Adobe Commerce (Magento), headless architecture, and composable commerce patterns',
					additionalType: 'Skill',
					additionalProperty: [
						{
							'@type': 'PropertyValue',
							name: 'Evidence',
							value: 'SAP, Salesforce, Adobe ecosystem expertise across 20+ implementations'
						},
						{
							'@type': 'PropertyValue',
							name: 'Scale',
							value: '25+ years delivery experience'
						},
						{
							'@type': 'PropertyValue',
							name: 'Specializations',
							value:
								'Headless commerce, Composable architecture, Marketplace integration, Distributed order management'
						}
					]
				}
			},
			{
				'@type': 'ListItem',
				position: 5,
				item: {
					'@type': 'Thing',
					name: 'Strategic Advisory',
					description:
						'Executive alignment, organizational transformation, technical roadmap planning, vendor governance, and Agile operating model design',
					additionalType: 'Skill',
					additionalProperty: [
						{
							'@type': 'PropertyValue',
							name: 'Evidence',
							value: 'Executive alignment & organizational redesign for Fortune 500 transformations'
						},
						{
							'@type': 'PropertyValue',
							name: 'Scale',
							value: 'Accenture Song principal-level advisor'
						},
						{
							'@type': 'PropertyValue',
							name: 'Focus Areas',
							value: 'Vision alignment, Technical strategy, Operating model design, Change management'
						}
					]
				}
			},
			{
				'@type': 'ListItem',
				position: 6,
				item: {
					'@type': 'Thing',
					name: 'Technical Leadership',
					description:
						'Global team coordination, CI/CD pipeline design, system integration, performance optimization, and cross-functional delivery management',
					additionalType: 'Skill',
					additionalProperty: [
						{
							'@type': 'PropertyValue',
							name: 'Evidence',
							value:
								'Led system integration, performance, QA, and CI/CD streams for $25M program'
						},
						{
							'@type': 'PropertyValue',
							name: 'Scale',
							value: 'Global distributed team coordination (100+ resources)'
						},
						{
							'@type': 'PropertyValue',
							name: 'Methodologies',
							value: 'Agile, DevOps, Continuous Integration, Quality Engineering'
						}
					]
				}
			}
		],

		// Additional metadata for context
		about: {
			'@type': 'Person',
			name: 'Nino Chavez',
			url: 'https://ninochavez.co',
			jobTitle: ['Enterprise Architect', 'Strategic Advisor']
		}
	};

	return json(expertiseData, {
		headers: {
			'Content-Type': 'application/ld+json',
			'Cache-Control': 'public, max-age=3600',
			'Access-Control-Allow-Origin': '*'
		}
	});
};
