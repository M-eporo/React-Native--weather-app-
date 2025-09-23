import React, { useState } from 'react'
import { Button, TextInput, View } from 'react-native';
import { getWeatherData } from '../features/weather/api';
import SubmitButton from './SubmitButton';
import { ResponseWeatherType } from '../types/weather';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getWeather } from '../store/slices/weatherSlice';
import { RootState } from '../store/store';

const Input = () => {
    const [location, setLocation] = useState("");
    const [weatherData, setWeatherData] = useState<ResponseWeatherType>();

    const dispatch = useAppDispatch();
    const currentWeather = useAppSelector((state: RootState) => state.weather.currentWeather)

    const fetchWeather = async () => {
        const data = await getWeatherData(location);
        setWeatherData(data);
        dispatch(getWeather(data));
    };

    return (
        <View>
            <TextInput 
                placeholder="Type Here Your Location"
                onChangeText={newLocation => setLocation(newLocation)}
                defaultValue={location}
            />
            <Button 
                title="送信"
                onPress={fetchWeather}
            />
        </View>
    );
};

export default Input;