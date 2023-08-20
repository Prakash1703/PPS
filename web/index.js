// @ts-check
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";

import shopify from "./shopify.js";
import productCreator from "./product-creator.js";
import GDPRWebhookHandlers from "./gdpr.js";
import { shopifyApp } from "@shopify/shopify-app-express";

//Routers
import TestRouter  from "./custom_router/Test.router.js";
import OptionSetRouter  from "./custom_router/OptionSet.router.js";

const PORT = parseInt(
  process.env.BACKEND_PORT || process.env.PORT || "3000",
  10
);

const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

const app = express();

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot()
);
app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: GDPRWebhookHandlers })
);

app.get("/api/hello-word", async (_req, res) => {
  console.log("API CALL FROM PDP TO APP");
  res.status(200).send({ success: true, message: "hello" });
});
app.get("/api/getProductPersonalizationSettings", async (_req, res) => {
  console.log("API CALL FROM PDP TO APP");
  let getProductPersonalizationSettings = [
    { sizeAndFit: "false" },
    { febric: true },
    { buttonColor: true },
    { collorStyle: true },
    { cuffStyle: true },
    { placketStyle: true },
    { contrastFebric: true },
    { additionalCustomizaion: true },
    { piping: true },
    { engraveCollerStays: true },
    { pocketStyle: true },
    { monogram: true },
    { contrastButtonStitching: true },
    { gauntletButton: true },
    { cuffWidthAlteration: true },
  ];

  res
    .status(200)
    .send({
      success: true,
      productPersonalizationSettings: getProductPersonalizationSettings
    });
});
// If you are adding routes outside of the /api path, remember to
// also add a proxy rule for them in web/frontend/vite.config.js

app.use("/api/*", shopify.validateAuthenticatedSession());

app.use(express.json());
// TestRouter
app.use('/api/shop',TestRouter);
app.use('/api/app/optionSet',OptionSetRouter);

app.get("/api/shop", async (_req, res) => {
  console.warn("Shop Data Requested from front-end");
  const shopData = await shopify.api.rest.Shop.all({
    session: res.locals.shopify.session,
  });
  res.status(200).send(shopData);
});

app.get("/api/products/count", async (_req, res) => {
  const countData = await shopify.api.rest.Product.count({
    session: res.locals.shopify.session,
  });
  res.status(200).send(countData);
});

app.get("/api/products/create", async (_req, res) => {
  let status = 200;
  let error = null;

  try {
    await productCreator(res.locals.shopify.session);
  } catch (e) {
    console.log(`Failed to process products/create: ${e.message}`);
    status = 500;
    error = e.message;
  }
  res.status(status).send({ success: status === 200, error });
});

app.use(shopify.cspHeaders());
app.use(serveStatic(STATIC_PATH, { index: false }));

app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});

app.listen(PORT);
