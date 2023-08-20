import express from "express";
import { UpsertOptionSet } from "../custom_controller/OptionSet.controller.js";
import { getOptionSet } from "../custom_controller/OptionSet.controller.js";
const app=express();
app.use(express.json());
var router=express.Router();

// Get Shop Listing
router.post("/UpsertOptionSet",UpsertOptionSet);
router.get("/getOptionSet",getOptionSet);

export default router;

