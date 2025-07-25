import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import ChatMessage from "./ChatMessage";
import ProductCarousel from "./ProductCarousel";

interface ChatMessage {
  id: string;
  message: string;
  isUser: boolean;
  timestamp: Date;
}

interface Product {
  id: string;
  title: string;
  price: string;
  image: string;
  url?: string;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      message: "Hello! I'm your personal Anuschka stylist. I'm here to help you find the perfect handbag that matches your unique style and personality. Tell me about yourself, your style preferences, or a special occasion you're shopping for!",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);

  // Mock products for demonstration
  const mockProducts: Product[] = [
    {
      id: "1",
      title: "Anuschka Classic Hand-Painted Hobo - Autumn Leaves",
      price: "$295.00",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop&crop=center"
    },
    {
      id: "2", 
      title: "Anuschka Convertible Tote - Butterfly Paradise",
      price: "$225.00",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=300&fit=crop&crop=center"
    },
    {
      id: "3",
      title: "Anuschka Crossbody Organizer - Abstract Garden",
      price: "$165.00", 
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=300&fit=crop&crop=center"
    }
  ];

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: "Thank you for sharing! Based on your style preferences, I've found some beautiful Anuschka pieces that would be perfect for you. Each handbag features hand-painted artwork and premium leather craftsmanship. Would you like to see more details about any of these pieces?",
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setRecommendedProducts(mockProducts);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            message={msg.message}
            isUser={msg.isUser}
            timestamp={msg.timestamp}
          />
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-card text-card-foreground rounded-lg p-4 shadow-sm border border-border">
              <div className="flex items-center space-x-2">
                <div className="animate-pulse flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
                <span className="text-sm text-muted-foreground">Your stylist is thinking...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Product Recommendations */}
      {recommendedProducts.length > 0 && (
        <div className="px-6 border-t border-border bg-muted/30">
          <ProductCarousel products={recommendedProducts} />
        </div>
      )}

      {/* Input Area */}
      <div className="p-6 border-t border-border bg-card/50">
        <div className="flex space-x-3">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Describe your style, personality, or an occasion..."
            className="flex-1 bg-background border-border focus:ring-primary"
            disabled={isLoading}
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            variant="elegant"
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;