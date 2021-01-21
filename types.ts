export interface User {
  id: number;
  uuid: string;
  name: string;
  email: string;
  role?: string;
  dept?: any;
  deptId?: number;
  school?: any;
  schoolId: number;
  notesheets?: [Notesheet];
  notesheetsIn?: [Notesheet];
}

export interface Notesheet {
  id: number;
  uuid: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  financial: boolean;
  startedBy: User;
  currentUser?: User[] | any;
  userId?: number;
}

export interface State {
  user: User | undefined;
  authenticated: boolean;
  loading: boolean;
}

export interface Dept {}

export interface School {}
