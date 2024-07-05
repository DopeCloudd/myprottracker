import { Selector } from "../types";

export const selectors: Selector = {
  title: ".header-title",
  price: ".dropin-price--default",
  quantity: [
    ".dropin-text-swatch--selected",
    ".dropin-picker__select option:selected",
  ],
  description: ".attribute-container",
  imageUrl: ".pdp-carousel__slide--active img",
};
