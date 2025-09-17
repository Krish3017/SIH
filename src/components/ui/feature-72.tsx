import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Feature {
  id: string;
  title: string;
  description: string;
  image: string;
  url?: string;
}

interface Feature72Props {
  heading?: string;
  description?: string;
  linkUrl?: string;
  linkText?: string;
  features?: Feature[];
}

export const Feature72 = ({
  heading = "Powerful Features",
  description =
    "Discover the powerful features that make our platform stand out from the rest. Built with the latest technology and designed for maximum productivity.",
  linkUrl = "https://www.shadcnblocks.com",
  linkText = "Book a demo",
  features = [
    {
      id: "feat-ai",
      title: "AI Chatbot",
      description: "Ask in Odia or English. Get instant, localized farming advice.",
      image: "https://images.unsplash.com/photo-1518655048521-f130df041f66?q=80&w=1600&auto=format&fit=crop",
      url: "/chatbot",
    },
    {
      id: "feat-weather",
      title: "Weather Forecast",
      description: "Accurate 7-day forecasts tailored for your region and crops.",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1600&auto=format&fit=crop",
      url: "/weather",
    },
    {
      id: "feat-irrigation",
      title: "Smart Irrigation",
      description: "Save water with schedules based on soil and weather data.",
      image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1600&auto=format&fit=crop",
      url: "/recommendations",
    },
    {
      id: "feat-money",
      title: "Money Management",
      description: "Track expenses, revenue and profits for better planning.",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1600&auto=format&fit=crop",
      url: "/money",
    },
  ],
}: Feature72Props) => {
  return (
    <section className="py-20 md:py-28">
      <div className="container flex flex-col gap-16 lg:px-16">
        <div className="lg:max-w-sm">
          <h2 className="mb-3 text-xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
            {heading}
          </h2>
          <p className="mb-8 text-muted-foreground lg:text-lg">{description}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="flex flex-col overflow-clip rounded-xl border border-border bg-card/50 backdrop-blur-sm"
            >
              <div>
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="aspect-[16/9] h-full w-full object-cover object-center"
                />
              </div>
              <div className="px-6 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12">
                <h3 className="mb-3 text-lg font-semibold md:mb-4 md:text-2xl lg:mb-6">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground lg:text-lg">
                  {feature.description}
                </p>
                {feature.url && (
                  <div className="mt-6">
                    <Button asChild variant="outline" className="w-full">
                      <Link to={feature.url}>Go to {feature.title}</Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


