// Mock data for WordPress REST API format

// WordPress Post/Product interface following REST API structure
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
  meta: {
    pdf_url?: string;
    instructions_url?: string;
    [key: string]: any;
  };
  categories: number[];
  tags: number[];
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      id: number;
      source_url: string;
      alt_text: string;
      media_details: {
        width: number;
        height: number;
        file: string;
      };
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
      taxonomy: string;
    }>>;
    author?: Array<{
      id: number;
      name: string;
      slug: string;
      avatar_urls: {
        [size: string]: string;
      };
    }>;
  };
  _links: {
    self: Array<{ href: string }>;
    collection: Array<{ href: string }>;
    about: Array<{ href: string }>;
    author: Array<{ embeddable: boolean; href: string }>;
    replies: Array<{ embeddable: boolean; href: string }>;
    'wp:featuredmedia': Array<{ embeddable: boolean; href: string }>;
    'wp:attachment': Array<{ href: string }>;
    'wp:term': Array<{
      taxonomy: string;
      embeddable: boolean;
      href: string;
    }>;
  };
}

// Category interface
export interface WordPressCategory {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  parent: number;
  meta: any[];
}

// Tag interface
export interface WordPressTag {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  meta: any[];
}

// Comment interface
export interface WordPressComment {
  id: number;
  post: number;
  parent: number;
  author: number;
  author_name: string;
  author_url: string;
  author_email: string;
  date: string;
  date_gmt: string;
  content: {
    rendered: string;
  };
  link: string;
  status: string;
  type: string;
  author_avatar_urls: {
    [size: string]: string;
  };
  meta: any[];
}

// Mock categories data
export const mockCategories: WordPressCategory[] = [
  {
    id: 1,
    count: 4,
    description: "LEGO building instructions and guides",
    link: "https://example.com/category/lego-instructions/",
    name: "LEGO Instructions",
    slug: "lego-instructions",
    taxonomy: "category",
    parent: 0,
    meta: []
  },
  {
    id: 2,
    count: 2,
    description: "Harry Potter themed LEGO sets",
    link: "https://example.com/category/harry-potter/",
    name: "Harry Potter",
    slug: "harry-potter",
    taxonomy: "category",
    parent: 0,
    meta: []
  },
  {
    id: 3,
    count: 1,
    description: "Super Mario LEGO collections",
    link: "https://example.com/category/super-mario/",
    name: "Super Mario",
    slug: "super-mario",
    taxonomy: "category",
    parent: 0,
    meta: []
  }
];

// Mock tags data
export const mockTags: WordPressTag[] = [
  { id: 1, count: 1, description: "", link: "https://example.com/tag/21358/", name: "21358", slug: "21358", taxonomy: "post_tag", meta: [] },
  { id: 2, count: 1, description: "", link: "https://example.com/tag/minifigure/", name: "Minifigure", slug: "minifigure", taxonomy: "post_tag", meta: [] },
  { id: 3, count: 1, description: "", link: "https://example.com/tag/vending-machine/", name: "Vending Machine", slug: "vending-machine", taxonomy: "post_tag", meta: [] },
  { id: 4, count: 1, description: "", link: "https://example.com/tag/p90701/", name: "P90701", slug: "p90701", taxonomy: "post_tag", meta: [] },
  { id: 5, count: 1, description: "", link: "https://example.com/tag/led-lighting/", name: "LED Lighting", slug: "led-lighting", taxonomy: "post_tag", meta: [] },
  { id: 6, count: 1, description: "", link: "https://example.com/tag/76448/", name: "76448", slug: "76448", taxonomy: "post_tag", meta: [] },
  { id: 7, count: 1, description: "", link: "https://example.com/tag/fawkes/", name: "Fawkes", slug: "fawkes", taxonomy: "post_tag", meta: [] },
  { id: 8, count: 1, description: "", link: "https://example.com/tag/phoenix/", name: "Phoenix", slug: "phoenix", taxonomy: "post_tag", meta: [] },
  { id: 9, count: 1, description: "", link: "https://example.com/tag/72037/", name: "72037", slug: "72037", taxonomy: "post_tag", meta: [] },
  { id: 10, count: 1, description: "", link: "https://example.com/tag/mario-kart/", name: "Mario Kart", slug: "mario-kart", taxonomy: "post_tag", meta: [] },
  { id: 11, count: 1, description: "", link: "https://example.com/tag/racing/", name: "Racing", slug: "racing", taxonomy: "post_tag", meta: [] },
  { id: 12, count: 1, description: "", link: "https://example.com/tag/nintendo/", name: "Nintendo", slug: "nintendo", taxonomy: "post_tag", meta: [] }
];

// Mock WordPress posts data following REST API structure
export const mockProducts: WordPressPost[] = [
  {
    id: 1,
    date: "2024-07-02T10:30:00",
    date_gmt: "2024-07-02T10:30:00",
    guid: {
      rendered: "https://example.com/?p=1"
    },
    modified: "2024-07-02T10:30:00",
    modified_gmt: "2024-07-02T10:30:00",
    slug: "21358-minifigure-vending-machine-p90701",
    status: "publish",
    type: "post",
    link: "https://example.com/21358-minifigure-vending-machine-p90701/",
    title: {
      rendered: "21358 Minifigure Vending Machine P90701"
    },
    content: {
      rendered: "<p>Complete building instructions for the 21358 Minifigure Vending Machine. This detailed guide will help you construct your own working vending machine with authentic LEGO bricks. Features include LED lighting effects and realistic minifigure dispensing mechanism.</p>",
      protected: false
    },
    excerpt: {
      rendered: "<p>Build your own minifigure vending machine with this detailed instruction set.</p>",
      protected: false
    },
    author: 1,
    featured_media: 1,
    comment_status: "open",
    ping_status: "open",
    sticky: false,
    template: "",
    format: "standard",
    meta: {
      pdf_url: "https://vehicle-lighting.oss-eu-west-1.aliyuncs.com/LEGO-lighting-P90701-21358.pdf",
      instructions_url: "https://vehicle-lighting.oss-eu-west-1.aliyuncs.com/LEGO-lighting-P90701-21358.pdf"
    },
    categories: [1],
    tags: [1, 2, 3, 4, 5],
    _embedded: {
      'wp:featuredmedia': [{
        id: 1,
        source_url: "/home-n.png",
        alt_text: "21358 Minifigure Vending Machine",
        media_details: {
          width: 800,
          height: 600,
          file: "2024/07/minifigure-vending-machine.jpg"
        }
      }],
      'wp:term': [
        [{ id: 1, name: "LEGO Instructions", slug: "lego-instructions", taxonomy: "category" }],
        [
          { id: 1, name: "21358", slug: "21358", taxonomy: "post_tag" },
          { id: 2, name: "Minifigure", slug: "minifigure", taxonomy: "post_tag" },
          { id: 3, name: "Vending Machine", slug: "vending-machine", taxonomy: "post_tag" },
          { id: 4, name: "P90701", slug: "p90701", taxonomy: "post_tag" },
          { id: 5, name: "LED Lighting", slug: "led-lighting", taxonomy: "post_tag" }
        ]
      ],
      author: [{
        id: 1,
        name: "fengma_admin",
        slug: "fengma_admin",
        avatar_urls: {
          "24": "https://secure.gravatar.com/avatar/...?s=24",
          "48": "https://secure.gravatar.com/avatar/...?s=48",
          "96": "https://secure.gravatar.com/avatar/...?s=96"
        }
      }]
    },
    _links: {
      self: [{ href: "https://example.com/wp-json/wp/v2/posts/1" }],
      collection: [{ href: "https://example.com/wp-json/wp/v2/posts" }],
      about: [{ href: "https://example.com/wp-json/wp/v2/types/post" }],
      author: [{ embeddable: true, href: "https://example.com/wp-json/wp/v2/users/1" }],
      replies: [{ embeddable: true, href: "https://example.com/wp-json/wp/v2/comments?post=1" }],
      'wp:featuredmedia': [{ embeddable: true, href: "https://example.com/wp-json/wp/v2/media/1" }],
      'wp:attachment': [{ href: "https://example.com/wp-json/wp/v2/media?parent=1" }],
      'wp:term': [
        { taxonomy: "category", embeddable: true, href: "https://example.com/wp-json/wp/v2/categories?post=1" },
        { taxonomy: "post_tag", embeddable: true, href: "https://example.com/wp-json/wp/v2/tags?post=1" }
      ]
    }
  },
  {
    id: 2,
    date: "2024-07-02T10:30:00",
    date_gmt: "2024-07-02T10:30:00",
    guid: {
      rendered: "https://example.com/?p=2"
    },
    modified: "2024-07-02T10:30:00",
    modified_gmt: "2024-07-02T10:30:00",
    slug: "21358-minifigure-vending-machine-gc1086",
    status: "publish",
    type: "post",
    link: "https://example.com/21358-minifigure-vending-machine-gc1086/",
    title: {
      rendered: "21358 Minifigure Vending Machine GC1086"
    },
    content: {
      rendered: "<p>Alternative build version of the minifigure vending machine with different lighting configuration.</p>",
      protected: false
    },
    excerpt: {
      rendered: "<p>Alternative build version of the minifigure vending machine.</p>",
      protected: false
    },
    author: 1,
    featured_media: 2,
    comment_status: "open",
    ping_status: "open",
    sticky: false,
    template: "",
    format: "standard",
    meta: {},
    categories: [1],
    tags: [1, 2, 3],
    _embedded: {
      'wp:featuredmedia': [{
        id: 2,
        source_url: "/home-n.png",
        alt_text: "21358 Minifigure Vending Machine GC1086",
        media_details: {
          width: 800,
          height: 600,
          file: "2024/07/minifigure-vending-machine-gc1086.jpg"
        }
      }],
      'wp:term': [
        [{ id: 1, name: "LEGO Instructions", slug: "lego-instructions", taxonomy: "category" }],
        [
          { id: 1, name: "21358", slug: "21358", taxonomy: "post_tag" },
          { id: 2, name: "Minifigure", slug: "minifigure", taxonomy: "post_tag" },
          { id: 3, name: "Vending Machine", slug: "vending-machine", taxonomy: "post_tag" }
        ]
      ]
    },
    _links: {
      self: [{ href: "https://example.com/wp-json/wp/v2/posts/2" }],
      collection: [{ href: "https://example.com/wp-json/wp/v2/posts" }],
      about: [{ href: "https://example.com/wp-json/wp/v2/types/post" }],
      author: [{ embeddable: true, href: "https://example.com/wp-json/wp/v2/users/1" }],
      replies: [{ embeddable: true, href: "https://example.com/wp-json/wp/v2/comments?post=2" }],
      'wp:featuredmedia': [{ embeddable: true, href: "https://example.com/wp-json/wp/v2/media/2" }],
      'wp:attachment': [{ href: "https://example.com/wp-json/wp/v2/media?parent=2" }],
      'wp:term': [
        { taxonomy: "category", embeddable: true, href: "https://example.com/wp-json/wp/v2/categories?post=2" },
        { taxonomy: "post_tag", embeddable: true, href: "https://example.com/wp-json/wp/v2/tags?post=2" }
      ]
    }
  },
  {
    id: 3,
    date: "2024-07-02T10:30:00",
    date_gmt: "2024-07-02T10:30:00",
    guid: {
      rendered: "https://example.com/?p=3"
    },
    modified: "2024-07-02T10:30:00",
    modified_gmt: "2024-07-02T10:30:00",
    slug: "21358-minifigure-vending-machine-gc1085",
    status: "publish",
    type: "post",
    link: "https://example.com/21358-minifigure-vending-machine-gc1085/",
    title: {
      rendered: "21358 Minifigure Vending Machine GC1085"
    },
    content: {
      rendered: "<p>Another variant of the popular minifigure vending machine set with unique features.</p>",
      protected: false
    },
    excerpt: {
      rendered: "<p>Another variant of the popular minifigure vending machine set.</p>",
      protected: false
    },
    author: 1,
    featured_media: 3,
    comment_status: "open",
    ping_status: "open",
    sticky: false,
    template: "",
    format: "standard",
    meta: {},
    categories: [1],
    tags: [1, 2, 3],
    _embedded: {
      'wp:featuredmedia': [{
        id: 3,
        source_url: "/home-n.png",
        alt_text: "21358 Minifigure Vending Machine GC1085",
        media_details: {
          width: 800,
          height: 600,
          file: "2024/07/minifigure-vending-machine-gc1085.jpg"
        }
      }]
    },
    _links: {
      self: [{ href: "https://example.com/wp-json/wp/v2/posts/3" }],
      collection: [{ href: "https://example.com/wp-json/wp/v2/posts" }],
      about: [{ href: "https://example.com/wp-json/wp/v2/types/post" }],
      author: [{ embeddable: true, href: "https://example.com/wp-json/wp/v2/users/1" }],
      replies: [{ embeddable: true, href: "https://example.com/wp-json/wp/v2/comments?post=3" }],
      'wp:featuredmedia': [{ embeddable: true, href: "https://example.com/wp-json/wp/v2/media/3" }],
      'wp:attachment': [{ href: "https://example.com/wp-json/wp/v2/media?parent=3" }],
      'wp:term': [
        { taxonomy: "category", embeddable: true, href: "https://example.com/wp-json/wp/v2/categories?post=3" },
        { taxonomy: "post_tag", embeddable: true, href: "https://example.com/wp-json/wp/v2/tags?post=3" }
      ]
    }
  },
  {
    id: 4,
    date: "2024-06-24T10:30:00",
    date_gmt: "2024-06-24T10:30:00",
    guid: {
      rendered: "https://example.com/?p=4"
    },
    modified: "2024-06-24T10:30:00",
    modified_gmt: "2024-06-24T10:30:00",
    slug: "21358-minifigure-vending-machine-p90702",
    status: "publish",
    type: "post",
    link: "https://example.com/21358-minifigure-vending-machine-p90702/",
    title: {
      rendered: "21358 Minifigure Vending Machine P90702"
    },
    content: {
      rendered: "<p>Extended version with additional features and components for enhanced functionality.</p>",
      protected: false
    },
    excerpt: {
      rendered: "<p>Extended version with additional features and components.</p>",
      protected: false
    },
    author: 1,
    featured_media: 4,
    comment_status: "open",
    ping_status: "open",
    sticky: false,
    template: "",
    format: "standard",
    meta: {},
    categories: [1],
    tags: [1, 2, 3],
    _embedded: {
      'wp:featuredmedia': [{
        id: 4,
        source_url: "/home-n.png",
        alt_text: "21358 Minifigure Vending Machine P90702",
        media_details: {
          width: 800,
          height: 600,
          file: "2024/06/minifigure-vending-machine-p90702.jpg"
        }
      }]
    },
    _links: {
      self: [{ href: "https://example.com/wp-json/wp/v2/posts/4" }],
      collection: [{ href: "https://example.com/wp-json/wp/v2/posts" }],
      about: [{ href: "https://example.com/wp-json/wp/v2/types/post" }],
      author: [{ embeddable: true, href: "https://example.com/wp-json/wp/v2/users/1" }],
      replies: [{ embeddable: true, href: "https://example.com/wp-json/wp/v2/comments?post=4" }],
      'wp:featuredmedia': [{ embeddable: true, href: "https://example.com/wp-json/wp/v2/media/4" }],
      'wp:attachment': [{ href: "https://example.com/wp-json/wp/v2/media?parent=4" }],
      'wp:term': [
        { taxonomy: "category", embeddable: true, href: "https://example.com/wp-json/wp/v2/categories?post=4" },
        { taxonomy: "post_tag", embeddable: true, href: "https://example.com/wp-json/wp/v2/tags?post=4" }
      ]
    }
  },
  {
    id: 5,
    date: "2024-06-20T10:30:00",
    date_gmt: "2024-06-20T10:30:00",
    guid: {
      rendered: "https://example.com/?p=5"
    },
    modified: "2024-06-20T10:30:00",
    modified_gmt: "2024-06-20T10:30:00",
    slug: "76448-fawkes-dumbledores-phoenix-p91001",
    status: "publish",
    type: "post",
    link: "https://example.com/76448-fawkes-dumbledores-phoenix-p91001/",
    title: {
      rendered: "76448 Fawkes: Dumbledore's Phoenix P91001"
    },
    content: {
      rendered: "<p>Build the magnificent phoenix from the Harry Potter series with detailed instructions and lighting effects.</p>",
      protected: false
    },
    excerpt: {
      rendered: "<p>Build the magnificent phoenix from the Harry Potter series.</p>",
      protected: false
    },
    author: 1,
    featured_media: 5,
    comment_status: "open",
    ping_status: "open",
    sticky: false,
    template: "",
    format: "standard",
    meta: {},
    categories: [2],
    tags: [6, 7, 8],
    _embedded: {
      'wp:featuredmedia': [{
        id: 5,
        source_url: "/home-n.png",
        alt_text: "76448 Fawkes: Dumbledore's Phoenix",
        media_details: {
          width: 800,
          height: 600,
          file: "2024/06/fawkes-phoenix.jpg"
        }
      }]
    },
    _links: {
      self: [{ href: "https://example.com/wp-json/wp/v2/posts/5" }],
      collection: [{ href: "https://example.com/wp-json/wp/v2/posts" }],
      about: [{ href: "https://example.com/wp-json/wp/v2/types/post" }],
      author: [{ embeddable: true, href: "https://example.com/wp-json/wp/v2/users/1" }],
      replies: [{ embeddable: true, href: "https://example.com/wp-json/wp/v2/comments?post=5" }],
      'wp:featuredmedia': [{ embeddable: true, href: "https://example.com/wp-json/wp/v2/media/5" }],
      'wp:attachment': [{ href: "https://example.com/wp-json/wp/v2/media?parent=5" }],
      'wp:term': [
        { taxonomy: "category", embeddable: true, href: "https://example.com/wp-json/wp/v2/categories?post=5" },
        { taxonomy: "post_tag", embeddable: true, href: "https://example.com/wp-json/wp/v2/tags?post=5" }
      ]
    }
  },
  {
    id: 6,
    date: "2024-06-18T10:30:00",
    date_gmt: "2024-06-18T10:30:00",
    guid: {
      rendered: "https://example.com/?p=6"
    },
    modified: "2024-06-18T10:30:00",
    modified_gmt: "2024-06-18T10:30:00",
    slug: "76448-fawkes-dumbledores-phoenix-gc1095",
    status: "publish",
    type: "post",
    link: "https://example.com/76448-fawkes-dumbledores-phoenix-gc1095/",
    title: {
      rendered: "76448 Fawkes: Dumbledore's Phoenix GC1095"
    },
    content: {
      rendered: "<p>Alternative build guide for Fawkes the Phoenix with different display options.</p>",
      protected: false
    },
    excerpt: {
      rendered: "<p>Alternative build guide for Fawkes the Phoenix.</p>",
      protected: false
    },
    author: 1,
    featured_media: 6,
    comment_status: "open",
    ping_status: "open",
    sticky: false,
    template: "",
    format: "standard",
    meta: {},
    categories: [2],
    tags: [6, 7, 8],
    _embedded: {
      'wp:featuredmedia': [{
        id: 6,
        source_url: "/home-n.png",
        alt_text: "76448 Fawkes: Dumbledore's Phoenix GC1095",
        media_details: {
          width: 800,
          height: 600,
          file: "2024/06/fawkes-phoenix-gc1095.jpg"
        }
      }]
    },
    _links: {
      self: [{ href: "https://example.com/wp-json/wp/v2/posts/6" }],
      collection: [{ href: "https://example.com/wp-json/wp/v2/posts" }],
      about: [{ href: "https://example.com/wp-json/wp/v2/types/post" }],
      author: [{ embeddable: true, href: "https://example.com/wp-json/wp/v2/users/1" }],
      replies: [{ embeddable: true, href: "https://example.com/wp-json/wp/v2/comments?post=6" }],
      'wp:featuredmedia': [{ embeddable: true, href: "https://example.com/wp-json/wp/v2/media/6" }],
      'wp:attachment': [{ href: "https://example.com/wp-json/wp/v2/media?parent=6" }],
      'wp:term': [
        { taxonomy: "category", embeddable: true, href: "https://example.com/wp-json/wp/v2/categories?post=6" },
        { taxonomy: "post_tag", embeddable: true, href: "https://example.com/wp-json/wp/v2/tags?post=6" }
      ]
    }
  },
  {
    id: 7,
    date: "2024-08-15T10:30:00",
    date_gmt: "2024-08-15T10:30:00",
    guid: {
      rendered: "https://example.com/?p=7"
    },
    modified: "2024-08-15T10:30:00",
    modified_gmt: "2024-08-15T10:30:00",
    slug: "72037-mario-kart-racing-set",
    status: "publish",
    type: "post",
    link: "https://example.com/72037-mario-kart-racing-set/",
    title: {
      rendered: "72037 Mario Kart Racing Set"
    },
    content: {
      rendered: "<p>Complete building instructions for the 72037 Mario Kart Racing Set. This exciting set features Mario's iconic kart with authentic details and racing accessories. Perfect for Mario fans and LEGO racing enthusiasts alike.</p>",
      protected: false
    },
    excerpt: {
      rendered: "<p>Build the ultimate Mario Kart racing experience with this detailed instruction set.</p>",
      protected: false
    },
    author: 1,
    featured_media: 7,
    comment_status: "open",
    ping_status: "open",
    sticky: false,
    template: "",
    format: "standard",
    meta: {
      pdf_url: "/72037 Mario Kart.pdf",
      instructions_url: "/72037 Mario Kart.pdf"
    },
    categories: [3],
    tags: [9, 10, 11, 12],
    _embedded: {
      'wp:featuredmedia': [{
        id: 7,
        source_url: "/home-n.png",
        alt_text: "72037 Mario Kart Racing Set",
        media_details: {
          width: 800,
          height: 600,
          file: "2024/08/mario-kart-racing-set.jpg"
        }
      }],
      'wp:term': [
        [{ id: 3, name: "Super Mario", slug: "super-mario", taxonomy: "category" }],
        [
          { id: 9, name: "72037", slug: "72037", taxonomy: "post_tag" },
          { id: 10, name: "Mario Kart", slug: "mario-kart", taxonomy: "post_tag" },
          { id: 11, name: "Racing", slug: "racing", taxonomy: "post_tag" },
          { id: 12, name: "Nintendo", slug: "nintendo", taxonomy: "post_tag" }
        ]
      ]
    },
    _links: {
      self: [{ href: "https://example.com/wp-json/wp/v2/posts/7" }],
      collection: [{ href: "https://example.com/wp-json/wp/v2/posts" }],
      about: [{ href: "https://example.com/wp-json/wp/v2/types/post" }],
      author: [{ embeddable: true, href: "https://example.com/wp-json/wp/v2/users/1" }],
      replies: [{ embeddable: true, href: "https://example.com/wp-json/wp/v2/comments?post=7" }],
      'wp:featuredmedia': [{ embeddable: true, href: "https://example.com/wp-json/wp/v2/media/7" }],
      'wp:attachment': [{ href: "https://example.com/wp-json/wp/v2/media?parent=7" }],
      'wp:term': [
        { taxonomy: "category", embeddable: true, href: "https://example.com/wp-json/wp/v2/categories?post=7" },
        { taxonomy: "post_tag", embeddable: true, href: "https://example.com/wp-json/wp/v2/tags?post=7" }
      ]
    }
  }
];

// Mock recent comments
export const mockRecentComments: WordPressComment[] = [
  {
    id: 1,
    post: 1,
    parent: 0,
    author: 0,
    author_name: "A WordPress Commenter",
    author_url: "",
    author_email: "wapuu@wordpress.example",
    date: "2024-07-02T11:00:00",
    date_gmt: "2024-07-02T11:00:00",
    content: {
      rendered: "<p>Hello world!</p>"
    },
    link: "https://example.com/21358-minifigure-vending-machine-p90701/#comment-1",
    status: "approved",
    type: "comment",
    author_avatar_urls: {
      "24": "https://secure.gravatar.com/avatar/...?s=24",
      "48": "https://secure.gravatar.com/avatar/...?s=48",
      "96": "https://secure.gravatar.com/avatar/...?s=96"
    },
    meta: []
  }
];

// Utility functions adapted for WordPress format

// Filter products based on search query (compatible with WordPress structure)
export function filterProducts(products: WordPressPost[], query: string): WordPressPost[] {
  if (!query) return products;
  
  const searchTerm = query.toLowerCase();
  return products.filter(product => 
    product.title.rendered.toLowerCase().includes(searchTerm) ||
    product.content.rendered.toLowerCase().includes(searchTerm) ||
    product.excerpt.rendered.toLowerCase().includes(searchTerm) ||
    (product._embedded?.['wp:term'] && 
     product._embedded['wp:term'].some(termGroup => 
       termGroup.some(term => term.name.toLowerCase().includes(searchTerm))
     ))
  );
}

// Get product by slug (compatible with WordPress structure)
export function getProductBySlug(slug: string): WordPressPost | undefined {
  return mockProducts.find(product => product.slug === slug);
}

// Get product by ID (WordPress typically uses numeric IDs)
export function getProductById(id: number): WordPressPost | undefined {
  return mockProducts.find(product => product.id === id);
}

// Get category by ID
export function getCategoryById(id: number): WordPressCategory | undefined {
  return mockCategories.find(category => category.id === id);
}

// Get tag by ID
export function getTagById(id: number): WordPressTag | undefined {
  return mockTags.find(tag => tag.id === id);
}

// Get products by category
export function getProductsByCategory(categoryId: number): WordPressPost[] {
  return mockProducts.filter(product => product.categories.includes(categoryId));
}

// Get products by tag
export function getProductsByTag(tagId: number): WordPressPost[] {
  return mockProducts.filter(product => product.tags.includes(tagId));
}

// Convert WordPress post to legacy Product format (for backward compatibility)
export function wordPressToLegacyProduct(post: WordPressPost) {
  return {
    id: post.id.toString(),
    title: post.title.rendered,
    image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || "/home-n.png",
    date: post.date.split('T')[0],
    slug: post.slug,
    category: post._embedded?.['wp:term']?.[0]?.[0]?.name || "未分类",
    description: post.excerpt.rendered.replace(/<[^>]*>/g, ''),
    fullDescription: post.content.rendered.replace(/<[^>]*>/g, ''),
    downloadLinks: {
      pdf: post.meta?.pdf_url,
      instructions: post.meta?.instructions_url
    },
    tags: post._embedded?.['wp:term']?.[1]?.map(tag => tag.name) || []
  };
}

// Mock API response simulation (for testing)
export function simulateWordPressApiResponse(posts: WordPressPost[], page: number = 1, perPage: number = 10) {
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedPosts = posts.slice(startIndex, endIndex);
  
  return {
    data: paginatedPosts,
    headers: {
      'X-WP-Total': posts.length.toString(),
      'X-WP-TotalPages': Math.ceil(posts.length / perPage).toString()
    }
  };
} 