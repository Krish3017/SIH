import { TrendingUp, Cloud, DollarSign, Droplets, AlertTriangle, Leaf, BarChart3, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  
  // Mock data for the dashboard
  const farmerData = {
    name: user?.fullName || "Farmer",
    location: "Cuttack, Odisha",
    totalFields: 3,
    totalArea: "5.2 hectares"
  };

  const currentWeather = {
    temperature: 28,
    condition: "Partly Cloudy",
    humidity: 75,
    rainChance: 40
  };

  const yieldPrediction = {
    season: "Kharif 2024",
    prediction: "+12%",
    confidence: 85,
    expectedYield: "4.2 tons/hectare"
  };

  const financialSummary = {
    totalIncome: 33000,
    totalExpenses: 15500,
    netProfit: 17500,
    profitMargin: 53
  };

  const fieldStatus = [
    { name: "Rice Field A", crop: "Rice", stage: "Flowering", health: 92, irrigation: "Optimal" },
    { name: "Vegetable Plot B", crop: "Tomatoes", stage: "Fruiting", health: 78, irrigation: "Needs Water" },
    { name: "Wheat Field C", crop: "Wheat", stage: "Grain Filling", health: 85, irrigation: "Good" }
  ];

  const alerts = [
    { type: "weather", message: "Heavy rain expected on Saturday", priority: "high" },
    { type: "irrigation", message: "Vegetable Plot B needs watering", priority: "medium" },
    { type: "finance", message: "Monthly profit target achieved", priority: "low" }
  ];

  const getHealthColor = (health: number) => {
    if (health >= 85) return "text-success";
    if (health >= 70) return "text-accent";
    return "text-destructive";
  };

  const getIrrigationStatus = (status: string) => {
    switch (status) {
      case "Optimal": return "secondary";
      case "Good": return "outline";
      case "Needs Water": return "destructive";
      default: return "outline";
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "weather": return <Cloud className="w-4 h-4" />;
      case "irrigation": return <Droplets className="w-4 h-4" />;
      case "finance": return <DollarSign className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Welcome back, <span className="text-primary">{farmerData.name}</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                {farmerData.location} • {farmerData.totalFields} fields • {farmerData.totalArea}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button asChild variant="hero">
                <Link to="/chatbot">Ask AgriAI</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-soft">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <TrendingUp className="w-5 h-5 text-success mr-2" />
                Yield Prediction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success mb-1">{yieldPrediction.prediction}</div>
              <p className="text-sm text-muted-foreground">{yieldPrediction.expectedYield}</p>
              <div className="mt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span>Confidence</span>
                  <span>{yieldPrediction.confidence}%</span>
                </div>
                <Progress value={yieldPrediction.confidence} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Cloud className="w-5 h-5 text-blue-500 mr-2" />
                Weather
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground mb-1">{currentWeather.temperature}°C</div>
              <p className="text-sm text-muted-foreground">{currentWeather.condition}</p>
              <div className="mt-2 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>Humidity</span>
                  <span>{currentWeather.humidity}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Rain Chance</span>
                  <span>{currentWeather.rainChance}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <DollarSign className="w-5 h-5 text-primary mr-2" />
                Net Profit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success mb-1">₹{financialSummary.netProfit.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground">This month</p>
              <div className="mt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span>Profit Margin</span>
                  <span>{financialSummary.profitMargin}%</span>
                </div>
                <Progress value={financialSummary.profitMargin} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <BarChart3 className="w-5 h-5 text-accent mr-2" />
                Field Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success mb-1">85%</div>
              <p className="text-sm text-muted-foreground">Average across all fields</p>
              <div className="mt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span>Overall Status</span>
                  <span>Excellent</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Field Status */}
          <Card className="shadow-strong">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Leaf className="w-5 h-5 text-success mr-2" />
                Field Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {fieldStatus.map((field, index) => (
                  <div key={index} className="p-4 border rounded-lg border-border">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-foreground">{field.name}</h4>
                        <p className="text-sm text-muted-foreground">{field.crop} • {field.stage}</p>
                      </div>
                      <Badge variant={getIrrigationStatus(field.irrigation)}>
                        {field.irrigation}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Health Score</span>
                      <span className={`text-lg font-bold ${getHealthColor(field.health)}`}>
                        {field.health}%
                      </span>
                    </div>
                    <Progress value={field.health} className="h-2 mt-2" />
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <Button asChild variant="outline" className="w-full">
                  <Link to="/recommendations">View Recommendations</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Alerts & Notifications */}
          <Card className="shadow-strong">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-accent mr-2" />
                Alerts & Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alerts.map((alert, index) => (
                  <div key={index} className={`p-3 rounded-lg border ${
                    alert.priority === 'high' ? 'border-destructive bg-destructive/5' :
                    alert.priority === 'medium' ? 'border-accent bg-accent/5' :
                    'border-success bg-success/5'
                  }`}>
                    <div className="flex items-start">
                      <div className={`mr-3 mt-0.5 ${
                        alert.priority === 'high' ? 'text-destructive' :
                        alert.priority === 'medium' ? 'text-accent' :
                        'text-success'
                      }`}>
                        {getAlertIcon(alert.type)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{alert.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {alert.priority} priority • Just now
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-border space-y-2">
                <Button asChild variant="outline" className="w-full">
                  <Link to="/weather">Check Weather Forecast</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 text-primary mr-2" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button asChild variant="outline" className="h-20 flex-col">
                <Link to="/chatbot">
                  <span className="text-lg mb-1">💬</span>
                  <span>Ask AI Assistant</span>
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="h-20 flex-col">
                <Link to="/weather">
                  <span className="text-lg mb-1">🌤️</span>
                  <span>Weather & Alerts</span>
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="h-20 flex-col">
                <Link to="/money">
                  <span className="text-lg mb-1">💰</span>
                  <span>Add Transaction</span>
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="h-20 flex-col">
                <Link to="/recommendations">
                  <span className="text-lg mb-1">🌱</span>
                  <span>Get Recommendations</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <div className="mt-8">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-success rounded-full mr-3"></div>
                    <span className="text-sm">Rice yield prediction updated</span>
                  </div>
                  <span className="text-xs text-muted-foreground">2 hours ago</span>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-sm">Weather alert: Heavy rain expected</span>
                  </div>
                  <span className="text-xs text-muted-foreground">4 hours ago</span>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                    <span className="text-sm">Added fertilizer expense: ₹5,500</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Yesterday</span>
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    <span className="text-sm">Irrigation recommendation updated</span>
                  </div>
                  <span className="text-xs text-muted-foreground">2 days ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;