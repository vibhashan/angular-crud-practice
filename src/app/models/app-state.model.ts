import Employee from './employee.model';

interface EmployeeState {
  employeeList: Employee[];
  error: string;
}

interface AppState {
  employeeState: EmployeeState;
}

export type { AppState, EmployeeState };
