import { createActionGroup, emptyProps, props } from '@ngrx/store';
import Employee from '../models/employee.model';

const employeeActions = createActionGroup({
  source: 'Employee',
  events: {
    'Get Employees': emptyProps(),
    'Get Employees Success': props<{ employees: Employee[] }>(),
    'Get Employees Failure': props<{ error: any }>(),
    'Delete Employee': props<{ id: string }>(),
    'Delete Employee Success': props<{ id: string }>(),
    'Create Employee': props<{ employee: Employee }>(),
    'Create Employees Success': props<{ employee: Employee }>(),
    'Update Employee': props<{ employee: Employee }>(),
    'Update Employees Success': props<{ employee: Employee }>(),
    'Empty Action': emptyProps(),
  },
});

export default employeeActions;
