import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Palette, Mountain, Heart, Sparkles, Leaf, MoreHorizontal } from "lucide-react";

interface PersonalityQuizProps {
  onBack: () => void;
  onSubmit: (personality: string, colors: string[]) => void;
}

const PersonalityQuiz = ({ onBack, onSubmit }: PersonalityQuizProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPersonality, setSelectedPersonality] = useState("");
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const personalities = [
    { id: "artistic", label: "Artistic & Expressive", icon: Palette, description: "Creative soul with unique flair" },
    { id: "bold", label: "Bold & Adventurous", icon: Mountain, description: "Fearless and ready for anything" },
    { id: "minimalist", label: "Calm & Minimalist", icon: Heart, description: "Simple elegance and clean lines" },
    { id: "elegant", label: "Elegant & Classic", icon: Sparkles, description: "Timeless sophistication" },
    { id: "nature", label: "Nature Lover", icon: Leaf, description: "Connected to earth and outdoors" },
    { id: "other", label: "Other", icon: MoreHorizontal, description: "Something uniquely you" }
  ];

  const colors = [
    "Floral", "Red", "Tan", "Black", "Earthy", "Vibrant", "Pastel"
  ];

  const handlePersonalitySelect = (personality: string) => {
    setSelectedPersonality(personality);
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
      onSubmit(selectedPersonality, selectedColors);
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
            Personality Quiz
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

      {/* Step 1: Personality Selection */}
      {currentStep === 1 && (
        <div className="space-y-8 animate-scale-in">
          <div className="text-center space-y-2">
            <h3 className="font-display text-xl font-semibold text-foreground">
              What describes your personality best?
            </h3>
            <p className="text-muted-foreground">
              Choose the style that resonates with your inner self
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {personalities.map((personality) => (
              <div
                key={personality.id}
                className="group bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer hover-scale"
                onClick={() => handlePersonalitySelect(personality.id)}
              >
                <div className="text-center space-y-4">
                  <div className="w-12 h-12 mx-auto bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <personality.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground">
                      {personality.label}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {personality.description}
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
              What colors speak to you?
            </h3>
            <p className="text-muted-foreground">
              Select all the colors that catch your eye (choose at least one)
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

export default PersonalityQuiz;