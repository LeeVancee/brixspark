// Mock data for LEGO products and search results

export interface Product {
  id: string;
  title: string;
  image: string;
  date: string;
  slug: string;
  category: string;
  description?: string;
  fullDescription?: string;
  downloadLinks?: {
    pdf?: string;
    instructions?: string;
  };
  tags?: string[];
}

export interface RecentPost {
  id: string;
  title: string;
  slug: string;
}

export interface RecentComment {
  id: string;
  author: string;
  content: string;
  postTitle: string;
  postSlug: string;
}

// Mock product data
export const mockProducts: Product[] = [
  {
    id: "1",
    title: "21358 Minifigure Vending Machine P90701",
    image: "/home-n.png", // Placeholder for now
    date: "2024-07-02",
    slug: "21358-minifigure-vending-machine-p90701",
    category: "LEGO Instructions",
    description: "Build your own minifigure vending machine with this detailed instruction set.",
    fullDescription: "Complete building instructions for the 21358 Minifigure Vending Machine. This detailed guide will help you construct your own working vending machine with authentic LEGO bricks. Features include LED lighting effects and realistic minifigure dispensing mechanism.",
    downloadLinks: {
      pdf: "https://vehicle-lighting.oss-eu-west-1.aliyuncs.com/LEGO-lighting-P90701-21358.pdf",
      instructions: "https://vehicle-lighting.oss-eu-west-1.aliyuncs.com/LEGO-lighting-P90701-21358.pdf"
    },
    tags: ["21358", "Minifigure", "Vending Machine", "P90701", "LED Lighting"]
  },
  {
    id: "2", 
    title: "21358 Minifigure Vending Machine GC1086",
    image: "/home-n.png",
    date: "2024-07-02",
    slug: "21358-minifigure-vending-machine-gc1086",
    category: "LEGO Instructions",
    description: "Alternative build version of the minifigure vending machine."
  },
  {
    id: "3",
    title: "21358 Minifigure Vending Machine GC1085", 
    image: "/home-n.png",
    date: "2024-07-02",
    slug: "21358-minifigure-vending-machine-gc1085",
    category: "LEGO Instructions",
    description: "Another variant of the popular minifigure vending machine set."
  },
  {
    id: "4",
    title: "21358 Minifigure Vending Machine P90702",
    image: "/home-n.png", 
    date: "2024-06-24",
    slug: "21358-minifigure-vending-machine-p90702",
    category: "LEGO Instructions",
    description: "Extended version with additional features and components."
  },
  {
    id: "5",
    title: "76448 Fawkes: Dumbledore's Phoenix P91001",
    image: "/home-n.png",
    date: "2024-06-20",
    slug: "76448-fawkes-dumbledores-phoenix-p91001",
    category: "Harry Potter",
    description: "Build the magnificent phoenix from the Harry Potter series."
  },
  {
    id: "6",
    title: "76448 Fawkes: Dumbledore's Phoenix GC1095",
    image: "/home-n.png",
    date: "2024-06-18",
    slug: "76448-fawkes-dumbledores-phoenix-gc1095", 
    category: "Harry Potter",
    description: "Alternative build guide for Fawkes the Phoenix."
  }
];

// Mock recent posts
export const mockRecentPosts: RecentPost[] = [
  {
    id: "1",
    title: "21358 Minifigure Vending Machine P90701",
    slug: "21358-minifigure-vending-machine-p90701"
  },
  {
    id: "2", 
    title: "21358 Minifigure Vending Machine GC1086",
    slug: "21358-minifigure-vending-machine-gc1086"
  },
  {
    id: "3",
    title: "21358 Minifigure Vending Machine GC1085",
    slug: "21358-minifigure-vending-machine-gc1085"
  },
  {
    id: "4",
    title: "76448 Fawkes: Dumbledore's Phoenix P91001", 
    slug: "76448-fawkes-dumbledores-phoenix-p91001"
  },
  {
    id: "5",
    title: "76448 Fawkes: Dumbledore's Phoenix GC1095",
    slug: "76448-fawkes-dumbledores-phoenix-gc1095"
  }
];

// Mock recent comments
export const mockRecentComments: RecentComment[] = [
  {
    id: "1",
    author: "A WordPress Commenter",
    content: "Hello world!",
    postTitle: "Welcome to LEGO Instructions",
    postSlug: "welcome-to-lego-instructions"
  }
];

// Filter products based on search query
export function filterProducts(products: Product[], query: string): Product[] {
  if (!query) return products;
  
  const searchTerm = query.toLowerCase();
  return products.filter(product => 
    product.title.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm) ||
    product.description?.toLowerCase().includes(searchTerm)
  );
}

// Get product by slug
export function getProductBySlug(slug: string): Product | undefined {
  return mockProducts.find(product => product.slug === slug);
} 