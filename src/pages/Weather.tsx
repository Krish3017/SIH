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
}

interface ForecastDay {
  day: string;
  high: number;
  low: number;
  condition: string;
  icon: string;
  humidity: number;
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

  const [forecast, setForecast] = useState<ForecastDay[]>([
    { day: "Today", high: 30, low: 24, condition: "Partly Cloudy", icon: "partly-cloudy", humidity: 75 },
    { day: "Tomorrow", high: 32, low: 26, condition: "Sunny", icon: "sunny", humidity: 68 },
    { day: "Wednesday", high: 29, low: 23, condition: "Rainy", icon: "rainy", humidity: 85 },
    { day: "Thursday", high: 31, low: 25, condition: "Cloudy", icon: "cloudy", humidity: 72 },
    { day: "Friday", high: 33, low: 27, condition: "Sunny", icon: "sunny", humidity: 65 },
    { day: "Saturday", high: 28, low: 22, condition: "Heavy Rain", icon: "heavy-rain", humidity: 90 },
    { day: "Sunday", high: 30, low: 24, condition: "Partly Cloudy", icon: "partly-cloudy", humidity: 78 }
  ]);

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

  const getWeatherIcon = (condition: string) => {
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
      default:
        return <Sun className="w-8 h-8 text-yellow-500" />;
    }
  };

  // Simulate weather updates every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWeather(prev => ({
        ...prev,
        temperature: prev.temperature + (Math.random() - 0.5) * 2,
        humidity: Math.max(60, Math.min(90, prev.humidity + (Math.random() - 0.5) * 5)),
        windSpeed: Math.max(5, Math.min(20, prev.windSpeed + (Math.random() - 0.5) * 3))
      }));
    }, 30000);

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
                    {getWeatherIcon(currentWeather.icon)}
                  </div>
                  <div className="text-4xl font-bold text-foreground">{Math.round(currentWeather.temperature)}°C</div>
                  <div className="text-sm text-muted-foreground">{currentWeather.condition}</div>
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
          <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
            {forecast.map((day, index) => (
              <Card key={index} className="text-center shadow-soft hover:shadow-strong transition-all duration-300">
                <CardContent className="p-4">
                  <div className="font-semibold text-foreground mb-2">{day.day}</div>
                  <div className="flex justify-center mb-3">
                    {getWeatherIcon(day.icon)}
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