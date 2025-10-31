export interface Article {
  id: number;
  title: string;
  category: string;
  subcategory?: string;
  author: string;
  content: string;
  image: string;
  rating: number;
}
