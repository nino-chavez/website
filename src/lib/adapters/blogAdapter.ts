import type { InsightArticle } from '../types';

// Fallback static posts when blog is unavailable
export const FALLBACK_BLOG_POSTS: InsightArticle[] = [
  {
    id: 'commerce-integration-reality',
    title: 'When "Simple Integration" Isn\'t',
    subtitle: 'Commerce platform field notes',
    platform: 'Blog',
    excerpt: 'Connecting SAP Commerce to warehouse systems sounds straightforward in the architecture deck. Then you meet the legacy ERP that thinks it\'s 1997, inventory data that updates "eventually," and business rules that exist only in someone\'s head.',
    imageUrl: 'https://picsum.photos/seed/integration-reality/600/400',
    link: 'https://blog.ninochavez.co',
    readTime: '7 min read',
    date: '2024-09-15',
    category: 'Field Notes',
    tags: ['Commerce', 'Integration', 'Reality Check', 'Legacy Systems'],
    insights: [],
    content: `
      <p>The architecture diagram shows two clean boxes connected by a single line labeled "API". Everyone nods in the meeting. The timeline looks reasonable. The integration seems straightforward.</p>

      <p>Then implementation starts.</p>

      <h2>The Reality Gap</h2>

      <p>You're connecting a modern SAP Commerce platform to a warehouse management system that was cutting-edge in 1997. The WMS speaks FTP and fixed-width files. Your commerce platform expects JSON over HTTPS with OAuth2. The diagram's single line just became three adapters, two message queues, and a transformation layer that needs to handle 47 different edge cases.</p>

      <p><strong>The inventory data?</strong> It updates "eventually." Sometimes in real-time. Sometimes in 6-hour batches. Sometimes never, because someone manually overrode it in the WMS and forgot to tell anyone.</p>

      <h2>The Invisible Business Rules</h2>

      <p>Here's what kills integration timelines: undocumented business logic that exists only in people's heads.</p>

      <ul>
        <li>"Oh, we always show that SKU as in-stock, even when it's not—customers get mad otherwise"</li>
        <li>"Vendor X items need a 48-hour buffer because their shipping is unreliable"</li>
        <li>"If the warehouse code starts with 'R', multiply the lead time by 2.5"</li>
        <li>"We promised customer service they could override anything, so there's a spreadsheet..."</li>
      </ul>

      <p>None of this is in the requirements doc. All of it is critical to the business.</p>

      <h2>What Actually Works</h2>

      <p>After doing this enough times, here's what I've learned:</p>

      <p><strong>Map the human workflows first.</strong> The integration isn't connecting systems—it's connecting how people work. Talk to the warehouse manager, the customer service lead, and the person who's been here 15 years and "just knows how things work."</p>

      <p><strong>Build for the exceptions, not the happy path.</strong> The architecture diagram shows the ideal flow. Build for split shipments, cancelled backorders, inventory corrections, and the dreaded "customer already called and we told them it shipped."</p>

      <p><strong>Version everything.</strong> That inventory feed format? It will change. Build transformation layers that can handle multiple versions simultaneously. Future you will thank current you.</p>

      <h2>The Truth About "Simple" Integrations</h2>

      <p>There's no such thing. Every integration is a negotiation between:</p>

      <ul>
        <li>What the systems can technically do</li>
        <li>What the business actually needs</li>
        <li>What the existing humans and processes expect</li>
        <li>What you can reasonably build and maintain</li>
      </ul>

      <p>The integrations that work aren't the ones with the cleanest architecture diagrams. They're the ones that acknowledge reality—messy data, evolving requirements, and the fact that somewhere, someone will always need to override the rules.</p>

      <p>Build for that world, not the one in the diagram.</p>
    `
  },
  {
    id: 'reading-the-road',
    title: 'Reading the Road',
    subtitle: 'Pattern recognition in systems and surfing',
    platform: 'Blog',
    excerpt: 'Surfers read conditions, not predictions. Position, timing, response. Enterprise architecture operates the same way: constraint analysis over roadmap promises, deployment windows over sprint velocity.',
    imageUrl: 'https://picsum.photos/seed/pattern-recognition/600/400',
    link: 'https://blog.ninochavez.co',
    readTime: '6 min read',
    date: '2024-08-22',
    category: 'Systems Thinking',
    tags: ['Strategy', 'Pattern Recognition', 'Surfing', 'Architecture'],
    insights: []
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
    insights: []
  },
  {
    id: 'ai-native-shift',
    title: 'Answer-First Commerce',
    subtitle: 'Rethinking assumptions in an AI-native world',
    platform: 'Blog',
    excerpt: 'Current work at Accenture Song: AI commerce transformation frameworks for Fortune 500 retailers. When customers expect answers instead of search results, your entire commerce platform needs rethinking—not retrofitting.',
    imageUrl: 'https://picsum.photos/seed/ai-commerce/600/400',
    link: 'https://blog.ninochavez.co',
    readTime: '10 min read',
    date: '2024-06-25',
    category: 'AI Strategy',
    tags: ['AI', 'Commerce', 'Transformation', 'Strategy'],
    insights: []
  }
];

export interface BlogPostMeta {
  slug: string;
  title: string;
  publishedAt: string;
  excerpt?: string;
  category?: string;
  tags?: string[];
  featured?: boolean;
  author?: string;
  featureImage?: string;
  featureImageWidth?: number;
  featureImageHeight?: number;
  source?: 'linkedin' | 'mdx' | string;
  linkedinUrl?: string;
  readTime?: string;
  wordCount?: number;
}

interface BlogManifest {
  posts: BlogPostMeta[];
}

function isBlogManifest(data: any): data is BlogManifest {
  return data && Array.isArray(data.posts);
}

/**
 * Calculate estimated read time based on word count
 * Average reading speed: 200-250 words per minute
 * We use 225 as a middle ground
 */
function calculateReadTime(text: string, wordCount?: number): string {
  const words = wordCount || text.split(/\s+/).filter(word => word.length > 0).length;
  const minutes = Math.ceil(words / 225);
  return `${minutes} min read`;
}

export function mapBlogPostsToInsights(posts: BlogPostMeta[]): InsightArticle[] {
  return posts.map((post): InsightArticle => {
    // Calculate read time if not provided
    const readTime = post.readTime || calculateReadTime(post.excerpt || post.title, post.wordCount);
    
    // Construct full image URL from blog origin
    const blogOrigin = 'https://blog.ninochavez.co';
    let imageUrl = `${blogOrigin}/og_image.png`; // Default fallback
    
    if (post.featureImage) {
      // If featureImage is a full URL, use it directly
      if (post.featureImage.startsWith('http://') || post.featureImage.startsWith('https://')) {
        imageUrl = post.featureImage;
      } else {
        // Otherwise, construct full URL (handles both /path and path)
        const imagePath = post.featureImage.startsWith('/') ? post.featureImage : `/${post.featureImage}`;
        imageUrl = `${blogOrigin}${imagePath}`;
      }
    }
    
    return {
      id: post.slug,
      title: post.title,
      subtitle: post.category || '',
      platform: post.source === 'linkedin' ? 'LinkedIn' : 'Blog',
      excerpt: post.excerpt || '',
      imageUrl,
      link: post.source === 'linkedin' && post.linkedinUrl ? post.linkedinUrl : `https://blog.ninochavez.co/${post.slug}`,
      readTime,
      date: new Date(post.publishedAt).toISOString().slice(0, 10),
      category: post.category || 'Essay',
      tags: post.tags || [],
      insights: [],
    };
  });
}

let manifestCache: BlogManifest | null = null;
let manifestCacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000;

// Circuit breaker state
let failureCount = 0;
let circuitBreakerOpenUntil = 0;
const MAX_FAILURES = 3;
const CIRCUIT_BREAKER_TIMEOUT = 60 * 1000; // 1 minute

async function fetchBlogManifest(): Promise<BlogManifest | null> {
  const now = Date.now();
  if (manifestCache && (now - manifestCacheTimestamp) < CACHE_DURATION) {
    return manifestCache;
  }
  try {
    // Use PUBLIC_ prefix for client-side accessible env vars in SvelteKit
    const envOrigin = import.meta.env.PUBLIC_BLOG_ORIGIN as string | undefined;
    const blogOrigin = envOrigin || 'https://blog.ninochavez.co';
    
    // Validate blog origin
    if (!blogOrigin || (!blogOrigin.startsWith('http://') && !blogOrigin.startsWith('https://'))) {
      console.error('[blogAdapter] Invalid blog origin:', blogOrigin);
      return null;
    }
    const endpoints = [
      `${blogOrigin.replace(/\/$/, '')}/manifest.json`,
      `${blogOrigin.replace(/\/$/, '')}/api/manifest`,
    ];
    for (const endpoint of endpoints) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);
        const response = await fetch(endpoint, {
          headers: { 'Accept': 'application/json' },
          mode: 'cors' as RequestMode,
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        if (response.ok) {
          const data = await response.json();
          if (isBlogManifest(data)) {
            manifestCache = data;
            manifestCacheTimestamp = now;
            console.info('[blogAdapter] Loaded manifest from', endpoint);
            return data;
          }
        }
      } catch (e) {
        console.warn('[blogAdapter] Failed endpoint, trying next:', endpoint, e);
        continue;
      }
    }
    return null;
  } catch (error) {
    console.warn('Failed to fetch blog manifest:', error);
    return null;
  }
}

export async function getFeaturedInsights(limit = 1): Promise<InsightArticle[]> {
  try {
    const manifest = await fetchBlogManifest();
    if (!manifest) return [];
    const featured = manifest.posts
      .filter(p => p.featured)
      .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
    return mapBlogPostsToInsights(featured).slice(0, limit);
  } catch {
    return [];
  }
}

export async function getLatestInsights(limit = 5): Promise<InsightArticle[]> {
  try {
    const manifest = await fetchBlogManifest();
    if (!manifest) return [];
    const latest = [...manifest.posts]
      .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
    return mapBlogPostsToInsights(latest).slice(0, limit);
  } catch {
    return [];
  }
}

export async function getAllInsights(): Promise<InsightArticle[]> {
  try {
    const manifest = await fetchBlogManifest();
    if (!manifest) return [];
    return mapBlogPostsToInsights(manifest.posts);
  } catch {
    return [];
  }
}

export function getFeaturedInsightsSync(limit = 1): InsightArticle[] {
  return [];
}

export function getLatestInsightsSync(limit = 5): InsightArticle[] {
  return [];
}
