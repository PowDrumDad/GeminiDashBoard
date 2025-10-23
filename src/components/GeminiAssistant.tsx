
import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Meal, Task } from '../types';
import { SparklesIcon } from './icons/SparklesIcon';
import { GEMINI_API_KEY } from '../config'; // Import the key from the new file

interface GeminiAssistantProps {
  meals: Meal[];
  tasks: Task[];
}

export const GeminiAssistant: React.FC<GeminiAssistantProps> = ({ meals, tasks }) => {
  const [suggestion, setSuggestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const getSuggestion = async () => {
    setIsLoading(true);
    setError('');
    setSuggestion('');
    try {
      if (!GEMINI_API_KEY || GEMINI_API_KEY === "YOUR_API_KEY_HERE") {
        throw new Error("API key is not configured. Please add it to config.ts.");
      }
      const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

      const mealList = meals.map(m => `- ${m.name}`).join('\n');
      const taskList = tasks.filter(t => !t.completed).map(t => `- ${t.text} (Category: ${t.category})`).join('\n');

      const prompt = `
        You are a helpful personal assistant. Based on the following user data, provide a helpful and encouraging suggestion for their day. Be concise and positive.

        Here are the meals they know how to cook:
        ${mealList}

        Here are their remaining tasks for the day:
        ${taskList}

        Suggest a meal for dinner tonight and provide one motivational tip to help them complete their tasks.
        Format your response as simple text, not markdown.
      `;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      
      setSuggestion(response.text);

    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        setError(`Sorry, I couldn't get a suggestion. ${err.message}`);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 bg-gradient-to-br from-indigo-50 to-purple-50">
      <h3 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2">
        <SparklesIcon className="text-indigo-500" />
        Gemini Assistant
      </h3>
      <p className="text-sm text-slate-500 mb-4">Get AI-powered suggestions for your day.</p>
      
      <button
        onClick={getSuggestion}
        disabled={isLoading}
        className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition disabled:bg-indigo-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Thinking...
          </>
        ) : (
          'Suggest my day'
        )}
      </button>

      {error && <p className="mt-4 text-sm text-red-600 bg-red-100 p-3 rounded-lg">{error}</p>}
      
      {suggestion && (
        <div className="mt-4 p-4 bg-white/60 rounded-lg border border-indigo-200">
          <p className="text-slate-700 whitespace-pre-wrap">{suggestion}</p>
        </div>
      )}
    </div>
  );
};
