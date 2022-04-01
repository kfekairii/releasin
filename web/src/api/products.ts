import { IAttributes, IProduct, IProductType } from "../types/product";
import axios from "./axios";

// Products
export const getProducts = async () => {
  const { data } = await axios.get("/products");
  return data;
};

export const createProduct = async (values: IProduct) => {
  await axios.post("/products", values);
};

// Product types
export const getProductTypes = async () => {
  const { data } = await axios.get("/product-types");
  return data;
};

export const createProductType = async (values: IProductType) => {
  await axios.post("/product-types", values);
};

// Attributes
export const getAttributes = async () => {
  const { data } = await axios.get("/product-types/attributes");
  return data;
};

export const createAttribute = async (values: IAttributes) => {
  await axios.post("/product-types/attributes", values);
};
