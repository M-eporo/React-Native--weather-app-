import { Button, ButtonText } from "@gluestack-ui/themed";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { getWeatherData } from "../features/weather/api";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setWeather } from "../store/slices/topWeatherSlice";
import { RootState } from "../store/store";
import { TopWeatherItem } from "../types/topWeather";
import { setHourlyWeather } from "../store/slices/hourlyWeatherSlice";
import { setWeeklyWeather } from "../store/slices/weeklyWeatherSlice";

type Props = {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Input = ({ setShowModal }: Props) => {
  const [location, setLocation] = useState("");
  const [currentTime, setCurrentTime] = useState(0);

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
    
    setCurrentTime(Number(data.location.localtime.substring(11,13)));
    
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
        time: index === 0 ? "Now" : hour.time.substring(11,13),
        temp_c: hour.temp_c,
        icon: hour.condition.icon,
        will_it_rain: hour.will_it_rain,
        chance_of_rain: hour.chance_of_rain,
        will_it_snow: hour.will_it_snow,
        chance_of_snow: hour.chance_of_snow,
      }
    });

    const weeklyData = data.forecast.forecastday.map((day, index) => {
      return {
        date: day.date,
        dayofweek: new Date(day.date).toLocaleString("en-US", { weekday: "short"}),
        icon: day.day.condition.icon,
        mintemp_c: day.day.mintemp_c,
        maxtemp_c: day.day.maxtemp_c,
        avgtemp_c: day.day.avgtemp_c,
        maxwind_kph: day.day.maxwind_kph,
        totalprecip_mm: day.day.totalprecip_mm,
        totalsnow_cm: 0,
        avgvis_km: day.day.avgvis_km,
        avghumidity: day.day.avghumidity,
        daily_will_it_rain: day.day.daily_will_it_rain,
        daily_chance_of_rain: day.day.daily_chance_of_rain,
        daily_will_it_snow: day.day.daily_will_it_snow,
        daily_chance_of_snow: day.day.daily_chance_of_snow,
        sunrise: day.astro.sunrise,
        sunset: day.astro.sunset,
        moonrise: day.astro.moonrise,
        moonset: day.astro.moonset,
        moon_phase: day.astro.moon_phase,
      };
    });
      
    dispatch(setWeather(topData));
    dispatch(setHourlyWeather(hourlyDataFormatted));
    dispatch(setWeeklyWeather(weeklyData));
    setShowModal(true);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter City Name"
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
