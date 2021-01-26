export const fetchWeekday = ({ authorizationKey, cityName }) => {
  const url = `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=${authorizationKey}&locationName=${cityName}`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log('取得「臺灣各鄉鎮市區未來1週天氣預報」data', data);
      //  STEP 1：定義 `locationData` 把回傳的資料中會用到的部分取出來
      const locationData = data.records.locations[0].location[0];
      // STEP 2-1：取出 預測日期
      const forecastDateArray = locationData.weatherElement[0].time
        .filter((e) => e.startTime.slice(0, 10) === e.endTime.slice(0, 10))
        .map((e) => e.startTime);
      //
      // STEP 2-2：取出 天氣現象'Wx', 降雨機率'PoP12h','MinT', 'MaxT'

      const weatherElements = locationData.weatherElement.reduce(
        (neededElements, item) => {
          if (['Wx', 'PoP12h', 'MinT', 'MaxT'].includes(item.elementName)) {
            const startEqualEnd = item.time.filter((e) =>
              forecastDateArray.includes(e.startTime)
            );
            const elementNameArray = startEqualEnd.map((e) =>
              item.elementName === 'Wx'
                ? e.elementValue[1].value
                : e.elementValue[0].value
            );

            neededElements[item.elementName] = elementNameArray;
          }
          return neededElements;
        },
        {}
      );

      return [0, 1, 2, 3, 4, 5, 6].map((i) => ({
        forecastDate: forecastDateArray[i],
        weatherCode: weatherElements.Wx[i],
        rainPossibility: weatherElements.PoP12h[i],
        maxTemperature: weatherElements.MinT[i],
        minTemperature: weatherElements.MaxT[i],
      }));
    });
};
