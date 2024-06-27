import { Browser } from "puppeteer";
import { Config } from "scraping/types";
import {
  extractImageUrl_src,
  extractPrice_text,
  extractQuantity,
  extractText_html,
} from "../extracts/index";
import { fetchAndExtract } from "../helpers/extract.helper";
import { selectors } from "../selectors/bulk.selector";

export async function Bulk(
  browser: Browser,
  config: Config,
  urls: string[],
): Promise<Record<string, string | number | false>[]> {
  const promises = urls.map(async (url: string) => {
    const page = await browser.newPage();
    const data = await fetchAndExtract(
      page,
      url,
      config,
      selectors,
      extractText_html,
      extractPrice_text,
      extractQuantity,
      extractImageUrl_src,
    );
    await page.close();
    return data;
  });
  const results = await Promise.all(promises);
  return results;
}
