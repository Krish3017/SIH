import { MessageCircle, TrendingUp, Cloud, AlertTriangle, DollarSign, Droplets, Leaf, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Features = () => {
  const features = [
    {
      icon: MessageCircle,
      title: "AI Chatbot",
      description: "Get instant answers to your farming questions in Odia and English. Our AI assistant understands local farming practices and provides personalized advice.",
      link: "/chatbot",
      color: "bg-gradient-primary"
    },
    {
      icon: TrendingUp,
      title: "Crop Yield Prediction",
      description: "Use advanced AI models to predict your crop yields based on weather patterns, soil conditions, and historical data for better planning.",
      link: "/dashboard",
      color: "bg-success"
    },
    {
      icon: Cloud,
      title: "Weather Forecast",
      description: "Access accurate 7-day weather forecasts specifically tailored for Odisha's agricultural regions to plan your farming activities.",
      link: "/weather",
      color: "bg-gradient-earth"
    },
    {
      icon: AlertTriangle,
      title: "Weather Alerts",
      description: "Receive real-time notifications about severe weather conditions, storms, and other events that could impact your crops.",
      link: "/weather",
      color: "bg-destructive"
    },
    {
      icon: DollarSign,
      title: "Money Management",
      description: "Track your farming expenses, revenue, and profits with detailed analytics to optimize your agricultural business operations.",
      link: "/money",
      color: "bg-accent"
    },
    {
      icon: Droplets,
      title: "Irrigation Recommendation",
      description: "Get smart irrigation schedules based on soil moisture, weather conditions, and crop requirements to save water and improve yields.",
      link: "/recommendations",
      color: "bg-primary"
    },
    {
      icon: Leaf,
      title: "Fertilization Guidance",
      description: "Receive personalized fertilizer recommendations based on soil health, crop type, and growth stage for optimal nutrition.",
      link: "/recommendations",
      color: "bg-success"
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Visualize your farming data with comprehensive charts and insights to make informed decisions for your agricultural operations.",
      link: "/dashboard",
      color: "bg-gradient-primary"
    }
  ];

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Powerful <span className="text-primary">Features</span> for Smart Farming
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how AgriAI's comprehensive suite of tools can revolutionize your farming practices 
            and help you achieve better yields with data-driven insights.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="h-full shadow-soft hover:shadow-strong transition-all duration-300 border-0">
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 text-center">
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {feature.description}
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link to={feature.link}>Try Feature</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-field rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Experience Smart Farming?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start using AgriAI today and join thousands of farmers in Odisha who are already 
            benefiting from our AI-powered farming solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="hero" size="lg">
              <Link to="/dashboard">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;