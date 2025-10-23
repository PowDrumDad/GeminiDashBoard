
import React, { useState, useMemo } from 'react';
import { ShoppingListItem } from '../types';
import { PlusIcon } from './icons/PlusIcon';
import { CheckIcon } from './icons/CheckIcon';

interface ShoppingListProps {
  items: ShoppingListItem[];
  onToggleItem: (id: string) => void;
  onAddItem: (name: string) => void;
}

export const ShoppingList: React.FC<ShoppingListProps> = ({ items, onToggleItem, onAddItem }) => {
  const [newItemName, setNewItemName] = useState('');

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => Number(a.checked) - Number(b.checked));
  }, [items]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItemName.trim()) {
      onAddItem(newItemName.trim());
      setNewItemName('');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-slate-800 mb-4">Shopping List</h3>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="Add an item..."
          className="flex-grow px-3 py-1.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition text-sm"
        />
        <button type="submit" className="bg-indigo-500 text-white p-2 rounded-lg hover:bg-indigo-600 transition">
          <PlusIcon className="w-4 h-4" />
        </button>
      </form>
      <ul className="space-y-2 max-h-60 overflow-y-auto pr-2">
        {sortedItems.map((item) => (
          <li
            key={item.id}
            onClick={() => onToggleItem(item.id)}
            className="flex items-center p-2 rounded-md cursor-pointer group hover:bg-slate-100"
          >
            <div className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-all ${item.checked ? 'bg-indigo-500 border-indigo-500' : 'bg-white border-slate-300 group-hover:border-indigo-400'}`}>
                {item.checked && <CheckIcon className="w-3 h-3 text-white"/>}
            </div>
            <span className={`ml-3 ${item.checked ? 'line-through text-slate-400' : 'text-slate-600'}`}>
              {item.name}
            </span>
          </li>
        ))}
         {items.length === 0 && (
            <p className="text-center text-slate-400 py-4 text-sm">Your shopping list is empty.</p>
        )}
      </ul>
    </div>
  );
};
