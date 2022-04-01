import { Form, Input, Select } from "antd";
import Modal from "antd/lib/modal/Modal";
import { FormikHelpers, useFormik } from "formik";
import React, { memo } from "react";
import { IAttributes, IProductType } from "../types/product";

const { Option } = Select;

interface ModalProps {
  onOk: (
    values: IProductType,
    formikHelpers: FormikHelpers<IProductType>
  ) => void;
  visible: boolean;
  onCancel: () => void;
  confirmLoading?: boolean;
  productsAttributes?: IAttributes[];
}
const ProductTypesModal = ({
  visible,
  onOk,
  onCancel,
  confirmLoading,
  productsAttributes,
}: ModalProps) => {
  // page state

  const formik = useFormik<IProductType>({
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
        <Form.Item label="Attributes">
          <Select
            mode="multiple"
            placeholder="Please select"
            style={{ width: "100%" }}
            onChange={(value) => {
              formik.setFieldValue("attributes", value);
            }}
          >
            {productsAttributes?.map(({ id, name }) => {
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

export default memo(ProductTypesModal);
