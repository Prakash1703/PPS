import express from "express";
var router = express.Router();
import { upsertTest } from "../custom_controller/Test.controller.js";
import { GetTestDetails } from "../custom_controller/Test.controller.js";

// Get Shop Listing

router.post("/upsertTest", upsertTest);
router.get("/GetTestDetails", GetTestDetails);

export default router;
