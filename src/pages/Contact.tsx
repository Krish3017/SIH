import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent Successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions about AgriAI? Need technical support? We're here to help farmers in Odisha 
            succeed with smart agriculture solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="shadow-strong">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <MessageCircle className="w-6 h-6 text-primary mr-3" />
                Send us a Message
              </CardTitle>
              <p className="text-muted-foreground">
                Fill out the form below and we'll respond as soon as possible
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="What is your message about?"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us more about your question or concern..."
                    rows={6}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  variant="hero"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Phone Support</h3>
                    <p className="text-muted-foreground mb-1">Call us for immediate assistance</p>
                    <p className="text-primary font-medium">+91 9876543210</p>
                    <p className="text-sm text-muted-foreground">Available: 9 AM - 6 PM (IST)</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-earth rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Email Support</h3>
                    <p className="text-muted-foreground mb-1">Send us your questions</p>
                    <p className="text-primary font-medium">support@agriai.com</p>
                    <p className="text-sm text-muted-foreground">Response within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-success rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-success-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Office Location</h3>
                    <p className="text-muted-foreground mb-1">Visit us at our headquarters</p>
                    <p className="text-foreground">Bhubaneswar, Odisha 751001</p>
                    <p className="text-foreground">India</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Support Hours</h3>
                    <p className="text-muted-foreground mb-1">We're here to help</p>
                    <p className="text-foreground">Monday - Friday: 9 AM - 6 PM</p>
                    <p className="text-foreground">Saturday: 10 AM - 4 PM</p>
                    <p className="text-sm text-muted-foreground mt-1">Sunday: Closed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Support */}
            <Card className="shadow-soft border-destructive">
              <CardHeader>
                <CardTitle className="text-destructive">Emergency Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  For urgent agricultural issues during critical seasons or weather emergencies:
                </p>
                <div className="space-y-2">
                  <p className="font-semibold text-foreground">
                    🚨 Emergency Hotline: +91 9876543211
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Available 24/7 during monsoon and harvest seasons
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Social Media & Additional Resources */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Connect With Us</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Social Media</h4>
                    <div className="flex space-x-4">
                      <Button variant="outline" size="sm">
                        📘 Facebook
                      </Button>
                      <Button variant="outline" size="sm">
                        🐦 Twitter
                      </Button>
                      <Button variant="outline" size="sm">
                        📱 WhatsApp
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Additional Resources</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Download our mobile app for offline access</li>
                      <li>• Join our farmer community WhatsApp group</li>
                      <li>• Subscribe to weekly agricultural newsletters</li>
                      <li>• Access video tutorials in Odia language</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer Credits */}
        <div className="mt-16 text-center py-8 border-t border-border">
          <p className="text-lg font-semibold text-foreground mb-2">
            Built for <span className="text-primary">Odisha Hackathon 2025</span>
          </p>
          <p className="text-muted-foreground">
            Empowering farmers with AI-driven agriculture solutions
          </p>
          <div className="mt-4 flex justify-center space-x-4 text-sm text-muted-foreground">
            <span>🌱 Sustainable Farming</span>
            <span>•</span>
            <span>📊 Data-Driven Insights</span>
            <span>•</span>
            <span>🌍 Community Support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;