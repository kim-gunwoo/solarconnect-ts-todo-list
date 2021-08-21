import React from "react";
import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { Itodo } from "components/todo/TodoService";
import styled, { css } from "styled-components";

const Remove = styled.div<{ done: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #119955;
  font-size: 16px;

  ${(props) =>
    props.done &&
    css`
      color: #ced4da;
      text-decoration: line-through;

      .anticon-delete {
        color: #119955;
      }
    `}
`;

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${Remove} {
      display: initial;
    }
  }
`;

const CheckCircle = styled.div<{ done: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 16px;
  border: 1px solid #33bb77;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${(props) =>
    props.done &&
    css`
      border: 1px solid #dddddd;
      color: #dddddd;
    `}
`;

const Text = styled.div<{ done: boolean }>`
  flex: 1;
  font-size: 16px;
  color: #119955;
  ${(props) =>
    props.done &&
    css`
      color: #ced4da;
      text-decoration: line-through;
    `}
`;

interface TodoItemProps {
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  todo: Itodo;
}

const TodoItem = ({ toggleTodo, removeTodo, todo }: TodoItemProps) => {
  const done = todo.done;
  const handleToggle = () => toggleTodo(todo.id);
  const handleRemove = () => {
    Modal.confirm({
      title: "삭제하시겠습니까?",
      content: "삭제할 경우 되돌릴 수 없습니다.",
      okType: "danger",
      onOk: () => removeTodo(todo.id),
    });
  };

  return (
    <TodoItemBlock>
      <CheckCircle done={done} onClick={handleToggle}>
        {done && <CheckOutlined />}
      </CheckCircle>
      <Text done={done}>{todo.text}</Text>
      <Remove done={done}>
        {todo.date} <DeleteOutlined onClick={handleRemove} />
      </Remove>
    </TodoItemBlock>
  );
};

export default React.memo(TodoItem);
