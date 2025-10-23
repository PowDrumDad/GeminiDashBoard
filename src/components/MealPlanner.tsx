
import React, { useState } from 'react';
import { Meal } from '../types';
import { PlusIcon } from './icons/PlusIcon';

interface MealPlannerProps {
  meals: Meal[];
  onAddMeal: (name: string) => void;
}

export const MealPlanner: React.FC<MealPlannerProps> = ({ meals, onAddMeal }) => {
  const [newMealName, setNewMealName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMealName.trim()) {
      onAddMeal(newMealName.trim());
      setNewMealName('');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-slate-800 mb-4">Meal Ideas</h3>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newMealName}
          onChange={(e) => setNewMealName(e.target.value)}
          placeholder="Add a new meal..."
          className="flex-grow px-3 py-1.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition text-sm"
        />
        <button type="submit" className="bg-indigo-500 text-white p-2 rounded-lg hover:bg-indigo-600 transition">
          <PlusIcon className="w-4 h-4" />
        </button>
      </form>
      <ul className="space-y-1 max-h-60 overflow-y-auto pr-2">
        {meals.map((meal) => (
          <li key={meal.id} className="p-2 rounded-md text-slate-600">
            {meal.name}
          </li>
        ))}
        {meals.length === 0 && (
            <p className="text-center text-slate-400 py-4 text-sm">No meals saved yet.</p>
        )}
      </ul>
    </div>
  );
};
