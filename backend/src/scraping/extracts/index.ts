import { CheerioAPI } from "cheerio";

export const extractText_html = (selector: string, $: CheerioAPI) => {
  const element = $(selector);
  if (element.length > 0) {
    const htmlContent = element.html();
    return htmlContent ? htmlContent.trim() : "";
  }
  return "";
};

export const extractText_content = (selector: string, $: CheerioAPI) => {
  const element = $(selector);
  if (element.length > 0) {
    const htmlContent = element.attr("content");
    return htmlContent ? htmlContent : "";
  }
  return "";
};

export const extractPrice_text = (selector: string, $: CheerioAPI) => {
  const priceText = $(selector).text().trim();
  const price = priceText.replace(/[^\d,.]/g, "");
  return parseFloat(price.replace(",", "."));
};

export const extractPrice_content = (selector: string, $: CheerioAPI) => {
  const element = $(selector).attr("content");
  const price = parseFloat(element ?? "");
  return isNaN(price) ? false : price;
};

export const extractPrice_firstText = (selector: string, $: CheerioAPI) => {
  const priceText = $(selector).first().text().trim();
  const price = parseFloat(priceText.replace(/[^\d,.]/g, "").replace(",", "."));
  return isNaN(price) ? false : price;
};

export const extractQuantity = (
  selectors: string | string[],
  $: CheerioAPI,
) => {
  for (const selector of selectors) {
    if ($(selector).text().trim().length) {
      return $(selector).text().trim();
    } else if ($(selector).next().text().trim().length) {
      return $(selector).next().text().trim();
    }
  }
  return "";
};

export const extractQuantity_match = (
  selectors: string | string[],
  $: CheerioAPI,
): string => {
  const selectorArray = Array.isArray(selectors) ? selectors : [selectors];
  for (const selector of selectorArray) {
    const element = $(selector);
    const quantity = element.length ? element.text().trim() : "";
    const match = quantity.match(/\d+\s?[a-zA-Z]+/);
    if (match) {
      return match[0];
    }
  }
  return "";
};

export const extractQuantity_contents = (selector: string, $: CheerioAPI) => {
  const element = $(selector);
  return element.length
    ? element
        .contents()
        .filter(function () {
          return this.type === "text";
        })
        .first()
        .text()
        .trim()
    : null;
};

export const extractDescription = (
  selector: string | string[],
  $: CheerioAPI,
) => {
  let title_element = $(selector + " h2").first();
  const title = title_element.length ? title_element.text().trim() + "\n" : "";
  let content_element = $(selector + " p");
  const content = content_element.length ? content_element.text().trim() : "";
  return title + content;
};

export const extractDescription_next = (
  selectors: string | string[],
  $: CheerioAPI,
) => {
  let description = "";
  for (const selector of selectors) {
    const title = $(selector);
    const content = title.next();
    if (title.length && content.length) {
      description = `${title.text().trim()}\n${content.text().trim()}`;
      break;
    }
  }
  return description;
};
