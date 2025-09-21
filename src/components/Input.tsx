import React, { useState } from 'react'
import { Button, TextInput, View } from 'react-native';
import { fetchCurrentWeather } from '../features/weather/api';
import SubmitButton from './SubmitButton';

const Input = () => {
    const [location, setLocation] = useState("");
    return (
        <View>
            <TextInput 
                placeholder="Type Here Your Location"
                onChangeText={newLocation => setLocation(newLocation)}
                defaultValue={location}
            />
            <Button 
                title="送信"
                onPress={() => fetchCurrentWeather(location)}
            />
        </View>
    );
};

export default Input;