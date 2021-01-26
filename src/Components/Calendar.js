import React from 'react';
import styled from '@emotion/styled';

import { ReactComponent as CalendarIcon } from './../images/calendar.svg';

const CalendarWrap = styled(CalendarIcon)`
  position: absolute;
  top: 40px;
  right: 95px;
  width: 22px;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    width: 25px;
    transition: 0.2s;
  }
`;

const Calendar = ({ handleCurrentPageChange }) => (
  <CalendarWrap onClick={handleCurrentPageChange} />
);

export default Calendar;
