import { Form, Input, Select } from "antd";
import Modal from "antd/lib/modal/Modal";
import { FormikHelpers, useFormik } from "formik";
import React, { memo } from "react";
import { IProduct, IProductType } from "../types/product";

const { Option } = Select;

interface ModalProps {
  onOk: (values: IProduct, formikHelpers: FormikHelpers<IProduct>) => void;
  visible: boolean;
  onCancel: () => void;
  confirmLoading?: boolean;
  productTypes?: IProductType[];
}
const ProductsModal = ({
  visible,
  onOk,
  onCancel,
  confirmLoading,
  productTypes,
}: ModalProps) => {
  // page state

  const formik = useFormik<IProduct>({
    initialValues: {},

    onSubmit: (values, helpers) => {
      onOk(values, helpers);
    },
  });
  //   Handler
  const handleModalClose = () => {
    formik.resetForm();
    onCancel();
  };

  return (
    <Modal
      visible={visible}
      onOk={formik.submitForm}
      onCancel={handleModalClose}
      confirmLoading={confirmLoading}
      title="Add Product Type"
    >
      <Form layout="vertical">
        <Form.Item label="Name">
          <Input
            name="name"
            onChange={formik.handleChange}
            placeholder="Enter Attribute name"
          />
        </Form.Item>
        <Form.Item label="Product Type">
          <Select
            placeholder="Please select"
            style={{ width: "100%" }}
            onChange={(value) => formik.setFieldValue("productType_id", value)}
          >
            {productTypes?.map(({ id, name }) => {
              return (
                <Option key={id} value={id}>
                  {name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item label="Assigned Types">
          <Select
            mode="multiple"
            placeholder="Please select"
            style={{ width: "100%" }}
            onChange={(values) =>
              formik.setFieldValue("assignedAttributes", values)
            }
          >
            {productTypes
              ?.find((prt) => prt.id === formik.values?.productType_id)
              ?.attributes?.map(({ id, name }) => {
                return (
                  <Option key={id} value={id}>
                    {name}
                  </Option>
                );
              })}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default memo(ProductsModal);
