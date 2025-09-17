import { useState } from "react";
import { Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import chatbotAvatar from "@/assets/chatbot-avatar.jpg";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Namaskar! I'm AgriAI, your smart farming assistant. How can I help you today? আমি ওড়িয়া এবং ইংরেজি দুটি ভাষায় সাহায্য করতে পারি।",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const botResponses = [
    "Based on current weather conditions in Odisha, I recommend checking soil moisture before watering. Would you like specific irrigation advice for your crop?",
    "For rice cultivation in Odisha, the best planting time is usually June-July with the onset of monsoon. What variety are you planning to grow?",
    "Current weather shows moderate rainfall expected. This is good for rice crops but monitor for any pest issues. Do you need pest management advice?",
    "For optimal fertilizer use, consider soil testing first. NPK ratio depends on your crop and soil type. Which crop are you growing?",
    "Market prices for rice are currently stable. For better profits, consider organic farming methods. Would you like guidance on organic practices?",
    "Weather alerts show possible heavy rain in next 2 days. Ensure proper drainage in your fields. Need help with field preparation?",
    "Your farming expenses can be optimized by 15-20% with proper planning. Would you like me to analyze your current spending pattern?"
  ];

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate bot response after a delay
    setTimeout(() => {
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      const botMessage: Message = {
        id: messages.length + 2,
        text: randomResponse,
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInputMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            AI <span className="text-primary">Farming Assistant</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Ask questions about farming, get weather updates, and receive personalized recommendations in Odia or English
          </p>
        </div>

        {/* Chat Container */}
        <Card className="h-[600px] flex flex-col shadow-strong">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 ${
                  message.isBot ? "justify-start" : "justify-end"
                }`}
              >
                {message.isBot && (
                  <div className="flex-shrink-0">
                    <img
                      src={chatbotAvatar}
                      alt="AgriAI Assistant"
                      className="w-10 h-10 rounded-full border-2 border-primary"
                    />
                  </div>
                )}
                
                <div
                  className={`max-w-[70%] p-4 rounded-2xl ${
                    message.isBot
                      ? "bg-muted text-foreground"
                      : "bg-gradient-primary text-primary-foreground"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <span className="text-xs opacity-70 mt-2 block">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>

                {!message.isBot && (
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-secondary-foreground" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="border-t border-border p-4">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your farming question here... (English or Odia)"
                className="flex-1"
              />
              <Button onClick={sendMessage} variant="default" size="icon">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Quick Questions */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">Quick Questions:</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              "What's the best time to plant rice in Odisha?",
              "How much fertilizer should I use for my crop?",
              "What are the weather conditions for next week?",
              "How can I improve my crop yield?",
              "What are the current market prices?",
              "How to prevent pest attacks?"
            ].map((question, index) => (
              <Button
                key={index}
                variant="outline"
                className="text-left justify-start h-auto p-3"
                onClick={() => setInputMessage(question)}
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;