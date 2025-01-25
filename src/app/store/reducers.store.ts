import { createReducer, on } from '@ngrx/store';
import appState from './state.store';
import employeeActions from './actions.store';

const { employeeState } = appState;

const employeeReducer = createReducer(
  employeeState,
  on(
    employeeActions.getEmployeesSuccess,
    (state, { employees: employeeList }) => ({
      ...state,
      employeeList,
      error: '',
    })
  ),
  on(employeeActions.getEmployeesFailure, (state, { error }) => ({
    ...state,
    employeeList: [],
    error: error.message,
  })),
  on(employeeActions.deleteEmployeeSuccess, (state, { id }) => ({
    ...state,
    employeeList: state.employeeList.filter((emp) => emp.id !== id),
    error: '',
  })),
  on(employeeActions.createEmployeesSuccess, (state, { employee }) => ({
    ...state,
    employeeList: [...state.employeeList, employee],
    error: '',
  })),
  on(employeeActions.updateEmployeesSuccess, (state, { employee }) => ({
    ...state,
    employeeList: state.employeeList.map((emp) =>
      emp.id === employee.id ? employee : emp
    ),
    error: '',
  }))
);

export default employeeReducer;
