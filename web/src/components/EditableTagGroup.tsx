import { Tag, Input, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState, memo } from "react";

interface EditableTagGroupProps {
  handleChange: (tags: string[]) => void;
}
const EditableTagGroup = ({ handleChange }: EditableTagGroupProps) => {
  const input = useRef<any>(null);
  const editInput = useRef<any>(null);

  const [state, setState] = useState<{
    tags: string[];
    inputVisible: boolean;
    inputValue: string;
    editInputIndex: number;
    editInputValue: string;
  }>({
    tags: [],
    inputVisible: false,
    inputValue: "",
    editInputIndex: -1,
    editInputValue: "",
  });

  const handleClose = (removedTag: string) => {
    const tags = state.tags.filter((tag) => tag !== removedTag);

    setState({ ...state, tags });
  };

  const showInput = () => {
    setState({ ...state, inputVisible: true });
  };

  const handleInputChange = (e: any) => {
    setState({ ...state, inputValue: e.target.value });
  };

  const handleInputConfirm = () => {
    const { inputValue } = state;
    let { tags } = state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    setState({
      ...state,
      tags,
      inputVisible: false,
      inputValue: "",
    });
  };

  const handleEditInputChange = (e: any) => {
    setState({ ...state, editInputValue: e.target.value });
  };

  const handleEditInputConfirm = () => {
    setState(({ tags, editInputIndex, editInputValue }) => {
      const newTags = [...tags];
      newTags[editInputIndex] = editInputValue;
      return {
        ...state,
        tags: newTags,
        editInputIndex: -1,
        editInputValue: "",
      };
    });
  };

  const saveInputRef = (inp: any) => {
    input.current = inp;
  };

  const saveEditInputRef = (input: any) => {
    editInput.current = input;
  };

  const { tags, inputVisible, inputValue, editInputIndex, editInputValue } =
    state;

  useEffect(() => {
    handleChange(tags);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);

  return (
    <>
      {tags.map((tag, index) => {
        if (editInputIndex === index) {
          return (
            <Input
              ref={saveEditInputRef}
              key={tag}
              size="small"
              className="tag-input"
              value={editInputValue}
              onChange={handleEditInputChange}
              onBlur={handleEditInputConfirm}
              onPressEnter={handleEditInputConfirm}
            />
          );
        }

        const isLongTag = tag.length > 20;

        const tagElem = (
          <Tag
            className="edit-tag"
            key={tag}
            closable={index !== 0}
            onClose={() => handleClose(tag)}
          >
            <span
              onDoubleClick={(e) => {
                if (index !== 0) {
                  editInput?.current?.focus();

                  e.preventDefault();
                }
              }}
            >
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </span>
          </Tag>
        );
        return isLongTag ? (
          <Tooltip title={tag} key={tag}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}
      {inputVisible && (
        <Input
          ref={saveInputRef}
          type="text"
          size="small"
          className="tag-input"
          value={inputValue}
          autoFocus
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag className="site-tag-plus" onClick={showInput}>
          <PlusOutlined /> New Tag
        </Tag>
      )}
    </>
  );
};

export default memo(EditableTagGroup);
