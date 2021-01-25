import React from 'react';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import WeatherIcon from './../Components/WeatherIcon';
import ThemeSwitch from './../Components/ThemeSwitch';

//樣板 import { ReactComponent as DayCloudyIcon } from './images/day-cloudy.svg';
import { ReactComponent as AirFlowIcon } from './../images/airFlow.svg';
import { ReactComponent as RainIcon } from './../images/rain.svg';
import { ReactComponent as LoadingIcon } from './../images/loading.svg';
import { ReactComponent as CogIcon } from './../images/cog.svg';

const WeatherForecastWrapper = styled.div`
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
const ThemeSwitchIcon = styled.div`
  position: absolute;
  top: 40px;
  right: 30px;
`;
const Cog = styled(CogIcon)`
  position: absolute;
  top: 42px;
  left: 150px;
  width: 15px;
  height: 15px;
  cursor: pointer;
`;

const Cog1 = styled.div`
  position: absolute;
  top: 42px;
  left: 190px;
  width: 15px;
  height: 15px;
  cursor: pointer;
  background-color: green;
  border-radius: 10px;
`;

// 透過 props 取得傳進來的資料
// props 會是 {theme: "dark", children: "台北市"}
const Location = styled.div`
  font-size: 35px;
  ${'' /* ${props => console.log(props)} */}
  ${'' /* color: ${props => props.theme === 'dark' ? '#dadada' : '#212121'}; */}
  color: ${({ theme }) => theme.titleColor};
  margin-bottom: 50px;
`;

const ForecastWeather = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;

  & > div {
    margin-bottom: 18px;
  }
`;
const Weekday = styled.div`
  font-size: 18px;
  color: ${({ theme }) => theme.textColor};
`;

const WeatherIconWrap = styled.div`
  svg {
    max-height: 60px;
    margin: 0px -30px;
  }
`;
const Rain = styled.div`
  display: flex;
  align-items: center;
  font-family: 'Lato', sans-serif;
  font-size: 20px;
  font-weight: 400;
  color: ${({ theme }) => theme.textColor};
  svg {
    width: 25px;
    height: auto;
    ${'' /* margin-right: 10px; */}
  }
`;
const TemperatureWrap = styled.div`
  display: flex;
  color: ${({ theme }) => theme.temperatureColor};
  font-family: 'Lato', sans-serif;
  font-size: 18px;
  font-weight: 400;
`;
const Temperature = styled.div`
  display: flex;
`;

const Celsius = styled.div`
  font-family: 'Lato', sans-serif;
  font-weight: normal;
  font-size: 20px;
`;

const WeekdayWeatherWrap = styled.div`
  display: flex;
`;

const WeatherForecast = (props) => {
  const {
    weatherElement,
    moment,
    fetchData,
    handleCurrentPageChange,
    handleThemeSwitch,
    cityName,
  } = props;

  const {
    observationTime,
    locationName,
    temperature,
    windSpeed,
    description,
    weatherCode,
    rainPossibility,
    comfortability,
    isLoading,
  } = weatherElement;

  const WeekdayWeather = () => (
    <ForecastWeather>
      <Weekday>
        {new Intl.DateTimeFormat('zh-TW', {
          weekday: 'short',
        }).format(dayjs(observationTime))}
      </Weekday>
      <WeatherIconWrap>
        <WeatherIcon weatherCode={weatherCode} moment={moment} />
      </WeatherIconWrap>
      <Rain>
        {/* <RainIcon /> */}
        {rainPossibility}%
      </Rain>
      <TemperatureWrap>
        <Temperature>
          {Math.round(temperature)} <Celsius>°</Celsius>
        </Temperature>
        <div> - </div>
        <Temperature>
          {Math.round(temperature)} <Celsius>°</Celsius>
        </Temperature>
      </TemperatureWrap>
    </ForecastWeather>
  );

  return (
    <WeatherForecastWrapper>
      <Cog onClick={() => handleCurrentPageChange('WeatherSetting')} />
      <Cog1
        onClick={() => {
          handleCurrentPageChange('WeatherCard');
        }}
      />
      <ThemeSwitchIcon onClick={handleThemeSwitch}>
        <ThemeSwitch />
      </ThemeSwitchIcon>
      <Location>{cityName}</Location>
      <WeekdayWeatherWrap>
        <WeekdayWeather />
        <WeekdayWeather />
        <WeekdayWeather />
      </WeekdayWeatherWrap>
    </WeatherForecastWrapper>
  );
};

export default WeatherForecast;
