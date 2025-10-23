import { Task, ShoppingListItem, Meal, Appointment } from '../types';

const today = new Date();
const setTime = (day: number, hour: number, minute: number) => {
    const date = new Date(today);
    date.setDate(day);
    date.setHours(hour, minute, 0, 0);
    return date;
};

const day = today.getDate();

export const useMockData = () => {
  const appointments: Appointment[] = [
    // Today's appointments
    { id: 'appt-1', title: 'Dentist Appointment', startTime: setTime(day, 10, 0), endTime: setTime(day, 11, 0) },
    { id: 'appt-2', title: 'Team Standup', startTime: setTime(day, 9, 0), endTime: setTime(day, 9, 15) },
    { id: 'appt-3', title: 'Lunch with Alex', startTime: setTime(day, 12, 30), endTime: setTime(day, 13, 30) },
    { id: 'appt-4', title: 'Pick up kids from school', startTime: setTime(day, 15, 30), endTime: setTime(day, 16, 0) },
    
    // Appointments earlier in the month
    { id: 'appt-5', title: 'Project Kickoff', startTime: setTime(day - 5, 11, 0), endTime: setTime(day-5, 12, 30) },
    { id: 'appt-6', title: 'Quarterly Review', startTime: setTime(day - 3, 14, 0), endTime: setTime(day-3, 15, 0) },

    // Appointments later in the month
    { id: 'appt-7', title: 'Yoga Class', startTime: setTime(day + 4, 18, 0), endTime: setTime(day+4, 19, 0) },
    { id: 'appt-8', title: 'Family Dinner', startTime: setTime(day + 6, 19, 30), endTime: setTime(day+6, 21, 0) },
  ];

  const tasks: Task[] = [
    { id: 'task-1', text: 'Review Q3 financial report', completed: false, category: 'professional' },
    { id: 'task-2', text: '30-minute morning walk', completed: true, category: 'personal' },
    { id: 'task-3', text: 'Call plumber about leaky faucet', completed: false, category: 'family' },
    { id: 'task-4', text: 'Read chapter 3 of theology book', completed: false, category: 'religious' },
    { id: 'task-5', text: 'Prepare presentation slides', completed: false, category: 'professional' },
  ];

  const shoppingList: ShoppingListItem[] = [
    { id: 'shop-1', name: 'Milk', checked: true },
    { id: 'shop-2', name: 'Bread', checked: false },
    { id: 'shop-3', name: 'Eggs', checked: true },
    { id: 'shop-4', name: 'Fresh Salmon', checked: false },
    { id: 'shop-5', name: 'Avocado', checked: false },
    { id: 'shop-6', name: 'Olive Oil', checked: true },
    { id: 'shop-7', name: 'Garlic', checked: false },
  ];

  const meals: Meal[] = [
    { id: 'meal-1', name: 'Grilled Salmon with Asparagus' },
    { id: 'meal-2', name: 'Pan-Seared Salmon with Lemon Dill Sauce' },
    { id: 'meal-3', name: 'Baked Salmon with Garlic and Herbs' },
    { id: 'meal-4', name: 'Spaghetti Bolognese' },
    { id: 'meal-5', name: 'Chicken Stir-Fry' },
    { id: 'meal-6', name: 'Tacos with homemade salsa' },
  ];

  return { tasks, shoppingList, meals, appointments };
};