import type { Product } from "@/entities/product";
import type { ProductCategory } from "@/entities/product-category";

export interface ProductShelfContent {
  category: ProductCategory;
  products: Product[];
  to: string;
}
