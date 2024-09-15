export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  postCode: string;
  phone: string;
  hobbies: string[];
  url: string;
}

export interface Student extends User {
  role: "student";
  studyMinutes: number;
  taskCode: number;
  score: number;
  studyLangs: string[];
  mentorId: number;
}

export interface Mentor extends User {
  role: "mentor";
  experienceDays: number;
  useLangs: string[];
  availableStartCode: number;
  availableEndCode: number;
  incharge?: string[];
}
