import { useState } from "react";
import QuizSelector from "./QuizSelector";
import PersonalityQuiz from "./PersonalityQuiz";
import OccasionQuiz from "./OccasionQuiz";
import ResultDisplay from "./ResultDisplay";

interface Product {
  id: string;
  title: string;
  price: string;
  image: string;
  url?: string;
}

type QuizState = 'selector' | 'personality' | 'occasion' | 'results';

const QuizInterface = () => {
  const [currentState, setCurrentState] = useState<QuizState>('selector');
  const [selectedPath, setSelectedPath] = useState<'personality' | 'occasion'>('personality');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [selectedOptions, setSelectedOptions] = useState("");

  const handlePathSelection = (path: 'personality' | 'occasion') => {
    setSelectedPath(path);
    setCurrentState(path);
  };

  const handlePersonalitySubmit = async (personality: string, colors: string[]) => {
    setIsLoading(true);
    setCurrentState('results');
    
    const colorsText = colors.join(", ");
    const inputText = `Recommend a handbag for a ${personality} person who likes ${colorsText}.`;
    setSelectedOptions(`${personality} style with ${colorsText} colors`);
    
    await fetchRecommendations(inputText);
  };

  const handleOccasionSubmit = async (occasion: string, colors: string[]) => {
    setIsLoading(true);
    setCurrentState('results');
    
    const colorsText = colors.join(", ");
    const inputText = `Recommend a handbag for ${occasion} who likes ${colorsText}.`;
    setSelectedOptions(`${occasion} occasion with ${colorsText} colors`);
    
    await fetchRecommendations(inputText);
  };

  const fetchRecommendations = async (inputText: string) => {
    try {
      const response = await fetch("http://localhost:8000/recommend/text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input_text: inputText }),
      });

      if (response.ok) {
        const data = await response.json();
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

  const handleBack = () => {
    if (currentState === 'personality' || currentState === 'occasion') {
      setCurrentState('selector');
    } else if (currentState === 'results') {
      setCurrentState(selectedPath);
    }
  };

  const handleStartOver = () => {
    setCurrentState('selector');
    setSelectedPath('personality');
    setRecommendations([]);
    setSelectedOptions('');
  };

  return (
    <div className="min-h-[600px]">
      {currentState === 'selector' && (
        <QuizSelector onSelectPath={handlePathSelection} />
      )}
      
      {currentState === 'personality' && (
        <PersonalityQuiz 
          onBack={handleBack}
          onSubmit={handlePersonalitySubmit}
        />
      )}
      
      {currentState === 'occasion' && (
        <OccasionQuiz 
          onBack={handleBack}
          onSubmit={handleOccasionSubmit}
        />
      )}
      
      {currentState === 'results' && (
        <ResultDisplay
          products={recommendations}
          selectedPath={selectedPath}
          selectedOptions={selectedOptions}
          onBack={handleBack}
          onStartOver={handleStartOver}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default QuizInterface;