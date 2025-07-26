import { Button } from "@/components/ui/button";
import ProductCarousel from "./ProductCarousel";
import { ArrowLeft, RotateCcw } from "lucide-react";

interface Product {
  id: string;
  title: string;
  price: string;
  image: string;
  url?: string;
}

interface ResultDisplayProps {
  products: Product[];
  selectedPath: string;
  selectedOptions: string;
  onBack: () => void;
  onStartOver: () => void;
  isLoading: boolean;
}

const ResultDisplay = ({ 
  products, 
  selectedPath, 
  selectedOptions, 
  onBack, 
  onStartOver, 
  isLoading 
}: ResultDisplayProps) => {
  if (isLoading) {
    return (
      <div className="p-8 animate-fade-in">
        <div className="flex flex-col items-center justify-center py-16 space-y-6">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-accent/20 border-t-accent rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-accent/60 rounded-full animate-spin animate-reverse" style={{ animationDelay: '0.1s' }}></div>
          </div>
          <div className="text-center space-y-2">
            <h3 className="font-display text-xl font-semibold text-foreground">
              Finding Your Perfect Match
            </h3>
            <p className="text-muted-foreground">
              Our AI stylist is curating personalized recommendations just for you...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="p-2">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <Button 
          variant="outline" 
          onClick={onStartOver}
          className="flex items-center space-x-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Start Over</span>
        </Button>
      </div>

      {/* Results Header */}
      <div className="text-center space-y-4 animate-scale-in">
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-accent/20 to-accent/10 rounded-full flex items-center justify-center">
          <span className="text-3xl">👜</span>
        </div>
        
        <div className="space-y-2">
          <h2 className="font-display text-3xl font-bold text-foreground">
            Your Perfect Matches
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Based on your {selectedPath} preferences: {selectedOptions}
          </p>
        </div>
      </div>

      {/* Product Results */}
      {products.length > 0 ? (
        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <ProductCarousel products={products} />
        </div>
      ) : (
        <div className="text-center py-12 space-y-4">
          <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
            <span className="text-2xl">🔍</span>
          </div>
          <div className="space-y-2">
            <h3 className="font-display text-xl font-semibold text-foreground">
              No Results Found
            </h3>
            <p className="text-muted-foreground">
              We couldn't find any matches for your preferences. Try adjusting your selections.
            </p>
          </div>
          <Button 
            variant="luxury" 
            onClick={onStartOver}
            className="mt-4"
          >
            Try Different Options
          </Button>
        </div>
      )}

      {/* Additional Actions */}
      {products.length > 0 && (
        <div className="text-center pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">
            Not quite right? Let's find something different
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" onClick={onBack}>
              Adjust Colors
            </Button>
            <Button variant="outline" onClick={onStartOver}>
              Try Different Path
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;