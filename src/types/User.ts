export interface User {
  id: number;
  name: string;
  role: string;
  email: string;
  age: number;
  postCode: string;
  phone: string;
  hobbies: Array<string>;
  url: string;
}

export interface Student extends User {
  studyMinutes: number;
  taskCode: number;
  studyLangs: Array<string>;
  score: number;
}

export interface Mentor extends User {
  experienceDays: number;
  useLangs: Array<string>;
  availableStartCode: number;
  availableEndCode: number;
}
