import React, { useState } from "react";
import styled from "styled-components";
import { PlusCircleOutlined } from "@ant-design/icons";
import { DatePicker, Modal } from "antd";
import { Itodo } from "components/todo/TodoService";
import moment from "moment";

const CircleButton = styled.button`
  background: #33bb77;
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  left: 50%;
  transform: translate(50%, 0%);
  color: white;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const InsertFormPositioner = styled.div`
  width: 100%;
  border-bottom: 1px solid #eeeeee;
  text-align: center;
`;

const InsertForm = styled.form`
  display: flex;
  background: #eeeeee;
  padding-left: 40px;
  padding-top: 36px;
  padding-right: 60px;
  padding-bottom: 36px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #dddddd;
  width: 100%;
  outline: none;
  font-size: 21px;
  box-sizing: border-box;
  color: #119955;
  &::placeholder {
    color: #dddddd;
    font-size: 16px;
  }
`;

const StyleDatePicker = styled(DatePicker)`
  width: 180px;
`;

interface TodoCreateProps {
  createTodo: (todo: Itodo) => void;
  incrementNextId: () => number;
}

const TodoCreate = ({ createTodo, incrementNextId }: TodoCreateProps) => {
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  const handleDate = (_: any, dateString: string) => setDate(dateString);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 새로고침 방지

    if (!value.trim() || !date) {
      Modal.info({ title: "마감기한 및 할 일을 입력해주세요." });
      return;
    }

    createTodo({
      id: incrementNextId(), // nextId 하나 증가
      text: value,
      done: false,
      date,
    });

    setValue(""); // input 초기화
    setDate("");
  };

  return (
    <>
      <InsertFormPositioner>
        <InsertForm onSubmit={handleSubmit}>
          <StyleDatePicker
            onChange={handleDate}
            value={date !== "" ? moment(date) : null}
          />
          <Input
            autoFocus
            placeholder="What's need to be done?"
            onChange={handleChange}
            value={value}
          />
          <CircleButton type="submit">
            <PlusCircleOutlined />
          </CircleButton>
        </InsertForm>
      </InsertFormPositioner>
    </>
  );
};

export default React.memo(TodoCreate);
