import { useState, useCallback } from "react";
import { Upload, Image as ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCarousel from "./ProductCarousel";

interface Product {
  id: string;
  title: string;
  price: string;
  image: string;
  url?: string;
}

const ImageUpload = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);

  // Mock products for demonstration
  const mockProducts: Product[] = [
    {
      id: "1",
      title: "Anuschka Vintage Inspired Satchel - Floral Tapestry",
      price: "$315.00",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop&crop=center"
    },
    {
      id: "2", 
      title: "Anuschka Statement Tote - Watercolor Dreams",
      price: "$285.00",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=300&fit=crop&crop=center"
    },
    {
      id: "3",
      title: "Anuschka Evening Clutch - Golden Paisley",
      price: "$145.00", 
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=300&fit=crop&crop=center"
    }
  ];

  const handleFileUpload = useCallback((file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setUploadedImage(result);
        analyzeImage(result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const analyzeImage = async (imageData: string) => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis (replace with actual API call)
    setTimeout(() => {
      setRecommendedProducts(mockProducts);
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, [handleFileUpload]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
    setRecommendedProducts([]);
    setIsAnalyzing(false);
  };

  return (
    <div className="p-6 h-full flex flex-col">
      {!uploadedImage ? (
        <div className="flex-1 flex items-center justify-center">
          <div
            className="w-full max-w-md border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary/50 transition-colors cursor-pointer bg-muted/30"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-primary" />
              </div>
              
              <div className="space-y-2">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  Upload Your Style Inspiration
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Upload an image of a person or an outfit to find the perfect Anuschka handbag match.
                </p>
              </div>
              
              <div className="space-y-2">
                <Button variant="elegant" className="w-full">
                  <Upload className="w-4 h-4 mr-2" />
                  Choose Image
                </Button>
                <p className="text-xs text-muted-foreground">
                  or drag and drop your image here
                </p>
              </div>
            </div>
            
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Uploaded Image */}
          <div className="relative">
            <div className="relative bg-card rounded-lg p-4 border border-border">
              <Button
                onClick={removeImage}
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 z-10"
              >
                <X className="w-4 h-4" />
              </Button>
              
              <div className="aspect-video max-w-md mx-auto overflow-hidden rounded-md">
                <img
                  src={uploadedImage}
                  alt="Uploaded style inspiration"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {isAnalyzing && (
              <div className="absolute inset-0 bg-background/80 rounded-lg flex items-center justify-center">
                <div className="text-center space-y-3">
                  <div className="mx-auto w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-sm font-medium text-foreground">
                    Analyzing your style...
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Results */}
          {recommendedProducts.length > 0 && !isAnalyzing && (
            <div className="border-t border-border pt-6">
              <div className="text-center mb-6">
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  Perfect Matches Found!
                </h3>
                <p className="text-muted-foreground">
                  Based on your image, these Anuschka pieces would complement your style beautifully.
                </p>
              </div>
              <ProductCarousel products={recommendedProducts} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;