import React, { useState } from 'react';
import styled from '@emotion/styled';

const Switch = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 52px;
  height: 28px;
  background-color: #ccc;
  ${'' /* background-color: ${({ theme }) => theme.backgroundColor}; */}
  border-radius: 50px;
  padding: 0px 3px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: 0.4s;
  div {
    ${'' /* position: absolute; */}
    ${'' /* right: ${({ theme }) => theme.switchButton}; */}
    ${'' /* bottom: 4px; */}
    height: 22px;
    width: 22px;
    border-radius: 50%;
    box-shadow:0 4px 3px rgb(0 0 0 / 25%);
    background-color: white;
    ${'' /* background-color: ${({ theme }) => theme.foregroundColor}; */}
    transition: 0.4s;
    margin:  ${({ theme }) => theme.switchButton};
  $
  }
`;
function ThemeSwitch(props) {
  const {} = props;
  const [isChecked, setIsChecked] = useState(false);
  return (
    <Switch>
      <div></div>
    </Switch>
  );
}
export default ThemeSwitch;
