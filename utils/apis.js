import * as http from './http';

const globalData = getApp().globalData;
const key = globalData.key

const getWeatherNow = async (location) => {
  const res = await http.get(`${globalData.requestUrl.weatherNow}?location=${location}&key=${key}`);
  if (res.code === '200') {
    const data = res.data || {};
    return data;
  } else {
    return new Error('服务异常');
  }
};

const getWeather7d = async (location) => {
  const res = await http.get(`${globalData.requestUrl.weather7d}?location=${location}&key=${key}`);
  if (res.code === '200') {
    const data = res.data || {};
    return data;
  } else {
    return new Error('服务异常');
  }
};

const getWeather24h = async (location) => {
  const res = await http.get(`${globalData.requestUrl.weather24h}?location=${location}&key=${key}`);
  if (res.code === '200') {
    const data = res.data || {};
    return data;
  } else {
    return new Error('服务异常');
  }
};

const getIndices1d = async (location) => {
  const res = await http.get(`${globalData.requestUrl.indices1d}?location=${location}&key=${key}`);
  if (res.code === '200') {
    const data = res.data || {};
    return data;
  } else {
    return new Error('服务异常');
  }
};

const lookUpCity = async (location) => {
  const res = await http.get(`${globalData.requestUrl.cityLookUp}?location=${location}&key=${key}`);
  if (res.code === '200') {
    const data = res || {};
    return data;
  } else {
    return new Error('服务异常');
  }
};

const getAllWeatherData = async (location, success, fail) => {
  return Promise.all([
    http.get(`${globalData.requestUrl.weatherNow}?location=${location}&key=${key}`),
    http.get(`${globalData.requestUrl.weather7d}?location=${location}&key=${key}`),
    http.get(`${globalData.requestUrl.weather24h}?location=${location}&key=${key}`),
    http.get(`${globalData.requestUrl.indices1d}?type=0&location=${location}&key=${key}`),
  ]).then(arr => {
    success && success(arr);
  }, error => {
    fail && fail();
  });
};

module.exports = {
  getWeatherNow,
  getWeather7d,
  getWeather24h,
  getIndices1d,
  lookUpCity,
  getAllWeatherData,
}