import React, { useState } from 'react';
import { useMockData } from './hooks/useMockData';
import { Task, ShoppingListItem, Meal, Appointment } from './types';
import { DailyAgenda } from './components/DailyAgenda';
import { TaskList } from './components/TaskList';
import { ShoppingList } from './components/ShoppingList';
import { MealPlanner } from './components/MealPlanner';
import { GeminiAssistant } from './components/GeminiAssistant';
import { Clock } from './components/Clock';
import { WeeklyView } from './components/WeeklyView';
import { MonthlyView } from './components/MonthlyView';

type View = 'daily' | 'weekly' | 'monthly';

function App() {
  const { 
    tasks: initialTasks, 
    shoppingList: initialShoppingList, 
    meals: initialMeals,
    appointments: initialAppointments
  } = useMockData();

  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>(initialShoppingList);
  const [meals, setMeals] = useState<Meal[]>(initialMeals);
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [currentView, setCurrentView] = useState<View>('daily');

  const today = new Date();
  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleToggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleAddTask = (text: string, category: Task['category']) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      text,
      completed: false,
      category,
    };
    setTasks([newTask, ...tasks]);
  };

  const handleToggleShoppingItem = (id: string) => {
    setShoppingList(shoppingList.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };
  
  const handleAddShoppingItem = (name: string) => {
    const newItem: ShoppingListItem = {
      id: `shop-${Date.now()}`,
      name,
      checked: false,
    };
    setShoppingList([newItem, ...shoppingList]);
  };

  const handleAddMeal = (name: string) => {
    const newMeal: Meal = {
      id: `meal-${Date.now()}`,
      name,
      description: 'A delicious meal.',
    };
    setMeals([...meals, newMeal]);
  };

  const viewButtonClasses = (view: View) => 
    `px-4 py-2 rounded-lg font-semibold transition text-sm sm:text-base ${
      currentView === view 
        ? 'bg-indigo-600 text-white shadow' 
        : 'bg-white hover:bg-slate-200 text-slate-600'
    }`;

  return (
    <div className="min-h-screen bg-slate-100/50 text-slate-800 font-sans p-4 lg:p-8">
       <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Your Dashboard</h1>
          <p className="text-slate-500 mt-1">{dateFormatter.format(today)}</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
          <div className="p-1 bg-slate-200/70 rounded-xl flex items-center gap-1">
            <button onClick={() => setCurrentView('daily')} className={viewButtonClasses('daily')}>Day</button>
            <button onClick={() => setCurrentView('weekly')} className={viewButtonClasses('weekly')}>Week</button>
            <button onClick={() => setCurrentView('monthly')} className={viewButtonClasses('monthly')}>Month</button>
          </div>
          <div className="hidden sm:block flex-grow" />
          <Clock />
        </div>
      </header>
      
      <main className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        
        {/* Main Content: Daily Agenda & Tasks */}
        <div className="lg:col-span-2 xl:col-span-3 space-y-8">
          {currentView === 'daily' && <DailyAgenda appointments={appointments} />}
          {currentView === 'weekly' && <WeeklyView appointments={appointments} />}
          {currentView === 'monthly' && <MonthlyView appointments={appointments} />}
          <TaskList tasks={tasks} onToggleTask={handleToggleTask} onAddTask={handleAddTask} />
        </div>
        
        {/* Side Panels */}
        <div className="lg:col-span-1 space-y-8">
          <ShoppingList items={shoppingList} onToggleItem={handleToggleShoppingItem} onAddItem={handleAddShoppingItem} />
          <MealPlanner meals={meals} onAddMeal={handleAddMeal} />
          <GeminiAssistant meals={meals} tasks={tasks} />
        </div>
      </main>
      
      <footer className="text-center mt-12 text-slate-400 text-sm">
        <p>Built with React, Tailwind CSS, and the Google Gemini API.</p>
      </footer>
    </div>
  );
}

export default App;
