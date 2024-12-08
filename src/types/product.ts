export interface Product {
  id: number;
  title : string;
  price : number;
  description : string;
  category : string;
  image : string;
  rating:{
      rate : number;
      count : number;
  }
}

export type ProductState = {
  products: Product[]; //Original products
  filteredProducts: Product[]; //Filtered products
  loading: boolean;
  error: string | null; //Error message
  searchQuery: string; //Search query
  selectedCategory: string | null; //Selected category
}

