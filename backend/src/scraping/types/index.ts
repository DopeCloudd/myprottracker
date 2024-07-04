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
  url?: boolean;
};
