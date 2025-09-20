import "dotenv/config";

export default ({config}) => ({
    ...config,
    extra: {
        weatherApiKey: process.env.WEATHER_API_KEY
    }
});