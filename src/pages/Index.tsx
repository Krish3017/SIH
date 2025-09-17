import { ArrowRight, Leaf, TrendingUp, Users, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-farming.jpg";
import smartFarmingImage from "@/assets/smart-farming.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(https://unsplash.com/photos/ajZibDGpPew/download?force=true&w=1920)' }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            AI-Powered Crop Yield
            <span className="block text-accent"> Prediction & Optimization</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Helping Farmers in Odisha with Smart Agriculture Solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="hero" size="lg">
              <Link to="/dashboard">
                Try Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white text-black hover:bg-yellow-400 border border-yellow-400 transition-colors duration-300">
              <Link to="/features">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Empowering Odisha's <span className="text-primary">Farmers</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                AgriAI combines cutting-edge artificial intelligence with traditional farming wisdom 
                to help farmers in Odisha maximize their crop yields, reduce costs, and make 
                informed decisions based on real-time data and weather patterns.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-card rounded-lg shadow-soft">
                  <div className="text-3xl font-bold text-primary">10K+</div>
                  <div className="text-sm text-muted-foreground">Farmers Helped</div>
                </div>
                <div className="text-center p-4 bg-card rounded-lg shadow-soft">
                  <div className="text-3xl font-bold text-success">25%</div>
                  <div className="text-sm text-muted-foreground">Yield Increase</div>
                </div>
              </div>
              <Button asChild variant="default">
                <Link to="/features">Explore Features</Link>
              </Button>
            </div>
            <div className="relative">
              <img
                src={smartFarmingImage}
                alt="Smart Farming Technology"
                className="rounded-2xl shadow-strong"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why This Matters Section (updated UI to single-box card style) */}
      <section className="py-20 bg-gradient-field">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Why <span className="text-primary">AgriAI</span> Matters
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Transform your farming practices with data-driven insights and intelligent recommendations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="relative rounded-2xl border border-border bg-card p-8 shadow-soft">
              <div className="absolute -top-6 left-6 w-12 h-12 rounded-full bg-gradient-primary shadow-md" />
              <div className="mt-4">
                <h3 className="text-2xl font-semibold text-foreground mb-3">Increase Productivity</h3>
                <p className="text-muted-foreground mb-4">
                  Use AI-powered insights to optimize planting schedules, irrigation, and harvesting times
                </p>
                <button className="underline text-foreground/90">Learn more</button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative rounded-2xl border border-border bg-card p-8 shadow-soft">
              <div className="absolute -top-6 left-6 w-12 h-12 rounded-full bg-gradient-earth shadow-md" />
              <div className="mt-4">
                <h3 className="text-2xl font-semibold text-foreground mb-3">Reduce Risks</h3>
                <p className="text-muted-foreground mb-4">
                  Get early weather alerts and crop disease predictions to protect your investments
                </p>
                <button className="underline text-foreground/90">Learn more</button>
              </div>
            </div>

            {/* Card 3 */}
            <div className="relative rounded-2xl border border-border bg-card p-8 shadow-soft">
              <div className="absolute -top-6 left-6 w-12 h-12 rounded-full bg-success shadow-md" />
              <div className="mt-4">
                <h3 className="text-2xl font-semibold text-foreground mb-3">Community Support</h3>
                <p className="text-muted-foreground mb-4">
                  Connect with fellow farmers and access expert advice in your local language
                </p>
                <button className="underline text-foreground/90">Learn more</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-foreground mb-16">
            What <span className="text-primary">Farmers</span> Say
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 shadow-soft">
              <CardContent className="pt-6">
                <p className="text-lg italic text-muted-foreground mb-4">
                  "AgriAI helped me increase my rice yield by 30% this season. The weather alerts 
                  saved my crops from unexpected storms."
                </p>
                <div className="flex items-center justify-center">
                  <div>
                    <div className="font-semibold">Ramesh Kumar</div>
                    <div className="text-sm text-muted-foreground">Rice Farmer, Cuttack</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-8 shadow-soft">
              <CardContent className="pt-6">
                <p className="text-lg italic text-muted-foreground mb-4">
                  "The money management feature helps me track all my expenses and profits. 
                  I can now plan better for the next season."
                </p>
                <div className="flex items-center justify-center">
                  <div>
                    <div className="font-semibold">Priya Sahoo</div>
                    <div className="text-sm text-muted-foreground">Vegetable Farmer, Khurda</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center px-4">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Farming?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of farmers in Odisha who are already using AgriAI to grow smarter
          </p>
          <Button asChild variant="outline" size="lg" className="bg-white text-green-600 border border-green-600 hover:bg-yellow-400 hover:text-white transition-colors duration-300"
          >
            <Link to="/dashboard">Get Started Today</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;