import { Form, Input, Select, DatePicker } from "antd";
import Modal from "antd/lib/modal/Modal";
import { FormikHelpers, useFormik } from "formik";
import React, { memo } from "react";
import EditableTagGroup from "../components/EditableTagGroup";
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
const AttributesModal = ({
  visible,
  onOk,
  onCancel,
  confirmLoading,
}: ModalProps) => {
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

  const getComponentByAttributeType = (type?: AttributeTypes) => {
    switch (type) {
      case "Text":
        return (
          <Input
            name="attributeValue"
            onChange={formik.handleChange}
            placeholder="Enter Attribute name"
          />
        );
      case "Boolean":
        return (
          <Select
            onChange={(value) => formik.setFieldValue("attributeValue", value)}
          >
            <Option value={true}>True</Option>
            <Option value={false}>False</Option>
          </Select>
        );
      case "Date":
        return (
          <DatePicker
            name="attributeValue"
            onChange={(value) =>
              formik.setFieldValue("attributeValue", value?.toISOString())
            }
          />
        );
      case "Select":
      case "Multiselect":
        return (
          <EditableTagGroup
            handleChange={(tags: string[]) => {
              formik.setFieldValue("attributeValue", tags);
            }}
          />
        );
      default:
        return null;
    }
  };

  const attributeValueComponent = getComponentByAttributeType(
    formik.values.type
  );

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
          <Select
            onChange={(value) => {
              formik.setFieldValue("type", value);
              formik.setFieldValue("attributeValue", undefined);
            }}
          >
            {Object.keys(AttributeTypesEnum)?.map((op, i) => (
              <Option key={i} value={op}>
                {op}
              </Option>
            ))}
          </Select>
        </Form.Item>
        {attributeValueComponent && (
          <Form.Item label="Value">{attributeValueComponent}</Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default memo(AttributesModal);
