import {createAsyncThunk} from '@reduxjs/toolkit';

import {weatherMessage} from '../../helpers/weatherMessage';
import {newMessage} from '../../helpers/newMessage';

export const getWeather = createAsyncThunk(
  'message/getWeather',
  async params => {
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${params.latitude}&longitude=${params.longitude}&current_weather=true`;
      const response = await fetch(url, {method: 'get'});
      const weather = await response.json();
      const currentWeather = weather.current_weather;
      const temperature = currentWeather.temperature;
      const windspeed = currentWeather.windspeed;
      const city = params.city;

      return {
        newMessage: newMessage(weatherMessage(city, temperature, windspeed)),
        id: params.id,
      };
    } catch {
      return {
        newMessage: newMessage('Не удалось загрузить данные'),
        id: params.id,
      };
    } finally {
      params.clearClipboard();
    }
  },
);
