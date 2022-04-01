import { Button, message, PageHeader, Table, Tag, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { NextPage } from "next";
import Head from "next/head";
import { IProduct, IProductType } from "../types/product";

import { useEffect, useState } from "react";
import { createProduct, getProducts, getProductTypes } from "../api/products";
import ProductsModal from "../containers/ProductsModal";
import { FormikHelpers } from "formik";

const Home: NextPage = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [productTypes, setProductTypes] = useState<IProductType[]>([]);

  const [productsLoading, setProductsLoading] = useState(false);
  const [openProductsModal, setOpenProductsModal] = useState(false);
  const [confirmAddProductLoading, setConfirmAddProductLoading] =
    useState(false);

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

  useEffect(() => {
    const fetch = async () => {
      try {
        setProductsLoading(true);
        setProducts(await getProducts());
        setProductTypes(await getProductTypes());
        setProductsLoading(false);
      } catch (err) {
        setProductsLoading(false);
        message.error("Opps..!", 3);
      }
    };
    fetch();
  }, []);

  // Handlers
  const handleAddProduct = async (
    values: IProduct,
    formikHelpers: FormikHelpers<IProduct>
  ) => {
    try {
      setConfirmAddProductLoading(true);
      await createProduct(values);
      setProducts(await getProducts());
      setOpenProductsModal(false);
      setConfirmAddProductLoading(false);
      message.success("Product Type created succesfully");
    } catch (err: any) {
      setConfirmAddProductLoading(false);
      message.error("Oops..!", 3);
    }
  };
  return (
    <div>
      <Head>
        <title>Releasin Assignment</title>
        <meta name="description" content="Releasin Assignment" />
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="products__header">
        <PageHeader
          title="Products"
          subTitle="Manage your products"
          extra={[
            <Button
              key={0}
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setOpenProductsModal(true)}
            >
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

      {openProductsModal && (
        <ProductsModal
          visible={openProductsModal}
          onOk={handleAddProduct}
          onCancel={() => setOpenProductsModal(false)}
          confirmLoading={confirmAddProductLoading}
          productTypes={productTypes}
        />
      )}
    </div>
  );
};

export default Home;
