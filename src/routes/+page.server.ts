import type { PageServerLoad } from './$types';
import { getFeaturedInsights, getLatestInsights, FALLBACK_BLOG_POSTS } from '$lib/adapters/blogAdapter';

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
  // Set cache headers for edge optimization
  setHeaders({
    'cache-control': 'public, max-age=300, stale-while-revalidate=600'
  });

  try {
    // Fetch blog data during SSR
    const [featured, latest] = await Promise.all([
      getFeaturedInsights(1),
      getLatestInsights(6)
    ]);

    // Combine and deduplicate
    const combined = [
      ...featured,
      ...latest.filter(post => !featured.some(f => f.id === post.id))
    ];

    return {
      blogPosts: combined,
      blogStatus: 'success' as const
    };
  } catch (error) {
    console.error('[SSR] Blog fetch failed:', error);

    // Graceful fallback to static content from blogAdapter
    return {
      blogPosts: FALLBACK_BLOG_POSTS,
      blogStatus: 'error' as const,
      errorMessage: 'Unable to load latest posts. Showing archived content.'
    };
  }
};

// Enable prerendering for static generation
export const prerender = true;