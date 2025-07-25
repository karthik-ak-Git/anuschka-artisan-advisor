import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Camera } from "lucide-react";
import ChatInterface from "./ChatInterface";
import ImageUpload from "./ImageUpload";

const AnuschkaStylist = () => {
  const [activeTab, setActiveTab] = useState("style-advisor");

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Your Personal Anuschka Stylist
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover the perfect hand-painted leather handbag that captures your unique style and personality. 
            Let our AI stylist guide you to your next treasured piece.
          </p>
        </div>

        {/* Main Interface */}
        <div className="bg-card rounded-xl shadow-xl border border-border overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-[700px] flex flex-col">
            <TabsList className="grid w-full grid-cols-2 rounded-none border-b border-border bg-muted/50 h-16">
              <TabsTrigger 
                value="style-advisor" 
                className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:text-foreground font-medium text-base h-12"
              >
                <MessageCircle className="w-5 h-5" />
                Style Advisor
              </TabsTrigger>
              <TabsTrigger 
                value="visual-match" 
                className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:text-foreground font-medium text-base h-12"
              >
                <Camera className="w-5 h-5" />
                Visual Match
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="style-advisor" className="flex-1 m-0 focus-visible:outline-none">
              <ChatInterface />
            </TabsContent>
            
            <TabsContent value="visual-match" className="flex-1 m-0 focus-visible:outline-none">
              <ImageUpload />
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>
            Powered by AI • Inspired by artistry • Crafted with{" "}
            <span className="text-accent">♥</span> for Anuschka Leather
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnuschkaStylist;