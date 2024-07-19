import { Router } from "express";
import { scrapeData } from "../scraping";

const scrapingRouter = Router();

scrapingRouter.get("/scraping/start", scrapeData);

export default scrapingRouter;
