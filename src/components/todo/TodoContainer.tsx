import { useState } from "react";
import { useTodo } from "./TodoService";
import TodoTemplate from "./template/TodoTemplate";
import TodoHead from "./template/head/TodoHead";
import TodoList from "./template/list/TodoList";
import TodoCreate from "./template/create/TodoCreate";
import TodoFooter from "./template/footer/TodoFooter";
import { Itodo } from "components/todo/TodoService";

const TYPE = { All: true, Active: false, Done: false };

const TodoContainer = () => {
  const { todoState, incrementNextId, toggleTodo, removeTodo, createTodo } =
    useTodo();
  const [selectType, setSelectType] = useState(TYPE);

  const handleType = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name } = event.target;
    const newSelect: any = { All: false, Active: false, Done: false };
    newSelect[name] = true;
    setSelectType(newSelect);
  };

  const filterTodo = (): Itodo[] => {
    if (selectType.All) return todoState;
    if (selectType.Active) return todoState.filter((el) => !el.done);
    if (selectType.Done) return todoState.filter((el) => el.done);
    return todoState;
  };

  return (
    <>
      <TodoTemplate>
        <TodoHead />
        <TodoCreate createTodo={createTodo} incrementNextId={incrementNextId} />
        <TodoList
          toggleTodo={toggleTodo}
          removeTodo={removeTodo}
          todos={filterTodo()}
        />
        <TodoFooter
          todos={todoState}
          selectType={selectType}
          handleType={handleType}
        />
      </TodoTemplate>
    </>
  );
};

export default TodoContainer;
