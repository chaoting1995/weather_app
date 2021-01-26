import React from 'react';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import WeatherIcon from './../Components/WeatherIcon';
import LocationMark from './../Components/LocationMark';
import Calendar from './../Components/Calendar';
import ThemeSwitch from './../Components/ThemeSwitch';

import { ReactComponent as RainIcon } from './../images/rain.svg';
import { ReactComponent as RefreshIcon } from './../images/refresh.svg';
import { ReactComponent as LoadingIcon } from './../images/loading.svg';

const WeatherCardWrapper = styled.div`
  box-sizing: border-box;
  position: relative;
  min-width: 360px;
  height: 360px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  &:hover {
    box-shadow: ${({ theme }) => theme.hoverBoxShadow};
    transition: 0.2s;
  }
  transition: 0.2s;
  background-color: ${({ theme }) => theme.foregroundColor};
  box-sizing: border-box;
  padding: 30px 30px;
  border-radius: 25px;
`;

// 透過 props 取得傳進來的資料
// props 會是 {theme: "dark", children: "台北市"}
const Location = styled.div`
  font-size: 35px;
  ${'' /* ${props => console.log(props)} */}
  ${'' /* color: ${props => props.theme === 'dark' ? '#dadada' : '#212121'}; */}
  color: ${({ theme }) => theme.titleColor};
  margin-bottom: 20px;
`;

const Description = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 30px;
`;

const CurrentWeather = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  svg {
    animation: moving infinite 1.5s linear;
    animation-duration: 1.5s;
  }

  @keyframes moving {
    0% {
      transform: translateY(10px);
    }
    50% {
      transform: translateY(0px);
    }
    100% {
      transform: translateY(10px);
    }
  }
`;

const Temperature = styled.div`
  color: ${({ theme }) => theme.temperatureColor};
  ${'' /* color: #B8B8B8; */}
  font-family: 'Lato', sans-serif;
  font-size: 96px;
  font-weight: 300;
  display: flex;
`;

const Celsius = styled.div`
  font-family: 'Lato', sans-serif;
  font-weight: normal;
  font-size: 42px;
`;

const Rain = styled.div`
  display: flex;
  align-items: center;
  font-family: 'Lato', sans-serif;
  font-size: 16x;
  font-weight: 400;
  color: ${({ theme }) => theme.textColor};
  svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`;

const Refresh = styled.div`
  position: absolute;
  right: 30px;
  bottom: 20px;
  font-size: 12px;
  display: inline-flex;
  align-items: flex-end;
  color: ${({ theme }) => theme.textColor};
  svg {
    margin-left: 10px;
    width: 15px;
    height: 15px;
    cursor: pointer;
    animation: rotate infinite 1.5s linear;
    animation-duration: ${({ isLoading }) => (isLoading ? '1.5s' : '0s')};
  }
  @keyframes rotate {
    from {
      transform: rotate(360deg);
    }
    to {
      transform: rotate(0deg);
    }
  }
`;

const WeatherCard = (props) => {
  const {
    weatherElement,
    moment,
    fetchData,
    handleCurrentPageChange,
    handleSettingPageChange,
    handleThemeSwitch,
    cityName,
  } = props;

  const {
    observationTime,
    locationName,
    temperature,
    description,
    weatherCode,
    rainPossibility,
    comfortability,
    isLoading,
  } = weatherElement;

  return (
    <WeatherCardWrapper>
      <LocationMark
        handleSettingPageChange={() =>
          handleSettingPageChange('WeatherSetting')
        }
      />
      <Calendar
        handleCurrentPageChange={() => {
          handleCurrentPageChange('WeatherForecast');
        }}
      />

      <ThemeSwitch handleThemeSwitch={handleThemeSwitch} />
      <Location>{cityName}</Location>
      <Description>
        {description} {comfortability}
      </Description>
      <CurrentWeather>
        <Temperature>
          {Math.round(temperature)} <Celsius>°C</Celsius>
        </Temperature>
        <WeatherIcon weatherCode={weatherCode} moment={moment} />
      </CurrentWeather>
      {/* <AirFlow>
        <AirFlowIcon /> {windSpeed} m/h
      </AirFlow> */}
      <Rain>
        <RainIcon /> {rainPossibility}%
      </Rain>
      <Refresh onClick={fetchData} isLoading={isLoading}>
        最後觀測時間：
        {new Intl.DateTimeFormat('zh-TW', {
          hour: 'numeric',
          minute: 'numeric',
        }).format(dayjs(observationTime))}{' '}
        {isLoading ? <LoadingIcon /> : <RefreshIcon />}
      </Refresh>
    </WeatherCardWrapper>
  );
};

export default WeatherCard;
