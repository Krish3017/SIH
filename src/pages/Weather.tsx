import { useState, useEffect } from "react";
import { Cloud, Sun, CloudRain, AlertTriangle, Thermometer, Droplets, Wind, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  icon: string;
  feelsLike?: number;
  pressure?: number;
}

interface ForecastDay {
  day: string;
  high: number;
  low: number;
  condition: string;
  icon: string;
  humidity: number;
  date: string;
  description: string;
}

const Weather = () => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData>({
    location: "Bhubaneswar, Odisha",
    temperature: 28,
    condition: "Partly Cloudy",
    humidity: 75,
    windSpeed: 12,
    visibility: 8,
    icon: "partly-cloudy"
  });

  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // OpenWeatherMap API configuration
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || "YOUR_API_KEY_HERE";
  const CITY = "Bhubaneswar,IN"; // Odisha, India

  const [alerts] = useState([
    {
      type: "warning",
      title: "Heavy Rain Alert",
      message: "Heavy rainfall expected on Saturday. Ensure proper drainage in your fields and avoid fertilizer application."
    },
    {
      type: "info",
      title: "Irrigation Reminder",
      message: "Soil moisture levels are optimal for the next 2 days. Reduce irrigation frequency to conserve water."
    }
  ]);

  // Convert OpenWeatherMap icon code to our icon system
  const getWeatherIcon = (iconCode: string) => {
    const iconMap: { [key: string]: string } = {
      "01d": "sunny", "01n": "sunny",
      "02d": "partly-cloudy", "02n": "partly-cloudy",
      "03d": "cloudy", "03n": "cloudy", "04d": "cloudy", "04n": "cloudy",
      "09d": "rainy", "09n": "rainy", "10d": "rainy", "10n": "rainy",
      "11d": "heavy-rain", "11n": "heavy-rain",
      "13d": "snowy", "13n": "snowy",
      "50d": "foggy", "50n": "foggy"
    };
    return iconMap[iconCode] || "sunny";
  };

  const getWeatherIconComponent = (condition: string) => {
    switch (condition) {
      case "sunny":
        return <Sun className="w-8 h-8 text-yellow-500" />;
      case "partly-cloudy":
        return <Cloud className="w-8 h-8 text-gray-500" />;
      case "cloudy":
        return <Cloud className="w-8 h-8 text-gray-600" />;
      case "rainy":
      case "heavy-rain":
        return <CloudRain className="w-8 h-8 text-blue-500" />;
      case "snowy":
        return <Cloud className="w-8 h-8 text-blue-300" />;
      case "foggy":
        return <Cloud className="w-8 h-8 text-gray-400" />;
      default:
        return <Sun className="w-8 h-8 text-yellow-500" />;
    }
  };

  // Fetch current weather data
  const fetchCurrentWeather = async () => {
    if (API_KEY === "YOUR_API_KEY_HERE") {
      setError("Please add your OpenWeatherMap API key to environment variables");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`);
      }

      const data = await response.json();

      setCurrentWeather({
        location: `${data.name}, ${data.sys.country}`,
        temperature: Math.round(data.main.temp),
        condition: data.weather[0].main,
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
        visibility: Math.round(data.visibility / 1000), // Convert m to km
        icon: getWeatherIcon(data.weather[0].icon),
        feelsLike: Math.round(data.main.feels_like),
        pressure: data.main.pressure
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  // Fetch 7-day forecast
  const fetchForecast = async () => {
    if (API_KEY === "YOUR_API_KEY_HERE") {
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error(`Forecast API error: ${response.status}`);
      }

      const data = await response.json();
      const dailyForecasts: { [key: string]: any } = {};

      // Group forecasts by date
      data.list.forEach((item: any) => {
        const date = item.dt_txt.split(' ')[0];
        if (!dailyForecasts[date]) {
          dailyForecasts[date] = {
            temps: [],
            humidity: [],
            conditions: [],
            icons: []
          };
        }
        dailyForecasts[date].temps.push(item.main.temp);
        dailyForecasts[date].humidity.push(item.main.humidity);
        dailyForecasts[date].conditions.push(item.weather[0].main);
        dailyForecasts[date].icons.push(item.weather[0].icon);
      });

      // Convert to our format
      const forecastData: ForecastDay[] = Object.entries(dailyForecasts).slice(0, 7).map(([date, data], index) => {
        const dayNames = ['Today', 'Tomorrow', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const avgTemp = data.temps.reduce((a: number, b: number) => a + b, 0) / data.temps.length;
        const maxTemp = Math.max(...data.temps);
        const minTemp = Math.min(...data.temps);
        const avgHumidity = Math.round(data.humidity.reduce((a: number, b: number) => a + b, 0) / data.humidity.length);
        const mostCommonCondition = data.conditions[Math.floor(data.conditions.length / 2)];
        const mostCommonIcon = data.icons[Math.floor(data.icons.length / 2)];

        return {
          day: dayNames[index] || new Date(date).toLocaleDateString('en-US', { weekday: 'long' }),
          high: Math.round(maxTemp),
          low: Math.round(minTemp),
          condition: mostCommonCondition,
          icon: getWeatherIcon(mostCommonIcon),
          humidity: avgHumidity,
          date,
          description: data.conditions[Math.floor(data.conditions.length / 2)]
        };
      });

      setForecast(forecastData);
    } catch (err) {
      console.error("Forecast fetch error:", err);
    }
  };

  // Fetch weather data on component mount
  useEffect(() => {
    fetchCurrentWeather();
    fetchForecast();
  }, []);

  // Refresh data every 10 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      fetchCurrentWeather();
      fetchForecast();
    }, 600000); // 10 minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Weather <span className="text-primary">Forecast</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Real-time weather data and forecasts for Odisha's agricultural regions
          </p>
          {error && (
            <Alert className="mt-4 border-destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>

        {/* Weather Alerts */}
        {alerts.length > 0 && (
          <div className="mb-8 space-y-4">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Weather Alerts</h2>
            {alerts.map((alert, index) => (
              <Alert key={index} className={`${alert.type === 'warning' ? 'border-destructive' : 'border-primary'}`}>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>{alert.title}:</strong> {alert.message}
                </AlertDescription>
              </Alert>
            ))}
          </div>
        )}

        {/* Current Weather */}
        <div className="mb-8">
          <Card className="shadow-strong">
            <CardHeader>
              <CardTitle className="text-2xl">Current Weather</CardTitle>
              <p className="text-muted-foreground">{currentWeather.location}</p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Temperature */}
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    {getWeatherIconComponent(currentWeather.icon)}
                  </div>
                  <div className="text-4xl font-bold text-foreground">{Math.round(currentWeather.temperature)}°C</div>
                  <div className="text-sm text-muted-foreground">{currentWeather.condition}</div>
                  {currentWeather.feelsLike && (
                    <div className="text-xs text-muted-foreground">Feels like {currentWeather.feelsLike}°C</div>
                  )}
                </div>

                {/* Humidity */}
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Droplets className="w-8 h-8 text-blue-500" />
                  </div>
                  <div className="text-2xl font-semibold text-foreground">{Math.round(currentWeather.humidity)}%</div>
                  <div className="text-sm text-muted-foreground">Humidity</div>
                </div>

                {/* Wind Speed */}
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Wind className="w-8 h-8 text-gray-500" />
                  </div>
                  <div className="text-2xl font-semibold text-foreground">{Math.round(currentWeather.windSpeed)} km/h</div>
                  <div className="text-sm text-muted-foreground">Wind Speed</div>
                </div>

                {/* Visibility */}
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Eye className="w-8 h-8 text-green-500" />
                  </div>
                  <div className="text-2xl font-semibold text-foreground">{currentWeather.visibility} km</div>
                  <div className="text-sm text-muted-foreground">Visibility</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 7-Day Forecast */}
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-6">7-Day Forecast</h2>
          {loading ? (
            <div className="text-center py-8">
              <div className="text-muted-foreground">Loading forecast...</div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
              {forecast.map((day, index) => (
                <Card key={index} className="text-center shadow-soft hover:shadow-strong transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="font-semibold text-foreground mb-2">{day.day}</div>
                    <div className="flex justify-center mb-3">
                      {getWeatherIconComponent(day.icon)}
                    </div>
                    <div className="text-sm font-medium text-foreground mb-1">
                      {day.high}° / {day.low}°
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">{day.condition}</div>
                    <div className="text-xs text-blue-600">
                      💧 {day.humidity}%
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Farming Recommendations */}
        <div className="mt-12">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-xl">Farming Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Today's Recommendations:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Good day for field preparation and planting</li>
                    <li>• Moderate humidity ideal for rice cultivation</li>
                    <li>• Apply organic fertilizer before expected rain</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Week Ahead:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Heavy rain on Saturday - ensure drainage</li>
                    <li>• Sunny periods good for harvesting</li>
                    <li>• Monitor for pest activity after rain</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Weather;