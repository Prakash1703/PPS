import OptionSetModel from "../model/OptionSet.model.js";
import shopify from "../shopify.js";
export const UpsertOptionSet = async (req, res) => {
  try {
    // console.log(req.body.selectedProduct.length);
    // if (!req.body.selectedProduct) {
    //   throw new Error("Name property not found in request body");
    // }

    const shopName = res.locals.shopify.session.shop;
    console.log("Shop Name:", shopName);
    // const shopTbl = await Shop.findOne({ where: { shop_domain: shopName } });

    let optionSetObj = req.body;

    OptionSetModel.upsert(
      {
        name: optionSetObj.name,
        option_set: JSON.stringify(optionSetObj.option_set),
        status: optionSetObj.status,
        store_name: shopName,
      },
      {
        where: { name: optionSetObj.name }, // Condition on the name field
        returning: true, // Return the updated record after the upsert
      }
    )
      .then(([record, created]) => {
        if (created) {
          // New record was created
          res.status(200).send({
            msg: "optionset saved",
            status: 1,
            Newdata: record,
          });
        } else {
          // Existing record was updated
          res.status(200).send({
            msg: "optionset updated",
            status: 1,
            updatedData: record,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          msg: "Error upserting optionset",
          status: 0,
          error: err.message,
        });
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      msg: error,
      sucess: 1,
      data: error,
    });
  }
};
export const getOptionSet = async (req, res) => {
  const shopName = res.locals.shopify.session.shop;
  console.log("Shop:",shopName);
  try {
    const optionSets = await OptionSetModel.findAll({
      where: { store_name: shopName }
    });
    res.status(200).send({
      msg: "Sucess while fetching optionset data",
      optionSetList: optionSets,
    });
  } catch (error) {
    res.status(500).send({
      msg: "Error while fetching optionSet data",
      error: error,
    });
  }
};
