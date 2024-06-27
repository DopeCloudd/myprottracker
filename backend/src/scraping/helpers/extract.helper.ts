import * as cheerio from "cheerio";
import { Page } from "puppeteer";
import { Config, Selector } from "../types";

export async function fetchAndExtract(
  page: Page,
  url: string,
  config: Config,
  selectors: Selector,
  extractText: (selector: string, $: cheerio.CheerioAPI) => string,
  extractPrice: (selector: string, $: cheerio.CheerioAPI) => number | false,
  extractQuantity: (
    selector: string | string[],
    $: cheerio.CheerioAPI,
  ) => string,
  extractImageUrl: (selector: string, $: cheerio.CheerioAPI) => string,
  extractDescription?: (
    selector: string | string[],
    $: cheerio.CheerioAPI,
  ) => string,
) {
  // Enable request interception
  await page.setRequestInterception(true);
  page.on("request", (req) => {
    if (["image", "stylesheet", "font"].includes(req.resourceType())) {
      req.abort();
    } else {
      req.continue();
    }
  });

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  );

  // Navigate to the URL
  await page.goto(url, { waitUntil: "networkidle2" });

  // Get the HTML content of the page
  const content = await page.content();

  // Load the HTML content into cheerio
  const $ = cheerio.load(content);

  // Initialize the result object
  const result: Record<string, string | number | false> = {};

  // Extract the title
  if (config.title) {
    result.title = extractText(selectors.title, $);
  }

  // Extract the price
  if (config.price) {
    result.price = extractPrice(selectors.price, $);
  }

  // Extract the quantity
  if (config.quantity) {
    result.quantity = extractQuantity(selectors.quantity, $);
  }

  // Extract the description
  if (config.description && extractDescription) {
    result.description = extractDescription(selectors.description, $);
  }

  // Extract the image URL
  if (config.imageUrl) {
    result.imageUrl = extractImageUrl(selectors.imageUrl, $);
  }

  // Set the brand
  if (config.brand) {
    result.brand = "Bulk";
  }

  // Set the URL
  if (config.url) {
    result.url = url;
  }

  return result;
}
