import React from 'react';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import WeatherIcon from './../Components/WeatherIcon';
import LocationMark from './../Components/LocationMark';
import Calendar from './../Components/Calendar';
import ThemeSwitch from './../Components/ThemeSwitch';

// import { ReactComponent as RainIcon } from './../images/rain.svg';

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

// 透過 props 取得傳進來的資料
// props 會是 {theme: "dark", children: "台北市"}
const Location = styled.div`
  font-size: 35px;
  ${'' /* ${props => console.log(props)} */}
  ${'' /* color: ${props => props.theme === 'dark' ? '#dadada' : '#212121'}; */}
  color: ${({ theme }) => theme.titleColor};
  margin-bottom: 40px;
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
  margin-top: 10px;
  svg {
    height: 60px;
    margin: 0px -30px;
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
const Rain = styled.div`
  margin-top: 10px;
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

const WeekdayWeather = ({ item, moment }) => (
  <ForecastWeather>
    <Weekday>
      {new Intl.DateTimeFormat('zh-TW', {
        weekday: 'short',
      }).format(dayjs(item.forecastDate))}
    </Weekday>
    <WeatherIconWrap>
      <WeatherIcon weatherCode={item.weatherCode} moment={moment} />
    </WeatherIconWrap>
    <Rain>
      {/* <RainIcon /> */}
      {item.rainPossibility !== ' ' ? item.rainPossibility : 0}%
    </Rain>
    <TemperatureWrap>
      <Temperature>
        {Math.round(item.maxTemperature)} <Celsius>°</Celsius>
      </Temperature>
      <div> - </div>
      <Temperature>
        {Math.round(item.minTemperature)} <Celsius>°</Celsius>
      </Temperature>
    </TemperatureWrap>
  </ForecastWeather>
);

const WeatherForecast = (props) => {
  const {
    moment,
    handleCurrentPageChange,
    handleSettingPageChange,
    handleThemeSwitch,
    cityName,
    forecastWeekday,
  } = props;

  //   forecastDate: forecastDateArray[i],
  //   weatherCode: weatherElements.Wx[i],
  //   rainPossibility: weatherElements.PoP12h[i],
  //   maxTemperature: weatherElements.MinT[i],
  //   minTemperature: weatherElements.MaxT[i],

  return (
    <WeatherForecastWrapper>
      <LocationMark
        handleSettingPageChange={() =>
          handleSettingPageChange('WeatherSetting')
        }
      />
      <Calendar
        handleCurrentPageChange={() => {
          handleCurrentPageChange('WeatherCard');
        }}
      />

      <ThemeSwitch handleThemeSwitch={handleThemeSwitch} />

      <Location>{cityName}</Location>
      <WeekdayWeatherWrap>
        {[...forecastWeekday].slice(0, 3).map((item, index) => (
          <WeekdayWeather item={item} moment={moment} key={index} />
        ))}
      </WeekdayWeatherWrap>
    </WeatherForecastWrapper>
  );
};

export default WeatherForecast;
