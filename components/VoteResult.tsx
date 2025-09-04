"use client";

import { useState } from "react";

interface Poll {
  id: string;
  question: string;
  options: string[];
  votes: { [key: string]: number };
  createdAt: Date;
}

interface VoteResultProps {
  poll: Poll;
  showDetailedResults?: boolean;
}

export default function VoteResult({ poll, showDetailedResults = false }: VoteResultProps) {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [hasVoted, setHasVoted] = useState(false);
  const [currentVotes, setCurrentVotes] = useState(poll.votes);
  const [aiInsights, setAiInsights] = useState<string[]>([]);

  const totalVotes = Object.values(currentVotes).reduce((sum, count) => sum + count, 0);

  const handleVote = (option: string) => {
    if (hasVoted) return;
    
    setSelectedOption(option);
    setCurrentVotes(prev => ({
      ...prev,
      [option]: (prev[option] || 0) + 1
    }));
    setHasVoted(true);
    
    // Generate AI insights after voting
    generateAiInsights();
  };

  const generateAiInsights = () => {
    // Simulate AI analysis
    const insights = [
      "📊 This poll shows a balanced distribution of preferences",
      "🔥 The leading option has strong community support",
      "💡 Consider creating follow-up polls to dive deeper",
      "📈 Engagement is higher than average for this type of poll"
    ];
    setAiInsights(insights);
  };

  const getVotePercentage = (option: string) => {
    if (totalVotes === 0) return 0;
    return Math.round(((currentVotes[option] || 0) / totalVotes) * 100);
  };

  const sortedOptions = poll.options.sort((a, b) => 
    (currentVotes[b] || 0) - (currentVotes[a] || 0)
  );

  if (!poll) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No poll available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Poll Question */}
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {poll.question}
        </h3>
        <p className="text-gray-500 text-sm">
          Total votes: {totalVotes}
        </p>
      </div>

      {/* Voting Interface */}
      {!hasVoted && !showDetailedResults && (
        <div className="space-y-3">
          <p className="text-gray-600 mb-4">Choose your answer:</p>
          {poll.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleVote(option)}
              className="w-full p-4 text-left border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
            >
              <span className="font-medium">{option}</span>
            </button>
          ))}
        </div>
      )}

      {/* Results Display */}
      {(hasVoted || showDetailedResults) && (
        <div className="space-y-4">
          <h4 className="font-medium text-gray-800">Results:</h4>
          {sortedOptions.map((option, index) => {
            const votes = currentVotes[option] || 0;
            const percentage = getVotePercentage(option);
            const isSelected = option === selectedOption;
            
            return (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className={`font-medium ${isSelected ? 'text-blue-600' : 'text-gray-700'}`}>
                    {option} {isSelected && '✓'}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {votes} votes ({percentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ${
                      isSelected ? 'bg-blue-500' : 'bg-gray-400'
                    }`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* AI Insights */}
      {aiInsights.length > 0 && showDetailedResults && (
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border">
          <h4 className="font-medium text-gray-800 mb-3 flex items-center">
            🤖 AI Insights
          </h4>
          <div className="space-y-2">
            {aiInsights.map((insight, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="text-sm text-gray-700">{insight}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Share Options */}
      {(hasVoted || showDetailedResults) && (
        <div className="border-t pt-4">
          <p className="text-sm text-gray-500 mb-2">Share this poll:</p>
          <div className="flex gap-2">
            <button
              onClick={() => navigator.clipboard.writeText(window.location.href)}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 transition-colors"
            >
              Copy Link
            </button>
            <button
              onClick={() => {
                const text = `Check out this poll: ${poll.question}`;
                if (navigator.share) {
                  navigator.share({ title: 'Pollying AI Assistant', text, url: window.location.href });
                }
              }}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 transition-colors"
            >
              Share
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

