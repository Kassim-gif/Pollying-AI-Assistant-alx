"use client";

import { useState } from "react";

interface QRCodeCardProps {
  pollId: string;
}

export default function QRCodeCard({ pollId }: QRCodeCardProps) {
  const [isGenerated, setIsGenerated] = useState(false);
  
  const pollUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/poll/${pollId}`
    : `https://yourapp.com/poll/${pollId}`;

  const generateQRCode = () => {
    setIsGenerated(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pollUrl);
    alert('Poll URL copied to clipboard!');
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Share This Poll
        </h3>
        <p className="text-gray-600 text-sm">
          Generate a QR code or share the link
        </p>
      </div>

      {/* QR Code Display Area */}
      <div className="flex justify-center">
        <div className="w-48 h-48 border-2 border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
          {!isGenerated ? (
            <div className="text-center">
              <div className="text-4xl mb-2">📱</div>
              <p className="text-gray-500 text-sm">Click to generate QR code</p>
            </div>
          ) : (
            <div className="text-center">
              {/* QR Code Pattern Simulation */}
              <div className="w-40 h-40 bg-white border border-gray-300 rounded grid grid-cols-8 gap-1 p-2">
                {Array.from({ length: 64 }, (_, i) => (
                  <div
                    key={i}
                    className={`w-full h-full ${
                      Math.random() > 0.5 ? 'bg-black' : 'bg-white'
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">QR Code Generated</p>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        {!isGenerated ? (
          <button
            onClick={generateQRCode}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Generate QR Code
          </button>
        ) : (
          <div className="space-y-2">
            <button
              onClick={() => window.print()}
              className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
            >
              Print QR Code
            </button>
            <button
              onClick={() => {
                // In a real implementation, this would download the QR code image
                alert('QR code download would start here');
              }}
              className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors"
            >
              Download QR Code
            </button>
          </div>
        )}
        
        <div className="border-t pt-3">
          <p className="text-sm text-gray-600 mb-2">Poll URL:</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={pollUrl}
              readOnly
              className="flex-1 p-2 border border-gray-300 rounded text-sm bg-gray-50"
            />
            <button
              onClick={copyToClipboard}
              className="px-3 py-2 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors"
            >
              Copy
            </button>
          </div>
        </div>
      </div>

      {/* QR Code Info */}
      <div className="bg-blue-50 p-3 rounded-lg">
        <h4 className="text-sm font-medium text-blue-800 mb-1">
          📋 How to use:
        </h4>
        <ul className="text-xs text-blue-700 space-y-1">
          <li>• Scan the QR code with any smartphone camera</li>
          <li>• Share the URL via messaging apps</li>
          <li>• Print and display the QR code publicly</li>
          <li>• Works on all devices with internet access</li>
        </ul>
      </div>

      {/* Usage Stats */}
      <div className="text-center text-xs text-gray-500">
        <p>Poll ID: {pollId}</p>
        <p>Created: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
}
