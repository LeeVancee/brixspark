// WordPress Post Types
export interface WordPressPost {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  template: string;
  format: string;
  meta: Record<string, unknown>[];
  categories: number[];
  tags: number[];
  class_list: string[];
  _embedded?: {
    'wp:featuredmedia'?: WordPressMedia[];
    'wp:term'?: WordPressTerm[][];
    author?: WordPressAuthor[];
    replies?: WordPressComment[][];
  };
  _links: {
    self: WordPressLink[];
    collection: WordPressLink[];
    about: WordPressLink[];
    author: WordPressLink[];
    replies: WordPressLink[];
    'version-history': WordPressLink[];
    'predecessor-version': WordPressLink[];
    'wp:featuredmedia': WordPressLink[];
    'wp:attachment': WordPressLink[];
    'wp:term': WordPressLink[];
    curies: WordPressLink[];
  };
}

// WordPress Media Types
export interface WordPressMedia {
  id: number;
  date: string;
  slug: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  author: number;
  caption: {
    rendered: string;
  };
  alt_text: string;
  media_type: string;
  mime_type: string;
  media_details: {
    width: number;
    height: number;
    file: string;
    filesize: number;
    sizes: {
      [key: string]: {
        file: string;
        width: number;
        height: number;
        filesize?: number;
        mime_type: string;
        source_url: string;
      };
    };
    image_meta: {
      [x: string]: unknown;
    };
  };
  source_url: string;
}

// WordPress Category/Tag Types
export interface WordPressCategory {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  parent: number;
  meta: Record<string, unknown>[];
  _links: {
    [key: string]: WordPressLink[];
  };
}

export interface WordPressTag {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  meta: Record<string, unknown>[];
  _links: {
    [key: string]: WordPressLink[];
  };
}

export interface WordPressTerm {
  id: number;
  name: string;
  slug: string;
  taxonomy: string;
  description: string;
  parent: number;
  count: number;
  link: string;
}

// WordPress Author Types
export interface WordPressAuthor {
  id: number;
  name: string;
  url: string;
  description: string;
  link: string;
  slug: string;
  avatar_urls: {
    [key: string]: string;
  };
  meta: Record<string, unknown>[];
  _links: {
    [key: string]: WordPressLink[];
  };
}

// WordPress Comment Types
export interface WordPressComment {
  id: number;
  post: number;
  parent: number;
  author: number;
  author_name: string;
  author_url: string;
  date: string;
  date_gmt: string;
  content: {
    rendered: string;
  };
  link: string;
  status: string;
  type: string;
  author_avatar_urls: {
    [key: string]: string;
  };
  meta: Record<string, unknown>[];
  _links: {
    [key: string]: WordPressLink[];
  };
}

// WordPress Link Types
export interface WordPressLink {
  href: string;
  embeddable?: boolean;
  taxonomy?: string;
  templated?: boolean;
}

// API Search Parameters
export interface SearchParams {
  search?: string;
  categories?: string;
  tags?: string;
  per_page?: number;
  page?: number;
  orderby?: 'date' | 'title' | 'relevance' | 'id' | 'include' | 'slug' | 'modified';
  order?: 'asc' | 'desc';
  author?: number;
  author_exclude?: number[];
  before?: string;
  after?: string;
  exclude?: number[];
  include?: number[];
  offset?: number;
  slug?: string;
  status?: string;
  sticky?: boolean;
}

// API Response Types
export interface WordPressAPIResponse {
  posts: WordPressPost[];
  totalPages: number;
  totalPosts: number;
}

export interface WordPressCategoriesResponse {
  categories: WordPressCategory[];
  totalPages: number;
  totalCategories: number;
}

export interface WordPressTagsResponse {
  tags: WordPressTag[];
  totalPages: number;
  totalTags: number;
}

// Error Types
export interface WordPressAPIError {
  code: string;
  message: string;
  data?: {
    status: number;
    [key: string]: unknown;
  };
}

// Utility Types
export type PostStatus = 'publish' | 'future' | 'draft' | 'pending' | 'private' | 'trash' | 'auto-draft' | 'inherit';
export type PostFormat = 'standard' | 'aside' | 'chat' | 'gallery' | 'link' | 'image' | 'quote' | 'status' | 'video' | 'audio';
export type CommentStatus = 'open' | 'closed';
export type PingStatus = 'open' | 'closed';
