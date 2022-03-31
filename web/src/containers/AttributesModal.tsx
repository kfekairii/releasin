import { Form, Input, Select } from "antd";
import Modal from "antd/lib/modal/Modal";
import { FormikHelpers, useFormik } from "formik";
import React from "react";
import {
  IAttributes,
  AttributeTypes,
  AttributeTypesEnum,
} from "../types/product";

const { Option } = Select;

interface ModalProps {
  onOk: (
    values: IAttributes,
    formikHelpers: FormikHelpers<IAttributes>
  ) => void;
  visible: boolean;
  onCancel: () => void;
  confirmLoading?: boolean;
}
function AttributesModal({
  visible,
  onOk,
  onCancel,
  confirmLoading,
}: ModalProps) {
  // page state

  const formik = useFormik<IAttributes>({
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
      title="Add Product Type Attribute"
    >
      <Form layout="vertical">
        <Form.Item label="Name">
          <Input
            name="name"
            onChange={formik.handleChange}
            placeholder="Enter Attribute name"
          />
        </Form.Item>
        <Form.Item label="Type">
          <Select onChange={(value) => formik.setFieldValue("type", value)}>
            {Object.keys(AttributeTypesEnum)?.map((op, i) => (
              <Option key={i} value={op}>
                {op}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
      <Form.Item label="Value">
        <Input
          name="attributeValue"
          onChange={formik.handleChange}
          placeholder="Enter Attribute name"
        />
      </Form.Item>
    </Modal>
  );
}

export default AttributesModal;
