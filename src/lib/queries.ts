import { 
  WordPressPost, 
  WordPressCategory, 
  WordPressTag, 
  SearchParams, 
  WordPressAPIResponse,
  WordPressCategoriesResponse,
  WordPressTagsResponse,
  WordPressComment
} from './type';

const baseUrl = process.env.WORDPRESS_URL;

export const getPostsBySearch = async (
  searchQuery: string,
  options: Omit<SearchParams, 'search'> = {}
): Promise<WordPressAPIResponse> => {
  try {
    // Validate base URL
    if (!baseUrl) {
      throw new Error('WordPress URL is not configured. Please set WORDPRESS_URL environment variable.');
    }

    // Build search parameters
    const params = new URLSearchParams({
      search: searchQuery,
      per_page: (options.per_page || 10).toString(),
      page: (options.page || 1).toString(),
      orderby: options.orderby || 'relevance',
      order: options.order || 'desc',
      _embed: 'true', // Include embedded resources (featured images, author, etc.)
    });

    // Add optional filters
    if (options.categories) {
      params.append('categories', options.categories);
    }
    if (options.tags) {
      params.append('tags', options.tags);
    }

    const url = `${baseUrl}/wp-json/wp/v2/posts?${params.toString()}`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      // Add timeout
      signal: AbortSignal.timeout(10000), // 10 seconds timeout
    });

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
    }

    const posts: WordPressPost[] = await response.json();
    
    // Get pagination info from headers
    const totalPosts = parseInt(response.headers.get('X-WP-Total') || '0');
    const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '0');

    return {
      posts,
      totalPages,
      totalPosts,
    };

  } catch (error) {
    console.error('Error fetching posts from WordPress:', error);
    
    // Return empty result instead of throwing
    return {
      posts: [],
      totalPages: 0,
      totalPosts: 0,
    };
  }
};

// Additional utility functions for WordPress API

export const getPostById = async (id: number): Promise<WordPressPost | null> => {
  try {
    if (!baseUrl) {
      throw new Error('WordPress URL is not configured');
    }

    const response = await fetch(`${baseUrl}/wp-json/wp/v2/posts/${id}?_embed=true`, {
      // Add caching for better performance
      next: { revalidate: 300 }, // Cache for 5 minutes
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`WordPress API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching post by ID:', error);
    return null;
  }
};

// Get post by slug
export const getPostBySlug = async (slug: string): Promise<WordPressPost | null> => {
  try {
    if (!baseUrl) {
      throw new Error('WordPress URL is not configured');
    }

    const response = await fetch(`${baseUrl}/wp-json/wp/v2/posts?slug=${slug}&_embed=true`, {
      // Add caching for better performance
      next: { revalidate: 300 }, // Cache for 5 minutes
    });
    
    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status}`);
    }

    const posts: WordPressPost[] = await response.json();
    
    // Return the first post if found, null otherwise
    return posts.length > 0 ? posts[0] : null;
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    return null;
  }
};

export const getCategories = async (): Promise<WordPressCategoriesResponse> => {
  try {
    if (!baseUrl) {
      throw new Error('WordPress URL is not configured');
    }

    const response = await fetch(`${baseUrl}/wp-json/wp/v2/categories?per_page=100`);
    
    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status}`);
    }

    const categories: WordPressCategory[] = await response.json();
    
    const totalCategories = parseInt(response.headers.get('X-WP-Total') || '0');
    const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '0');

    return {
      categories,
      totalPages,
      totalCategories,
    };
  } catch (error) {
    console.error('Error fetching categories:', error);
    return {
      categories: [],
      totalPages: 0,
      totalCategories: 0,
    };
  }
};

export const getTags = async (): Promise<WordPressTagsResponse> => {
  try {
    if (!baseUrl) {
      throw new Error('WordPress URL is not configured');
    }

    const response = await fetch(`${baseUrl}/wp-json/wp/v2/tags?per_page=100`);
    
    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status}`);
    }

    const tags: WordPressTag[] = await response.json();
    
    const totalTags = parseInt(response.headers.get('X-WP-Total') || '0');
    const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '0');

    return {
      tags,
      totalPages,
      totalTags,
    };
  } catch (error) {
    console.error('Error fetching tags:', error);
    return {
      tags: [],
      totalPages: 0,
      totalTags: 0,
    };
  }
};

// Get all posts (for homepage or general listing)
export const getAllPosts = async (options: SearchParams = {}): Promise<WordPressAPIResponse> => {
  try {
    if (!baseUrl) {
      throw new Error('WordPress URL is not configured');
    }

    const params = new URLSearchParams({
      per_page: (options.per_page || 10).toString(),
      page: (options.page || 1).toString(),
      orderby: options.orderby || 'date',
      order: options.order || 'desc',
      _embed: 'true',
    });

    if (options.categories) {
      params.append('categories', options.categories);
    }
    if (options.tags) {
      params.append('tags', options.tags);
    }

    const url = `${baseUrl}/wp-json/wp/v2/posts?${params.toString()}`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(10000),
      // Add caching for better performance
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
    }

    const posts: WordPressPost[] = await response.json();
    
    const totalPosts = parseInt(response.headers.get('X-WP-Total') || '0');
    const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '0');

    return {
      posts,
      totalPages,
      totalPosts,
    };

  } catch (error) {
    console.error('Error fetching all posts from WordPress:', error);
    
    return {
      posts: [],
      totalPages: 0,
      totalPosts: 0,
    };
  }
};

// Get recent comments
export const getRecentComments = async (limit: number = 5): Promise<WordPressComment[]> => {
  try {
    if (!baseUrl) {
      throw new Error('WordPress URL is not configured');
    }

    const params = new URLSearchParams({
      per_page: limit.toString(),
      orderby: 'date',
      order: 'desc',
      status: 'approve', // Only get approved comments
    });

    const url = `${baseUrl}/wp-json/wp/v2/comments?${params.toString()}`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(10000),
      // Add caching for better performance
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
    }

    const comments: WordPressComment[] = await response.json();
    return comments;

  } catch (error) {
    console.error('Error fetching recent comments from WordPress:', error);
    return [];
  }
};

// Get recent comments with post data in a single optimized call
export const getRecentCommentsWithPosts = async (limit: number = 5): Promise<Array<{comment: WordPressComment, post: WordPressPost | null}>> => {
  try {
    if (!baseUrl) {
      throw new Error('WordPress URL is not configured');
    }

    // First get recent comments
    const comments = await getRecentComments(limit);
    
    if (comments.length === 0) {
      return [];
    }

    // Get unique post IDs
    const postIds = [...new Set(comments.map(comment => comment.post))];
    
    // Fetch all posts in one API call
    const postsResponse = await fetch(`${baseUrl}/wp-json/wp/v2/posts?include=${postIds.join(',')}&_embed=true`, {
      headers: {
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(10000),
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    let posts: WordPressPost[] = [];
    if (postsResponse.ok) {
      posts = await postsResponse.json();
    }

    // Create a map for quick lookup
    const postMap = new Map(posts.map(post => [post.id, post]));

    // Combine comments with their posts
    return comments.map(comment => ({
      comment,
      post: postMap.get(comment.post) || null
    }));

  } catch (error) {
    console.error('Error fetching recent comments with posts:', error);
    return [];
  }
};