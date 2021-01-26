import React from 'react';
import styled from '@emotion/styled';

import { ReactComponent as LocationMarkIcon } from '../images/location-mark.svg';

const LocationMarkWrap = styled(LocationMarkIcon)`
  position: absolute;
  top: 39px;
  left: 150px;
  width: 20px;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    width: 23px;
    transition: 0.2s;
  }
`;

const LocationMark = ({ handleSettingPageChange }) => (
  <LocationMarkWrap onClick={handleSettingPageChange} />
);
export default LocationMark;
