import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EmployeeState } from '../models/app-state.model';

const employeeState = createFeatureSelector<EmployeeState>('Employee State'); // Same alias as specified in app.config.ts file.

const employeeListSelector = createSelector(
  employeeState,
  (state) => state.employeeList
);

export default employeeListSelector;
