export type Product = {
  id: number;
  title: string;
  description: string;
  rating: number;
  price: number;
  lowestPrice: number;
  highestPrice: number;
  quantity: string;
  brand: string;
  image: ProductImage;
  url: string;
};

type ProductImage = {
  type: string;
  data: number[];
};
