import { Button, message, PageHeader, Table, Tag, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import {
  AttributeTypes,
  IAttributes,
  IAttributeValue,
  IProductType,
} from "../types/product";
import { getAttributes, getProductTypes } from "../api/products";

function ProductsConfig() {
  // Data State
  const [productTypes, setProductTypes] = useState<IProductType[]>([]);
  const [productsAttributes, setProductsAttributes] = useState<IAttributes[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  const productTypeColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "attributes",
      key: "type",
      width: "40%",
      render: (attributes: IAttributes[]) => {
        return attributes.map((att) => {
          return (
            <>
              <Tag color="blue">{att.name}</Tag>
            </>
          );
        });
      },
    },
  ];

  const attributesColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type: AttributeTypes) => {
        return <Tag color="blue">{type}</Tag>;
      },
    },
    {
      title: "Value",
      dataIndex: "attributeValue",
      key: "attributeValue",
      width: "40%",
      render: (value: IAttributeValue) => {
        const { date, boolean, name } = value;

        if (date) {
          return <Tag color="geekblue">{date}</Tag>;
        } else if (boolean) {
          return <Tag color="geekblue">{String(boolean)}</Tag>;
        } else {
          return name?.map((value, i) => {
            return (
              <Tag key={i} color="geekblue">
                {value}
              </Tag>
            );
          });
        }
      },
    },
  ];

  // Handlers
  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        setProductTypes(await getProductTypes());
        setProductsAttributes(await getAttributes());
        setLoading(false);
      } catch (err) {
        setLoading(false);
        message.error("Opps..!", 3);
      }
    };
    fetch();
  }, []);

  return (
    <>
      <div className="products__header">
        <PageHeader title="Configs" subTitle="Manage product configs" />
      </div>
      <div className="configs">
        <div className="configs__product-types">
          <PageHeader
            title="Product Types"
            subTitle="Manage product types"
            extra={[
              <Button key={0} type="primary" icon={<PlusOutlined />}>
                Add
              </Button>,
            ]}
          />
          <Table dataSource={productTypes} columns={productTypeColumns} />
        </div>
        <div className="configs__product-attributes">
          <PageHeader
            title="Product Type Attributes"
            subTitle="Manage product type attributes"
            extra={[
              <Button key={0} type="primary" icon={<PlusOutlined />}>
                Add
              </Button>,
            ]}
          />
          <Table dataSource={productsAttributes} columns={attributesColumns} />
        </div>
      </div>
    </>
  );
}

export default ProductsConfig;