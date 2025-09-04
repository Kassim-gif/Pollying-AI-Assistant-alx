"use client";

import { useState } from "react";
import PollForm from "../../components/PollForm";
import VoteResult from "../../components/VoteResult";
import QRCodeCard from "../../components/QRCodeCard";

interface Poll {
  id: string;
  question: string;
  options: string[];
  votes: { [key: string]: number };
  createdAt: Date;
}

export default function Home() {
  const [currentView, setCurrentView] = useState<'create' | 'vote' | 'results'>('create');
  const [activePoll, setActivePoll] = useState<Poll | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center py-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🗳️ Pollying AI Assistant
          </h1>
          <p className="text-gray-600 text-lg">
            Create, share, and analyze polls with AI-powered insights
          </p>
        </header>

        {/* Navigation */}
        <nav className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setCurrentView('create')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              currentView === 'create'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Create Poll
          </button>
          <button
            onClick={() => setCurrentView('vote')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              currentView === 'vote'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Vote
          </button>
          <button
            onClick={() => setCurrentView('results')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              currentView === 'results'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Results
          </button>
        </nav>

        {/* Main Content */}
        <main className="bg-white rounded-xl shadow-lg p-6">
          {currentView === 'create' && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Create New Poll</h2>
              <PollForm onPollCreated={(poll) => {
                setActivePoll(poll);
                setCurrentView('vote');
              }} />
            </div>
          )}

          {currentView === 'vote' && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Vote on Poll</h2>
              {activePoll ? (
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <VoteResult poll={activePoll} />
                  </div>
                  <div>
                    <QRCodeCard pollId={activePoll.id} />
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No active poll. Create one to get started!</p>
                  <button
                    onClick={() => setCurrentView('create')}
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Create Poll
                  </button>
                </div>
              )}
            </div>
          )}

          {currentView === 'results' && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Poll Results</h2>
              {activePoll ? (
                <VoteResult poll={activePoll} showDetailedResults={true} />
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No poll results to display.</p>
                  <button
                    onClick={() => setCurrentView('create')}
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Create Poll
                  </button>
                </div>
              )}
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="text-center py-8 text-gray-500">
          <p>Powered by AI • Built with Next.js & Supabase</p>
        </footer>
      </div>
    </div>
  );
}
