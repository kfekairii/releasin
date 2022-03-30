import { IProduct } from "../types/product";
import axios from "./axios";

export const getProducts = async () => {
  const { data } = await axios.get("/products");
  return data;
};

export const getProductTypes = async () => {
  const { data } = await axios.get("/product-types");
  return data;
};

export const getAttributes = async () => {
  const { data } = await axios.get("/product-types/attributes");
  return data;
};