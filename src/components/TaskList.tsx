
import React, { useState } from 'react';
import { Task } from '../types';
import { CheckIcon } from './icons/CheckIcon';
import { PlusIcon } from './icons/PlusIcon';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onAddTask: (text: string, category: Task['category']) => void;
}

const categoryStyles = {
  personal: 'bg-green-100 text-green-800',
  family: 'bg-sky-100 text-sky-800',
  professional: 'bg-amber-100 text-amber-800',
  religious: 'bg-purple-100 text-purple-800',
};

export const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleTask, onAddTask }) => {
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState<Task['category']>('personal');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskText.trim()) {
      onAddTask(newTaskText.trim(), newTaskCategory);
      setNewTaskText('');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">To-Do List</h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 mb-6">
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-grow px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
        />
        <div className="flex gap-2">
            <select
                value={newTaskCategory}
                onChange={(e) => setNewTaskCategory(e.target.value as Task['category'])}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition bg-white"
            >
                <option value="personal">Personal</option>
                <option value="family">Family</option>
                <option value="professional">Professional</option>
                <option value="religious">Religious</option>
            </select>
            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition font-semibold flex items-center gap-2">
                <PlusIcon />
                Add
            </button>
        </div>
      </form>
      
      <ul className="space-y-3">
        {tasks.map((task) => (
          <li
            key={task.id}
            onClick={() => onToggleTask(task.id)}
            className="flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ease-in-out group hover:bg-slate-100/80"
          >
            <div className={`w-6 h-6 rounded-md flex items-center justify-center border-2 transition-all ${task.completed ? 'bg-indigo-500 border-indigo-500' : 'bg-white border-slate-300 group-hover:border-indigo-400'}`}>
              {task.completed && <CheckIcon className="w-4 h-4 text-white" />}
            </div>
            <span className={`ml-4 flex-grow ${task.completed ? 'line-through text-slate-400' : 'text-slate-700'}`}>
              {task.text}
            </span>
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${categoryStyles[task.category]}`}>
              {task.category}
            </span>
          </li>
        ))}
        {tasks.length === 0 && (
            <p className="text-center text-slate-400 py-4">No tasks yet. Add one above!</p>
        )}
      </ul>
    </div>
  );
};
