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
    link: 'https://blog.nino.photos',
    readTime: '7 min read',
    date: '2024-09-15',
    category: 'Field Notes',
    tags: ['Commerce', 'Integration', 'Reality Check', 'Legacy Systems'],
    insights: []
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
    link: 'https://blog.nino.photos',
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
}

interface BlogManifest {
  posts: BlogPostMeta[];
}

function isBlogManifest(data: any): data is BlogManifest {
  return data && Array.isArray(data.posts);
}

export function mapBlogPostsToInsights(posts: BlogPostMeta[]): InsightArticle[] {
  return posts.map((post): InsightArticle => ({
    id: post.slug,
    title: post.title,
    subtitle: post.category || '',
    platform: post.source === 'linkedin' ? 'LinkedIn' : 'Blog',
    excerpt: post.excerpt || '',
    imageUrl: post.featureImage || 'https://picsum.photos/seed/signal-dispatch/600/400',
    link: post.source === 'linkedin' && post.linkedinUrl ? post.linkedinUrl : `https://blog.nino.photos/${post.slug}`,
    readTime: '',
    date: new Date(post.publishedAt).toISOString().slice(0, 10),
    category: post.category || 'Essay',
    tags: post.tags || [],
    insights: [],
  }));
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
    const isDevelopment = import.meta.env.DEV;
    // Use PUBLIC_ prefix for client-side accessible env vars in SvelteKit
    const envOrigin = import.meta.env.PUBLIC_BLOG_ORIGIN as string | undefined;
    const defaultOrigin = isDevelopment ? 'http://localhost:3002' : 'https://blog.nino.photos';
    const blogOrigin = envOrigin || defaultOrigin;
    
    // Validate blog origin
    if (!blogOrigin || (!blogOrigin.startsWith('http://') && !blogOrigin.startsWith('https://'))) {
      console.error('[blogAdapter] Invalid blog origin:', blogOrigin);
      return null;
    }
    const endpoints = isDevelopment ? [
      `${blogOrigin.replace(/\/$/, '')}/manifest.json`,
      'http://localhost:3000/manifest.json',
      'http://127.0.0.1:3002/manifest.json',
      'http://127.0.0.1:3000/manifest.json',
    ] : [
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
            if (isDevelopment) {
              console.info('[blogAdapter] Loaded manifest from', endpoint);
            }
            return data;
          }
        }
      } catch (e) {
        if (isDevelopment) {
          console.warn('[blogAdapter] Failed endpoint, trying next:', endpoint, e);
        }
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
