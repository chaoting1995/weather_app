import React, { useState, useEffect, useMemo } from 'react';
import { getMoment, findLocation } from './utils/helpers';
import { fetchWeekday } from './utils/fetchWeekday';
import useWeatherAPI from './hooks/useWeatherAPI';

// import { ThemeProvider } from 'emotion-theming';書裡引入方法不能用了
import { ThemeProvider } from '@emotion/react';
import WeatherCard from './views/WeatherCard';
import WeatherForecast from './views/WeatherForecast';
import WeatherSetting from './views/WeatherSetting';
import styled from '@emotion/styled';

//定義主題配色
const theme = {
  light: {
    backgroundColor: '#C8DAE6;',
    foregroundColor: '#f9f9f9',
    boxShadow: '0px 0px 25px 1px rgba(50, 50, 50, 0.2);',
    hoverBoxShadow: '0px 8px 40px 1px rgba(50, 50, 50, 0.4);',
    titleColor: '#212121',
    temperatureColor: '#757575',
    textColor: '#828282',
    switchButton: '',
    buttonHoverBackgroundColor: '#cccccc',
  },

  dark: {
    backgroundColor: '#343d4b',
    foregroundColor: '#222831',
    // foregroundColor: '#121416',
    boxShadow: '0px 0px 25px 1px rgba(20, 20, 20, 0.6);',
    hoverBoxShadow: '0px 8px 40px 1px rgba(20, 20, 20, 1);',
    titleColor: '#f9f9fa',
    temperatureColor: '#dddddd',
    textColor: '#cccccc',
    switchButton: '0 0 0 17px',
    buttonHoverBackgroundColor: '#858585',
  },
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  ${'' /* position: relative; */}
`;

const BackCard = styled.div`
  box-sizing: border-box;
  position: relative;
  min-width: 360px;
  height: 360px;
  background-color: #858585;
  border-radius: 28px;
  position: relative;
  z-index: 0;
  box-shadow: ${({ theme }) => theme.boxShadow};
  transition: 0.2s;

  &:hover {
    box-shadow: ${({ theme }) => theme.hoverBoxShadow};
    transition: 0.2s;
  }
  overflow: hidden;
`;

const WeatherSettingWrap = styled.div`
  transform: ${({ settingPage }) =>
    settingPage !== 'WeatherSetting' ? 'translate(360px,0)' : 'translate(0,0)'};
  position: absolute;
  z-index: 2;
  transition: 0.7s;
`;

const WeatherCardsWrap = styled.div`
  transform: ${({ settingPage }) =>
    settingPage !== 'WeatherSetting'
      ? 'translate(0,0)'
      : 'translate(360px,360px)'};
  position: absolute;
  z-index: 1;
  transition: 0.7s;
`;

const AUTHORIZATION_KEY = 'CWB-6F49758A-41B0-438C-B457-08D2C69B013A';
// const LOCATION_NAME ='臺北';
// const LOCATION_NAME_FORECAST ='臺北市';

const App = () => {
  // const [currentTheme, setCurrentTheme] = useState('light');
  const [currentTheme, setCurrentTheme] = useState('light');
  const [currentPage, setCurrentPage] = useState('WeatherForecast');
  const [settingPage, setSettingPage] = useState('WeatherCards');
  const storageCity = localStorage.getItem('cityName') || '臺北市';
  const [currentCity, setCurrentCity] = useState(storageCity);
  const [forecastWeekday, setForecastWeekday] = useState([]);
  // const [ currentCity , setCurrentCity ] = useState(cityName);

  // 切換頁面(即時天氣或預測天氣)
  const handleCurrentPageChange = (currentPage) => {
    setCurrentPage(currentPage);
  };
  // 切換頁面(即時天氣或預測天氣)
  const handleSettingPageChange = (currentSetting) => {
    setSettingPage(currentSetting);
  };

  // 切換地區
  const handleCurrentCityChange = (currentCity) => {
    setCurrentCity(currentCity);
  };

  // 切換主題色
  const handleThemeSwitch = () => {
    currentTheme === 'dark'
      ? setCurrentTheme('light')
      : setCurrentTheme('dark');
  };

  const currentLocation = useMemo(() => findLocation(currentCity), [
    currentCity,
  ]);

  const { cityName, locationName, sunriseCityName } = currentLocation;

  //透過currentLocation，可取得cityName, locationName，故可移除常數
  const [weatherElement, fetchData] = useWeatherAPI({
    locationName,
    cityName,
    authorizationKey: AUTHORIZATION_KEY,
  });

  useEffect(() => {
    const funSetter = async () => {
      const forecastWeekday = await fetchWeekday({
        authorizationKey: AUTHORIZATION_KEY,
        cityName,
      });
      setForecastWeekday(forecastWeekday);
      console.log('取一週預測資料', forecastWeekday);
    };
    funSetter();
  }, []);

  //判斷日夜( getMoment，傳入城市，回傳day or night)
  // 錯誤示範：const moment = useMemo(()=>{ getMoment(LOCATION_NAME_FORECAST); },[]) //抓了半天的臭蟲
  const moment = useMemo(() => getMoment(sunriseCityName), [sunriseCityName]);

  //依日夜變更主題
  useEffect(() => {
    setCurrentTheme(moment === 'day' ? 'light' : 'dark');
  }, []);

  // const [ weatherElement, fetchData ] = useWeatherAPI()
  return (
    // <ThemeProvider theme={theme.dark}>//寫死的版本
    // <ThemeProvider theme={theme.currentTheme}>//不能寫成這樣會爛掉
    <ThemeProvider theme={theme[currentTheme]}>
      <Container>
        <BackCard>
          <WeatherCardsWrap settingPage={settingPage}>
            {currentPage === 'WeatherCard' && (
              <WeatherCard
                weatherElement={weatherElement}
                moment={moment}
                fetchData={fetchData}
                handleCurrentPageChange={handleCurrentPageChange}
                handleSettingPageChange={handleSettingPageChange}
                cityName={cityName}
                handleThemeSwitch={handleThemeSwitch}
              />
            )}
            {currentPage === 'WeatherForecast' && (
              <WeatherForecast
                weatherElement={weatherElement}
                moment={moment}
                fetchData={fetchData}
                handleCurrentPageChange={handleCurrentPageChange}
                handleSettingPageChange={handleSettingPageChange}
                cityName={cityName}
                handleThemeSwitch={handleThemeSwitch}
                forecastWeekday={forecastWeekday}
              />
            )}
          </WeatherCardsWrap>
          {/* {currentPage[0] === 'WeatherSetting' && ( */}
          <WeatherSettingWrap settingPage={settingPage}>
            <WeatherSetting
              cityName={cityName}
              handleCurrentCityChange={handleCurrentCityChange}
              handleCurrentPageChange={handleCurrentPageChange}
              handleSettingPageChange={handleSettingPageChange}
              handleThemeSwitch={handleThemeSwitch}
            />
          </WeatherSettingWrap>
          {/* )} */}
        </BackCard>
      </Container>
    </ThemeProvider>
  );
};

export default App;
