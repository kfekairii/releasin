export interface IAttributeValue {
  id?: number;
  name?: string[];
  boolean?: boolean;
  date?: Date;
  assignedAttribute_id?: number;
}

export interface IAssignedAttributes {
  id?: number;
  product_id?: number;
  attributeValue: IAttributeValue;
}
export type AttributeTypes =
  | "Text"
  | "Boolean"
  | "Date"
  | "Select"
  | "Multiselect";

export enum AttributeTypesEnum {
  Text = "Text",
  Boolean = "Boolean",
  Date = "Date",
  Select = "Select",
  Multiselect = "Multiselect",
}

export interface IAttributes {
  id?: number;
  name?: string;
  type?: AttributeTypes;
  attributeValue?: IAttributeValue;
}
export interface IProductType {
  id?: number;
  name?: string;
  created_at?: Date;
  product_id?: number;
  attributes?: IAttributes[];
}

export interface IProduct {
  id?: number;
  name?: string;
  created_at?: Date;
  productType?: IProductType;
  productType_id?: number;
  assignedAttributes?: IAssignedAttributes[];
}
