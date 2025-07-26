import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductCarousel from "./ProductCarousel";
import { Sparkles, Briefcase, Plane, Gift, PartyPopper, Heart, Palette, ShoppingBag, Home, Mountain } from "lucide-react";

interface QuizState {
  occasion: string;
  personality: string;
  colors: string[];
}

interface Product {
  id: string;
  title: string;
  price: string;
  image: string;
  url?: string;
}

const QuizInterface = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selections, setSelections] = useState<QuizState>({
    occasion: "",
    personality: "",
    colors: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Product[]>([]);

  const occasions = [
    { id: "everyday", label: "Everyday Use", icon: Home },
    { id: "business", label: "Office or Business", icon: Briefcase },
    { id: "travel", label: "Travel", icon: Plane },
    { id: "gift", label: "Gift for Someone", icon: Gift },
    { id: "party", label: "Party or Event", icon: PartyPopper }
  ];

  const personalities = [
    { id: "artistic", label: "Artistic & Creative", icon: Palette },
    { id: "bold", label: "Bold & Adventurous", icon: Mountain },
    { id: "elegant", label: "Elegant & Classic", icon: Sparkles },
    { id: "minimalist", label: "Minimalist", icon: Heart },
    { id: "nature", label: "Nature Lover", icon: Mountain }
  ];

  const colors = [
    "Black", "Red", "Tan", "Floral", "Bright", "Earthy", "Pastel"
  ];

  const handleOccasionSelect = (occasion: string) => {
    setSelections(prev => ({ ...prev, occasion }));
    setCurrentStep(2);
  };

  const handlePersonalitySelect = (personality: string) => {
    setSelections(prev => ({ ...prev, personality }));
    setCurrentStep(3);
  };

  const handleColorToggle = (color: string) => {
    setSelections(prev => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter(c => c !== color)
        : [...prev.colors, color]
    }));
  };

  const handleSubmit = async () => {
    if (selections.colors.length === 0) return;
    
    setIsLoading(true);
    setCurrentStep(4);

    try {
      const colorsText = selections.colors.join(", ");
      const inputText = `Recommend a bag for a ${selections.personality} person attending a ${selections.occasion} who likes ${colorsText}.`;
      
      const response = await fetch("http://localhost:8000/recommend/text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input_text: inputText }),
      });

      if (response.ok) {
        const data = await response.json();
        // Assuming the API returns products in a format we can use
        setRecommendations(data.products || []);
      } else {
        console.error("Failed to fetch recommendations");
        // Mock data for demo purposes
        setRecommendations([
          {
            id: "1",
            title: "Hand-Painted Leather Crossbody",
            price: "$249",
            image: "/api/placeholder/300/240",
            url: "https://www.anuschkaleather.com"
          },
          {
            id: "2", 
            title: "Artistic Floral Tote",
            price: "$329",
            image: "/api/placeholder/300/240",
            url: "https://www.anuschkaleather.com"
          }
        ]);
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      // Mock data for demo purposes
      setRecommendations([
        {
          id: "1",
          title: "Hand-Painted Leather Crossbody",
          price: "$249",
          image: "/api/placeholder/300/240",
          url: "https://www.anuschkaleather.com"
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(1);
    setSelections({ occasion: "", personality: "", colors: [] });
    setRecommendations([]);
  };

  if (currentStep === 4) {
    return (
      <div className="space-y-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mb-4"></div>
            <p className="text-muted-foreground">Finding your perfect bag...</p>
          </div>
        ) : (
          <>
            <div className="text-center space-y-2">
              <h3 className="font-display text-xl font-semibold text-foreground">
                Your Perfect Matches
              </h3>
              <p className="text-muted-foreground">
                Based on your selections: {selections.personality} style for {selections.occasion}
              </p>
              <Button 
                variant="outline" 
                onClick={resetQuiz}
                className="mt-4"
              >
                Take Quiz Again
              </Button>
            </div>
            <ProductCarousel products={recommendations} />
          </>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Progress Indicator */}
      <div className="flex items-center justify-center space-x-2">
        {[1, 2, 3].map((step) => (
          <div
            key={step}
            className={`w-3 h-3 rounded-full transition-colors ${
              step <= currentStep ? "bg-accent" : "bg-muted"
            }`}
          />
        ))}
      </div>

      {/* Step 1: Occasion */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h3 className="font-display text-xl font-semibold text-foreground">
              What's the occasion?
            </h3>
            <p className="text-muted-foreground">
              Tell us when you'll be using your bag
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {occasions.map((occasion) => (
              <Button
                key={occasion.id}
                variant="outline"
                onClick={() => handleOccasionSelect(occasion.id)}
                className="h-auto p-6 flex flex-col items-center space-y-3 hover:bg-accent/10 hover:border-accent"
              >
                <occasion.icon className="h-8 w-8 text-accent" />
                <span className="font-medium">{occasion.label}</span>
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Personality */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h3 className="font-display text-xl font-semibold text-foreground">
              What's your style personality?
            </h3>
            <p className="text-muted-foreground">
              Choose the style that best describes you
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {personalities.map((personality) => (
              <Button
                key={personality.id}
                variant="outline"
                onClick={() => handlePersonalitySelect(personality.id)}
                className="h-auto p-6 flex flex-col items-center space-y-3 hover:bg-accent/10 hover:border-accent"
              >
                <personality.icon className="h-8 w-8 text-accent" />
                <span className="font-medium">{personality.label}</span>
              </Button>
            ))}
          </div>
          
          <div className="text-center">
            <Button 
              variant="ghost" 
              onClick={() => setCurrentStep(1)}
              className="text-muted-foreground"
            >
              Back
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Colors */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h3 className="font-display text-xl font-semibold text-foreground">
              What colors do you love?
            </h3>
            <p className="text-muted-foreground">
              Select all that appeal to you
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {colors.map((color) => (
              <Badge
                key={color}
                variant={selections.colors.includes(color) ? "default" : "outline"}
                className={`cursor-pointer px-4 py-2 text-sm transition-all hover:scale-105 ${
                  selections.colors.includes(color) 
                    ? "bg-accent text-accent-foreground" 
                    : "hover:bg-accent/10 hover:border-accent"
                }`}
                onClick={() => handleColorToggle(color)}
              >
                {color}
              </Badge>
            ))}
          </div>
          
          <div className="flex justify-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => setCurrentStep(2)}
              className="text-muted-foreground"
            >
              Back
            </Button>
            <Button
              variant="luxury"
              onClick={handleSubmit}
              disabled={selections.colors.length === 0}
              className="flex items-center space-x-2"
            >
              <Sparkles className="h-4 w-4" />
              <span>Find My Bag</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizInterface;