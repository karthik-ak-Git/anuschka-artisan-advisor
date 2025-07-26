import { Button } from "@/components/ui/button";
import { Sparkles, Calendar } from "lucide-react";

interface QuizSelectorProps {
  onSelectPath: (path: 'personality' | 'occasion') => void;
}

const QuizSelector = ({ onSelectPath }: QuizSelectorProps) => {
  return (
    <div className="p-8 space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h2 className="font-display text-3xl font-bold text-foreground">
          Choose Your Style Path
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Let us guide you to your perfect Anuschka handbag through a personalized journey
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Personality Path */}
        <div 
          className="group bg-gradient-to-br from-card to-card/80 rounded-2xl p-8 border border-border shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover-scale"
          onClick={() => onSelectPath('personality')}
        >
          <div className="text-center space-y-6">
            <div className="w-16 h-16 mx-auto bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors">
              <Sparkles className="w-8 h-8 text-accent" />
            </div>
            
            <div className="space-y-3">
              <h3 className="font-display text-2xl font-semibold text-foreground">
                ✨ Discover by Personality
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Find a bag that matches your personality, mood, and unique traits. 
                Let your style shine through.
              </p>
            </div>
            
            <Button 
              variant="luxury" 
              className="w-full mt-6 group-hover:scale-105 transition-transform"
            >
              Start Personality Quiz
            </Button>
          </div>
        </div>
        
        {/* Occasion Path */}
        <div 
          className="group bg-gradient-to-br from-card to-card/80 rounded-2xl p-8 border border-border shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover-scale"
          onClick={() => onSelectPath('occasion')}
        >
          <div className="text-center space-y-6">
            <div className="w-16 h-16 mx-auto bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors">
              <Calendar className="w-8 h-8 text-accent" />
            </div>
            
            <div className="space-y-3">
              <h3 className="font-display text-2xl font-semibold text-foreground">
                🎯 Choose by Occasion
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Find a bag perfect for a specific event, purpose, or moment in your life.
              </p>
            </div>
            
            <Button 
              variant="luxury" 
              className="w-full mt-6 group-hover:scale-105 transition-transform"
            >
              Start Occasion Quiz
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizSelector;