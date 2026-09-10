export type ProductMetal =
  | "white-gold"
  | "yellow-gold"
  | "rose-gold"
  | "platinum";

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  priceFrom: number;
  image: string;
  metals: ProductMetal[];
  to: string;
  badge?: string;
}
