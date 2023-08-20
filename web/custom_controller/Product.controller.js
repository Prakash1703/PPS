import { GetShopDetails } from "./Shop.controller.js";
import Shop from "../frontend/models/Shop.model.js";
import Product from "../frontend/models/Product.model.js";

export const GetProduct = async (req, res) => {
  try {
    const shopName = res.locals.shopify.session.shop;
    const shopTbl = await Shop.findOne({ where: { shop_domain: shopName } });
    console.log("SHOP ID:", shopTbl.dataValues.store_id);
    const productList = await Product.findAll({
      where: { store_id: shopTbl.dataValues.store_id },
    });
    console.log("Product List:", productList);
    res.status(200).send({
      msg: "Sucess while fetching Product data",
      sucess: 1,
      data: productList,
    });
  } catch (error) {
    res.status(500).send({
      msg: "Error while fetching product data",
      sucess: 1,
      data: error,
    });
  }
};

export const UpsertProduct = async (req, res) => {
  try {
    console.log(req.body.selectedProduct.length);
    if (!req.body.selectedProduct) {
      throw new Error("Name property not found in request body");
    }

    const shopName = res.locals.shopify.session.shop;
    const shopTbl = await Shop.findOne({ where: { shop_domain: shopName } });

    let prodObj = req.body.selectedProduct.map((value, index) => {
      return {
        store_id: shopTbl.dataValues.store_id,
        product_id: value.id,
        title: value.title,
        handle: value.handle,
        image: value.image,
      };
    });
    Product.bulkCreate(prodObj, {
      fields: ["store_id", "product_id", "title", "handle", "image"],
      updateOnDuplicate: ["product_id"],
    });

    res.status(200).send({
      msg: "Sucess while fetching Product data from api",
      status: 1,
      Newdata: { name: req.body.selectedProduct },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      msg: "Error while fetching product data",
      sucess: 1,
      data: error,
    });
  }
};
