import { Droplets, Leaf, Thermometer, Cloud, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const Recommendations = () => {
  const irrigationRecommendations = [
    {
      field: "Rice Field A",
      soilMoisture: 65,
      recommendation: "Reduce watering frequency",
      action: "Water every 3 days instead of daily",
      priority: "medium",
      waterSavings: "30%"
    },
    {
      field: "Vegetable Plot B",
      soilMoisture: 40,
      recommendation: "Increase irrigation",
      action: "Water twice daily until moisture reaches 60%",
      priority: "high",
      waterSavings: "0%"
    },
    {
      field: "Wheat Field C",
      soilMoisture: 55,
      recommendation: "Maintain current schedule",
      action: "Continue current watering pattern",
      priority: "low",
      waterSavings: "15%"
    }
  ];

  const fertilizationGuidance = [
    {
      crop: "Rice",
      stage: "Vegetative Growth",
      npkRatio: "20-10-10",
      application: "Apply 100kg/hectare",
      timing: "Apply now - optimal growth phase",
      soilHealth: 85,
      expectedYield: "+15%"
    },
    {
      crop: "Tomatoes",
      stage: "Flowering",
      npkRatio: "10-20-15",
      application: "Apply 75kg/hectare",
      timing: "Apply in 5 days",
      soilHealth: 78,
      expectedYield: "+22%"
    },
    {
      crop: "Wheat",
      stage: "Grain Filling",
      npkRatio: "15-15-20",
      application: "Apply 80kg/hectare",
      timing: "Wait 10 days",
      soilHealth: 92,
      expectedYield: "+18%"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "default";
    }
  };

  const getSoilHealthColor = (health: number) => {
    if (health >= 80) return "text-success";
    if (health >= 60) return "text-accent";
    return "text-destructive";
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Smart <span className="text-primary">Recommendations</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            AI-powered irrigation and fertilization guidance based on soil conditions, weather, and crop requirements
          </p>
        </div>

        {/* Current Conditions Overview */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center shadow-soft">
            <CardContent className="pt-6">
              <Thermometer className="w-8 h-8 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold">28°C</div>
              <div className="text-sm text-muted-foreground">Temperature</div>
            </CardContent>
          </Card>
          
          <Card className="text-center shadow-soft">
            <CardContent className="pt-6">
              <Droplets className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">75%</div>
              <div className="text-sm text-muted-foreground">Humidity</div>
            </CardContent>
          </Card>
          
          <Card className="text-center shadow-soft">
            <CardContent className="pt-6">
              <Cloud className="w-8 h-8 text-gray-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">40%</div>
              <div className="text-sm text-muted-foreground">Rain Chance</div>
            </CardContent>
          </Card>
          
          <Card className="text-center shadow-soft">
            <CardContent className="pt-6">
              <Leaf className="w-8 h-8 text-success mx-auto mb-2" />
              <div className="text-2xl font-bold">Good</div>
              <div className="text-sm text-muted-foreground">Soil Health</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Irrigation Recommendations */}
          <div>
            <Card className="shadow-strong">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Droplets className="w-6 h-6 text-blue-500 mr-3" />
                  Irrigation Recommendations
                </CardTitle>
                <p className="text-muted-foreground">
                  Optimize water usage based on soil moisture and weather conditions
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {irrigationRecommendations.map((rec, index) => (
                  <div key={index} className="p-4 border rounded-lg border-border">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-semibold text-foreground">{rec.field}</h4>
                      <Badge variant={getPriorityColor(rec.priority)}>
                        {rec.priority} priority
                      </Badge>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Soil Moisture</span>
                        <span>{rec.soilMoisture}%</span>
                      </div>
                      <Progress value={rec.soilMoisture} className="h-2" />
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Recommendation: </span>
                        <span className="text-muted-foreground">{rec.recommendation}</span>
                      </div>
                      <div>
                        <span className="font-medium">Action: </span>
                        <span className="text-muted-foreground">{rec.action}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium">Water Savings: </span>
                        <span className="text-success ml-1">{rec.waterSavings}</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="bg-muted p-4 rounded-lg">
                  <h5 className="font-semibold text-foreground mb-2">💡 Smart Tips</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Water early morning (6-8 AM) to reduce evaporation</li>
                    <li>• Check soil moisture 6 inches deep before watering</li>
                    <li>• Use drip irrigation to save 40% more water</li>
                    <li>• Rain expected tomorrow - reduce watering today</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Fertilization Guidance */}
          <div>
            <Card className="shadow-strong">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Leaf className="w-6 h-6 text-success mr-3" />
                  Fertilization Guidance
                </CardTitle>
                <p className="text-muted-foreground">
                  Personalized nutrient recommendations for optimal crop growth
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {fertilizationGuidance.map((guide, index) => (
                  <div key={index} className="p-4 border rounded-lg border-border">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-foreground">{guide.crop}</h4>
                        <p className="text-sm text-muted-foreground">{guide.stage}</p>
                      </div>
                      <Badge variant="outline" className="text-success border-success">
                        {guide.expectedYield} yield
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <span className="text-sm font-medium">NPK Ratio</span>
                        <div className="text-lg font-semibold text-primary">{guide.npkRatio}</div>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Soil Health</span>
                        <div className={`text-lg font-semibold ${getSoilHealthColor(guide.soilHealth)}`}>
                          {guide.soilHealth}%
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Application: </span>
                        <span className="text-muted-foreground">{guide.application}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium">Timing: </span>
                        <span className="text-muted-foreground ml-1">{guide.timing}</span>
                        {guide.timing.includes("now") && (
                          <CheckCircle className="w-4 h-4 text-success ml-2" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="bg-muted p-4 rounded-lg">
                  <h5 className="font-semibold text-foreground mb-2">🌱 Fertilizer Tips</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Apply fertilizer during cool, cloudy weather</li>
                    <li>• Water lightly after application to activate nutrients</li>
                    <li>• Split nitrogen application for better absorption</li>
                    <li>• Test soil pH before applying - optimal range 6.0-7.0</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Insights */}
        <div className="mt-8">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Weekly Insights & Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3 flex items-center">
                    <Droplets className="w-5 h-5 text-blue-500 mr-2" />
                    Water Management
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Overall water usage down 25% this week</li>
                    <li>• Soil moisture levels optimal across 80% of fields</li>
                    <li>• Expected rainfall will reduce irrigation needs</li>
                    <li>• Consider installing moisture sensors in dry zones</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-3 flex items-center">
                    <Leaf className="w-5 h-5 text-success mr-2" />
                    Nutrient Status
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Nitrogen levels adequate in all test areas</li>
                    <li>• Phosphorus slightly low in vegetable plots</li>
                    <li>• Potassium levels excellent for grain crops</li>
                    <li>• Consider organic compost for long-term health</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-3 flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-2" />
                    Action Items
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Schedule soil testing for next month</li>
                    <li>• Prepare drainage channels before monsoon</li>
                    <li>• Stock up on organic fertilizers</li>
                    <li>• Plan crop rotation for next season</li>
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

export default Recommendations;