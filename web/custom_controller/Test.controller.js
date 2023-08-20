import Test from "../model/Test.model.js";
import shopify from "../shopify.js";
export const upsertTest = async (req, res) => {
  try {
    const [name, created] = await Test.upsert({
      name: "Prakash",
      age: 28,
    });
    res
      .status(200)
      .send({ msg: "Data Upserted", sucess: 1, data: shopTbl });
  } catch (error) {
    res.status(500).send({
      msg: "Error querying data from database",
      sucess: 0,
      error: error,
    });
  }
};

export const GetTestDetails = async (req, res) => {
    try {
      const shopName = res.locals.shopify.session.shop;
      const shopTbl = await Test.findOne({ where: { name: shopName } });
      res
        .status(200)
        .send({
          msg: "Sucess while fetching shop data",
          sucess: 1,
          data: shopTbl,
        });
    } catch (error) {
      res
        .status(500)
        .send({ msg: "Error while fetching shop data", sucess: 1, data: error });
    }
  };