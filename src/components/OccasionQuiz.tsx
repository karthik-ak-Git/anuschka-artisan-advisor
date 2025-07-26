import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Briefcase, Home, Gift, Plane, PartyPopper, Sparkles } from "lucide-react";

interface OccasionQuizProps {
  onBack: () => void;
  onSubmit: (occasion: string, colors: string[]) => void;
}

const OccasionQuiz = ({ onBack, onSubmit }: OccasionQuizProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedOccasion, setSelectedOccasion] = useState("");
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const occasions = [
    { id: "work", label: "Work/Office", icon: Briefcase, description: "Professional and polished" },
    { id: "everyday", label: "Everyday Use", icon: Home, description: "Versatile for daily life" },
    { id: "gift", label: "Gift for Someone", icon: Gift, description: "Special present for loved ones" },
    { id: "travel", label: "Travel", icon: Plane, description: "Adventure and exploration" },
    { id: "party", label: "Party/Event", icon: PartyPopper, description: "Celebration and special moments" }
  ];

  const colors = [
    "Floral", "Red", "Tan", "Black", "Earthy", "Vibrant", "Pastel"
  ];

  const handleOccasionSelect = (occasion: string) => {
    setSelectedOccasion(occasion);
    setCurrentStep(2);
  };

  const handleColorToggle = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  const handleSubmit = () => {
    if (selectedColors.length > 0) {
      onSubmit(selectedOccasion, selectedColors);
    }
  };

  return (
    <div className="p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={onBack} className="p-2">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1 text-center">
          <h2 className="font-display text-2xl font-bold text-foreground">
            Occasion Quiz
          </h2>
          <p className="text-muted-foreground">Step {currentStep} of 2</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className="bg-accent h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${(currentStep / 2) * 100}%` }}
        />
      </div>

      {/* Step 1: Occasion Selection */}
      {currentStep === 1 && (
        <div className="space-y-8 animate-scale-in">
          <div className="text-center space-y-2">
            <h3 className="font-display text-xl font-semibold text-foreground">
              What's the occasion?
            </h3>
            <p className="text-muted-foreground">
              Tell us where you'll be taking your perfect bag
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {occasions.map((occasion) => (
              <div
                key={occasion.id}
                className="group bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer hover-scale"
                onClick={() => handleOccasionSelect(occasion.id)}
              >
                <div className="text-center space-y-4">
                  <div className="w-12 h-12 mx-auto bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <occasion.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground">
                      {occasion.label}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {occasion.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Color Selection */}
      {currentStep === 2 && (
        <div className="space-y-8 animate-scale-in">
          <div className="text-center space-y-2">
            <h3 className="font-display text-xl font-semibold text-foreground">
              What colors do you prefer?
            </h3>
            <p className="text-muted-foreground">
              Select the colors that match your vision (choose at least one)
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
            {colors.map((color) => (
              <Badge
                key={color}
                variant={selectedColors.includes(color) ? "default" : "outline"}
                className={`cursor-pointer px-6 py-3 text-sm font-medium transition-all duration-200 hover:scale-105 ${
                  selectedColors.includes(color) 
                    ? "bg-accent text-accent-foreground shadow-md" 
                    : "hover:bg-accent/10 hover:border-accent"
                }`}
                onClick={() => handleColorToggle(color)}
              >
                {color}
              </Badge>
            ))}
          </div>
          
          <div className="flex justify-center space-x-4 pt-6">
            <Button 
              variant="ghost" 
              onClick={() => setCurrentStep(1)}
              className="text-muted-foreground"
            >
              Back
            </Button>
            <Button
              variant="luxury"
              onClick={handleSubmit}
              disabled={selectedColors.length === 0}
              className="flex items-center space-x-2 px-8"
            >
              <Sparkles className="h-4 w-4" />
              <span>Find My Match</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OccasionQuiz;