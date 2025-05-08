export interface Project {
    id: number;
    title: string;
    imageUrl: string;
    description?: string;
    link?: string;
    url?: string;
  }
  
  export interface Testimonial {
    id: number;
    name: string;
    role: string;
    content: string;
    imageUrl: string;
  }