// Performance optimization utilities for WordPress API calls

import { getAllPosts, getRecentCommentsWithPosts } from './queries';
import { WordPressPost } from './type';

// Preload sidebar data to reduce perceived loading time
export const preloadSidebarData = async () => {
  try {
    // Parallelize sidebar API calls
    const [recentPosts, recentComments] = await Promise.all([
      getAllPosts({ per_page: 5, orderby: 'date', order: 'desc' }),
      getRecentCommentsWithPosts(5)
    ]);

    return {
      recentPosts: recentPosts.posts,
      recentComments
    };
  } catch (error) {
    console.error('Error preloading sidebar data:', error);
    return {
      recentPosts: [],
      recentComments: []
    };
  }
};

// Cache key generator for API responses
export const generateCacheKey = (endpoint: string, params: Record<string, any>) => {
  const sortedParams = Object.keys(params)
    .sort()
    .map(key => `${key}=${params[key]}`)
    .join('&');
  return `${endpoint}?${sortedParams}`;
};

// Debounced API call to prevent excessive requests
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): T => {
  let timeoutId: NodeJS.Timeout;
  return ((...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  }) as T;
};

// Batch API calls for better performance
export const batchPostRequests = async (postIds: number[]): Promise<WordPressPost[]> => {
  if (postIds.length === 0) return [];
  
  try {
    const baseUrl = process.env.WORDPRESS_URL;
    if (!baseUrl) {
      throw new Error('WordPress URL is not configured');
    }

    const response = await fetch(
      `${baseUrl}/wp-json/wp/v2/posts?include=${postIds.join(',')}&_embed=true`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(10000),
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    );

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error in batch post requests:', error);
    return [];
  }
}; 