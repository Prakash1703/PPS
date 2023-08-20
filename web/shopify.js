import { BillingInterval, LATEST_API_VERSION } from "@shopify/shopify-api";
import { shopifyApp } from "@shopify/shopify-app-express";
import {MySQLSessionStorage} from "@shopify/shopify-app-session-storage-mysql";
import { restResources } from "@shopify/shopify-api/rest/admin/2023-04";
import * as dotenv from "dotenv";
import mysql from "mysql";

dotenv.config();

const shopify = shopifyApp({
  api: {
    apiKey:process.env.SHOPIFY_API_KEY,//injected by default at  run tim
    apiSecretKey:process.env.SHOPIFY_API_SECRET,//injected by default at run time
    scopes:process.env.SCOPES.split(",")||"write_files,write_themes,write_products,read_products",
    apiVersion:LATEST_API_VERSION,
    hostName:process.env.HOST.replace(/https?:\/\//,""),
    hostScheme:process.env.HOST.split("://")[0],
    restResources,
    billing: undefined, // or replace with billingConfig above to enable example billing
  },
  auth: {
    path: "/api/auth",
    callbackPath: "/api/auth/callback",
  },
  webhooks: {
    path: "/api/webhooks",
  },
  // This should be replaced with your preferred storage strategy
  sessionStorage: new MySQLSessionStorage(process.env.DATABASE_URL),
});

export default shopify;
