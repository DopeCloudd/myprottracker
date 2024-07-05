import { getUrls } from "./helpers/get-urls.helper";
import { initBrowser } from "./puppeteer/index";
import { Reader } from "./reader";
import { Bulk } from "./scrapers/bulk.scraper";
import { Eafit } from "./scrapers/eafit.scraper";
import { Myprotein } from "./scrapers/myprotein.scraper";
import { Prozis } from "./scrapers/prozis.scraper";
import { Config } from "./types";

const config: Config = {
  title: true,
  price: true,
  quantity: true,
  description: true,
  url: true,
};

(async () => {
  const bulk_urls = await getUrls("Bulk");
  const eafit_urls = await getUrls("Eafit");
  const myprotein_urls = await getUrls("Myprotein");
  const prozis_urls = await getUrls("Prozis");
  const browser = await initBrowser();
  const results = await Promise.all([
    Bulk(browser, config, bulk_urls),
    Eafit(browser, config, eafit_urls),
    Myprotein(browser, config, myprotein_urls),
    Prozis(browser, config, prozis_urls),
  ]);
  await browser.close();
  const flatResults = results.flat();
  console.log(results.flat());
  await Reader(flatResults, config);
})();
