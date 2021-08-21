import React, { useState, useEffect } from "react";
import styled from "styled-components";

const TodoHeadBlock = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 52px;
  padding-bottom: 24px;
  border-bottom: 3px solid #33bb77;
`;

const DateText = styled.div`
  font-size: 26px;
  color: #119955;
  padding-left: 10px;
`;

const DayText = styled.div`
  font-size: 22px;
  color: #119955;
  padding-top: 5px;
`;

const INTERVAL_TIME = 1000 * 60;
const LOCALES = "en-US";

const TodoHead = () => {
  const [today, setToday] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setToday(new Date()), INTERVAL_TIME);
    return () => clearInterval(interval);
  }, []);

  const dayString = today.toLocaleDateString(LOCALES, {
    weekday: "long",
  });

  const dateString = today.toLocaleDateString(LOCALES, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <TodoHeadBlock>
      <DayText>{dayString}</DayText>
      <DateText>{dateString}</DateText>
    </TodoHeadBlock>
  );
};

export default React.memo(TodoHead);
