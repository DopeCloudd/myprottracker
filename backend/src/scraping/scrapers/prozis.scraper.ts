import { Browser } from "puppeteer";
import { Config } from "scraping/types";
import {
  extractDescription,
  extractImageUrl_content,
  extractPrice_content,
  extractQuantity_match,
  extractText_content,
} from "../extracts/index";
import { fetchAndExtract } from "../helpers/extract.helper";
import { selectors } from "../selectors/prozis.selector";

export async function Prozis(
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
      extractText_content,
      extractDescription,
      extractPrice_content,
      extractQuantity_match,
      extractImageUrl_content,
    );
    await page.close();
    return data;
  });
  const results = await Promise.all(promises);
  return results;
}
