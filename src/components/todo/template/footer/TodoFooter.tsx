import { Itodo } from "components/todo/TodoService";
import React from "react";
import styled from "styled-components";

const TodoFooterBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-top: 24px;
  padding-bottom: 24px;
`;

const LeftText = styled.div`
  color: #33bb77;
  font-size: 18px;
`;

const Wrapper = styled(LeftText)`
  display: flex;
  gap: 10px;
  color: #33bb77;
  font-size: 18px;
`;

const SelectButton = styled.button<{ select: boolean }>`
  border: none;
  background-color: inherit;
  color: ${(props) => (props.select ? "inherit" : "#eeeeee")};
  cursor: pointer;
`;

interface HooksTodoHeadProps {
  todos: Itodo[];
  selectType: SelectType;
  handleType: (e: any) => void;
}

type SelectType = {
  [name: string]: boolean;
  All: boolean;
  Active: boolean;
  Done: boolean;
};

const Todofooter = ({ todos, selectType, handleType }: HooksTodoHeadProps) => {
  const undoneTasks = todos.filter((todo) => !todo.done);
  const doneTasks = todos.filter((todo) => todo.done);

  return (
    <TodoFooterBlock>
      <LeftText className="tasks-left">
        {selectType.Done
          ? `${doneTasks.length} items done`
          : `${undoneTasks.length} items left`}
      </LeftText>
      <Wrapper className="tasks-left">
        {Object.keys(selectType).map((name) => (
          <SelectButton
            key={name}
            name={name}
            select={selectType[name]}
            onClick={handleType}
          >
            {name}
          </SelectButton>
        ))}
      </Wrapper>
    </TodoFooterBlock>
  );
};

export default React.memo(Todofooter);
