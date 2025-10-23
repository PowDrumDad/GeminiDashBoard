
export interface Task {
  id: string;
  text: string;
  completed: boolean;
  category: 'personal' | 'family' | 'professional' | 'religious';
}

export interface ShoppingListItem {
  id: string;
  name: string;
  checked: boolean;
}

export interface Meal {
  id: string;
  name: string;
  description?: string;
}

export interface Appointment {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
}
