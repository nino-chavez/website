import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

/**
 * AEO (Answer Engine Optimization) API Endpoint
 *
 * Purpose: Provide machine-readable work history for queries like:
 * - "Where has Nino Chavez worked?"
 * - "Nino Chavez work history"
 * - "Nino Chavez at Accenture Song"
 *
 * This endpoint provides chronological employment history with role details,
 * enabling AI models to answer career trajectory and experience questions.
 */

export const GET: RequestHandler = async () => {
	const experienceData = {
		'@context': 'https://schema.org',
		'@type': 'ItemList',
		name: 'Nino Chavez - Professional Experience',
		description: 'Chronological work history spanning 25+ years in enterprise architecture',
		numberOfItems: 6,
		itemListElement: [
			{
				'@type': 'ListItem',
				position: 1,
				item: {
					'@type': 'EmployeeRole',
					roleName: 'Enterprise Architect & Strategic Advisor',
					startDate: '2023',
					endDate: null, // Current role
					isCurrentRole: true,
					employmentType: 'FULL_TIME',
					description:
						'Strategic advisor for AI-native platform adoption, cloud architecture roadmaps, and organizational transformation. Leading Agile operating models and aligning executive vision with technical execution.',
					responsibilities: [
						'Architecting AI-native platforms and Gen AI adoption strategies',
						'Cloud architecture roadmaps for autonomous enterprise',
						'Leading Agile operating models and organizational redesign',
						'Aligning executive vision with technical execution'
					],
					worksFor: {
						'@type': 'Organization',
						name: 'Accenture Song',
						url: 'https://www.accenture.com/us-en/services/song-index',
						location: {
							'@type': 'Place',
							address: {
								'@type': 'PostalAddress',
								addressLocality: 'Chicago',
								addressRegion: 'IL',
								addressCountry: 'US'
							}
						}
					}
				}
			},
			{
				'@type': 'ListItem',
				position: 2,
				item: {
					'@type': 'EmployeeRole',
					roleName: 'Managing Delivery Architect',
					startDate: '2021',
					endDate: '2023',
					employmentType: 'FULL_TIME',
					description:
						'End-to-end delivery leadership for enterprise commerce platforms including SAP, Salesforce, and Adobe. Managed architectural alignment across distributed global teams and established technical standards.',
					responsibilities: [
						'End-to-end delivery for enterprise commerce (SAP, Salesforce, Adobe)',
						'Architectural alignment across distributed teams',
						'Technical standards across global delivery centers',
						'Stabilized at-risk programs in high-pressure environments'
					],
					worksFor: {
						'@type': 'Organization',
						name: 'Capgemini',
						location: {
							'@type': 'Place',
							address: {
								'@type': 'PostalAddress',
								addressLocality: 'Chicago',
								addressRegion: 'IL',
								addressCountry: 'US'
							}
						}
					}
				}
			},
			{
				'@type': 'ListItem',
				position: 3,
				item: {
					'@type': 'EmployeeRole',
					roleName: 'Domain Architect',
					startDate: '2020',
					endDate: '2021',
					employmentType: 'FULL_TIME',
					description:
						'Microservices architecture for scalable online grocery platforms. Led architecture strategy for mobile, web, and fulfillment systems with squad-based delivery model.',
					responsibilities: [
						'Scalable microservices for online grocery platforms',
						'Architecture strategy for mobile, web, and fulfillment',
						'Squad-based delivery model improvements'
					],
					worksFor: {
						'@type': 'Organization',
						name: 'Peapod Digital Labs',
						location: {
							'@type': 'Place',
							address: {
								'@type': 'PostalAddress',
								addressLocality: 'Chicago',
								addressRegion: 'IL',
								addressCountry: 'US'
							}
						}
					}
				}
			},
			{
				'@type': 'ListItem',
				position: 4,
				item: {
					'@type': 'EmployeeRole',
					roleName: 'Managing Enterprise Architect',
					startDate: '2018',
					endDate: '2020',
					employmentType: 'FULL_TIME',
					description:
						'Led $25M multi-brand omni-channel commerce transformation using SAP Commerce Cloud. Managed 100+ global resources across system integration, performance, QA, and CI/CD workstreams.',
					responsibilities: [
						'$25M multi-brand omni-channel commerce solution (SAP Commerce)',
						'Managed 100+ global resources',
						'Led system integration, performance, QA, CI/CD streams'
					],
					worksFor: {
						'@type': 'Organization',
						name: 'Accenture Interactive',
						location: {
							'@type': 'Place',
							address: {
								'@type': 'PostalAddress',
								addressLocality: 'Chicago',
								addressRegion: 'IL',
								addressCountry: 'US'
							}
						}
					},
					additionalProperty: [
						{
							'@type': 'PropertyValue',
							name: 'Project Budget',
							value: '$25M'
						},
						{
							'@type': 'PropertyValue',
							name: 'Team Size',
							value: '100+ global resources'
						}
					]
				}
			},
			{
				'@type': 'ListItem',
				position: 5,
				item: {
					'@type': 'EmployeeRole',
					roleName: 'Managing Enterprise Architect',
					startDate: '2015',
					endDate: '2018',
					employmentType: 'FULL_TIME',
					description:
						'Cross-functional eCommerce implementations across SAP, Magento, and Salesforce platforms. Technical advisor for pre-sales and strategy with architectural framework development for engineering execution.',
					responsibilities: [
						'Cross-functional eCommerce builds (SAP, Magento, Salesforce)',
						'Technical advisor for pre-sales and strategy',
						'Architectural frameworks for engineering execution'
					],
					worksFor: {
						'@type': 'Organization',
						name: 'Gorilla Group',
						location: {
							'@type': 'Place',
							address: {
								'@type': 'PostalAddress',
								addressLocality: 'Chicago',
								addressRegion: 'IL',
								addressCountry: 'US'
							}
						}
					}
				}
			},
			{
				'@type': 'ListItem',
				position: 6,
				item: {
					'@type': 'EmployeeRole',
					roleName: 'Software Engineering & Engineering Lead',
					startDate: '1999',
					endDate: '2015',
					employmentType: 'FULL_TIME',
					description:
						'Full-stack development and solution architecture across retail, B2B, and CMS platforms. Led Agile delivery teams across multi-vendor environments using Java, .NET, and open-source frameworks.',
					responsibilities: [
						'Full-stack development (Java, .NET, open-source frameworks)',
						'Solution architecture for retail, B2B, CMS platforms',
						'Agile delivery across multi-vendor teams'
					],
					worksFor: {
						'@type': 'Organization',
						name: 'Various Roles',
						description: 'Multiple companies in software engineering and architecture roles',
						location: {
							'@type': 'Place',
							address: {
								'@type': 'PostalAddress',
								addressLocality: 'Chicago',
								addressRegion: 'IL',
								addressCountry: 'US'
							}
						}
					}
				}
			}
		],

		// Summary Statistics
		about: {
			'@type': 'Person',
			name: 'Nino Chavez',
			url: 'https://ninochavez.co',
			additionalProperty: [
				{
					'@type': 'PropertyValue',
					name: 'Total Years Experience',
					value: '25+'
				},
				{
					'@type': 'PropertyValue',
					name: 'Career Start Year',
					value: '1999'
				},
				{
					'@type': 'PropertyValue',
					name: 'Current Employer',
					value: 'Accenture Song'
				},
				{
					'@type': 'PropertyValue',
					name: 'Primary Location',
					value: 'Chicago, IL'
				}
			]
		}
	};

	return json(experienceData, {
		headers: {
			'Content-Type': 'application/ld+json',
			'Cache-Control': 'public, max-age=3600',
			'Access-Control-Allow-Origin': '*'
		}
	});
};
