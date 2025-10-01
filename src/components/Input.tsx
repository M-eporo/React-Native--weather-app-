import { Button, ButtonText } from "@gluestack-ui/themed";
import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { getWeatherData } from "../features/weather/api";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setWeather } from "../store/slices/topWeatherSlice";
import { RootState } from "../store/store";
import { TopWeatherItem } from "../types/topWeather";
import { setHourlyWeather } from "../store/slices/hourlyWeatherSlice";

const Input = () => {
  const [location, setLocation] = useState("");

  const dispatch = useAppDispatch();
  const currentWeather = useAppSelector(
    (state: RootState) => state.currentData.currentWeather
  );

  const fetchWeather = async () => {
    const data = await getWeatherData(location);

    const topData: TopWeatherItem = {
      name: data.location.name,
      country: data.location.country,
      temp_c: data.current.temp_c,
      condition: data.current.condition.text,
      icon: data.current.condition.icon,
      maxtemp_c: data.forecast.forecastday[0].day.maxtemp_c,
      mintemp_c: data.forecast.forecastday[0].day.mintemp_c
    };
    
    const currentTime = new Date().getHours();
    const hourlyData = data.forecast.forecastday.flatMap((day, index) => {
      if(index === 0) {
        return day.hour.slice(currentTime, day.hour.length);
      } else if(index === 1) {
        return day.hour.slice(0, currentTime);
      } else {
        return;
      }
    }).filter((hour) => hour !== undefined);

    const hourlyDataFormatted = hourlyData.map((hour, index) => {
      return {
        time: index === 0 ? "Now" : hour.time.substring(12,14),
        temp_c: hour.temp_c,
        icon: hour.condition.icon,
      }
    })
      
    dispatch(setWeather(topData));
    dispatch(setHourlyWeather(hourlyDataFormatted));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Type Here Your Location"
        onChangeText={(newLocation) => setLocation(newLocation)}
        defaultValue={location}
      />
      <Button
        style={{ height: 50 }}
        size="md"
        variant="outline"
        action="primary"
        onPress={fetchWeather}
      >
        <ButtonText>Get Weather!!</ButtonText>
      </Button>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    height: 50,
    marginVertical: 12,
    paddingHorizontal: 8,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 8,
    fontSize: 18,
    textAlignVertical: "center",
  },
});
