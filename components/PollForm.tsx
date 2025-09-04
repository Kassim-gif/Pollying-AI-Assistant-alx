"use client";

import { useState } from "react";

interface Poll {
  id: string;
  question: string;
  options: string[];
  votes: { [key: string]: number };
  createdAt: Date;
}

interface PollFormProps {
  onPollCreated: (poll: Poll) => void;
}

export default function PollForm({ onPollCreated }: PollFormProps) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);

  const addOption = () => {
    if (options.length < 6) {
      setOptions([...options, ""]);
    }
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const generateAiSuggestions = async () => {
    setIsLoading(true);
    setShowAiSuggestions(true);
    
    // Simulate AI suggestions (in real implementation, this would call an AI API)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const suggestions = [
      "What's your favorite programming language?",
      "Which meal do you prefer?",
      "Best time for team meetings?",
      "Preferred work-from-home schedule?",
      "Most important skill for developers?"
    ];
    
    setAiSuggestions(suggestions);
    setIsLoading(false);
  };

  const applyAiSuggestion = (suggestion: string) => {
    setQuestion(suggestion);
    setShowAiSuggestions(false);
    
    // Generate relevant options based on the question
    const optionSets: { [key: string]: string[] } = {
      "programming language": ["JavaScript", "Python", "TypeScript", "Go"],
      "meal": ["Breakfast", "Lunch", "Dinner", "Snacks"],
      "meetings": ["Morning (9-11 AM)", "Afternoon (1-3 PM)", "Evening (4-6 PM)", "Flexible"],
      "work-from-home": ["Full remote", "Hybrid (2-3 days)", "Hybrid (1-2 days)", "Office only"],
      "skill": ["Problem solving", "Communication", "Technical expertise", "Leadership"]
    };
    
    for (const [key, opts] of Object.entries(optionSets)) {
      if (suggestion.toLowerCase().includes(key)) {
        setOptions(opts);
        break;
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim() || options.some(opt => !opt.trim())) {
      alert("Please fill in the question and all options");
      return;
    }

    const poll: Poll = {
      id: Date.now().toString(),
      question: question.trim(),
      options: options.filter(opt => opt.trim()),
      votes: {},
      createdAt: new Date()
    };

    onPollCreated(poll);
    
    // Reset form
    setQuestion("");
    setOptions(["", ""]);
  };

  return (
    <div className="space-y-6">
      {/* AI Assistant Section */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-medium text-gray-800 flex items-center">
            🤖 AI Assistant
          </h3>
          <button
            onClick={generateAiSuggestions}
            disabled={isLoading}
            className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50"
          >
            {isLoading ? "Generating..." : "Get Suggestions"}
          </button>
        </div>
        
        {showAiSuggestions && (
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Click on a suggestion to use it:</p>
            <div className="grid gap-2">
              {aiSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => applyAiSuggestion(suggestion)}
                  className="text-left p-3 bg-white border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Poll Creation Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
            Poll Question
          </label>
          <input
            type="text"
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="What would you like to ask?"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Poll Options
          </label>
          <div className="space-y-3">
            {options.map((option, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => updateOption(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                {options.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeOption(index)}
                    className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
          
          {options.length < 6 && (
            <button
              type="button"
              onClick={addOption}
              className="mt-3 px-4 py-2 text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
            >
              + Add Option
            </button>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors font-medium"
        >
          Create Poll
        </button>
      </form>
    </div>
  );
}