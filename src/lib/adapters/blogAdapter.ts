import type { InsightArticle } from '../types';

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

async function fetchBlogManifest(): Promise<BlogManifest | null> {
  const now = Date.now();
  if (manifestCache && (now - manifestCacheTimestamp) < CACHE_DURATION) {
    return manifestCache;
  }
  try {
    const isDevelopment = import.meta.env.DEV;
    const envOrigin = (import.meta as any).env?.VITE_BLOG_ORIGIN as string | undefined;
    const defaultOrigin = isDevelopment ? 'http://localhost:3002' : 'https://blog.nino.photos';
    const blogOrigin = envOrigin || defaultOrigin;
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
