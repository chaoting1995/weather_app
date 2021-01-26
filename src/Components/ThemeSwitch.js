import React from 'react';
import styled from '@emotion/styled';

const Switch = styled.div`
position: absolute;
  top: 39px;
  right: 30px;
  box-sizing: border-box;
  width: 45px;
  height: 26px;
  background-color: #ccc;
  &:hover{
    background-color: #858585;
    transition: 0.3s;
  }
  ${'' /* background-color: ${({ theme }) => theme.backgroundColor}; */}
  border-radius: 50px;
  padding: 0px 3px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: 0.3s;
  div {
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
function ThemeSwitch({ handleThemeSwitch }) {
  return (
    <Switch onClick={handleThemeSwitch}>
      <div></div>
    </Switch>
  );
}
export default ThemeSwitch;
