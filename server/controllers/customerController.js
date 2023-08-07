const Customer = require("../models/CustomerModel");
const mongoose = require("mongoose");

const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: "desc" }).exec();

    if (customers.length <= 0) {
      let error = { message: "Customer not found!" };
      throw error;
    }

    res.status(200).json(customers);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    let error;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      error = { message: "Invalid ID." };
      throw error;
    }

    const customer = await Customer.findOne({ _id: id }).exec();

    if (!customer) {
      error = { message: "Customer not found" };
      throw error;
    }

    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json(error);
  }
};

const postCustomer = async (req, res) => {
  const body = req.body;

  try {
    const newCustomer = await Customer.create({
      ...body,
    });

    if (!newCustomer) {
      let error = { message: "Failed to create new customer" };
      throw error;
    }

    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(400).json(error);
  }
};

const updateCustomer = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const filter = { _id: id };

  try {
    const findCustomer = await Customer.findOne(filter).exec();

    let error;

    if (!findCustomer) {
      error = { message: "Customer does not exists." };
      throw error;
    }

    const updatedCustomer = await Customer.findOneAndUpdate(filter, ...body);

    if (!updatedCustomer) {
      error = { message: "Failed to update customer" };
      throw error;
    }

    res.status(200).json(updatedCustomer);
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteCustomer = async (req, res) => {
  const { id } = req.params;

  try {
    let error;

    if (!mongoose.Schema.Types.ObjectId.isValid(id)) {
      error = { message: "Invalid ID." };
      throw error;
    }

    const findCustomer = await Customer.findOne(filter).exec();

    if (!findCustomer) {
      error = { message: "Customer does not exists." };
      throw error;
    }

    const deletedCustomer = await Customer.findOneAndDelete({ _id: id });

    if (!deletedCustomer) {
      error = { message: "Failed to delete customer" };
      throw error;
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  getAllCustomers,
  getCustomer,
  postCustomer,
  updateCustomer,
  deleteCustomer,
};
