import { Button, message, PageHeader, Table, Tag, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { NextPage } from "next";
import Head from "next/head";
import { IProduct, IProductType } from "../types/product";

import { useEffect, useState } from "react";
import { getProducts } from "../api/products";

const Home: NextPage = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);

  const columns = [
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
      dataIndex: "productType",
      key: "type",
      render: (productType: IProductType) => {
        return (
          <>
            <Typography>{productType?.name}</Typography>
          </>
        );
      },
    },
  ];

  // Handlers
  useEffect(() => {
    const fetch = async () => {
      try {
        setProductsLoading(true);
        setProducts(await getProducts());
        setProductsLoading(false);
      } catch (err) {
        setProductsLoading(false);
        message.error("Opps..!", 3);
      }
    };
    fetch();
  }, []);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Releasin Assignment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="products__header">
        <PageHeader
          title="Products"
          subTitle="Manage your products"
          extra={[
            <Button key={0} type="primary" icon={<PlusOutlined />}>
              Add
            </Button>,
          ]}
        />
      </div>
      <main className="products">
        <Table
          loading={productsLoading}
          dataSource={products}
          columns={columns}
        />
      </main>
    </div>
  );
};

export default Home;
