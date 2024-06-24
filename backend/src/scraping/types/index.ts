export type Selector = {
  title: string;
  price: string;
  quantity: string | string[];
  description: string | string[];
  imageUrl: string;
};

export type Config = {
  title?: boolean;
  price?: boolean;
  quantity?: boolean;
  description?: boolean;
  imageUrl?: true;
  brand?: boolean;
  url?: boolean;
  category?: boolean;
};
