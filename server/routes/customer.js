const express = require("express");
const router = express.Router();
const {
  getAllCustomers,
  getCustomer,
  postCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customerController");

router.get("/", getAllCustomers);

router.get("/:id", getCustomer);

router.post("/", postCustomer);

router.put("/:id", updateCustomer);

router.delete("/:id", deleteCustomer);

module.exports = router;
