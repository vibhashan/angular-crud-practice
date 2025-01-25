import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { EmployeeService } from '../services/employee.service';
import employeeActions from './actions.store';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class EmployeeEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly employeeService: EmployeeService,
    private readonly toasterService: ToastrService
  ) {}

  private readonly getEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeeActions.getEmployees),
      exhaustMap(() => {
        return this.employeeService.getAll().pipe(
          map((employees) =>
            employeeActions.getEmployeesSuccess({ employees })
          ),
          catchError((error) =>
            of(employeeActions.getEmployeesFailure({ error }))
          )
        );
      })
    )
  );

  private readonly deleteEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeeActions.deleteEmployee),
      switchMap(({ id }) => {
        return this.employeeService.delete(id).pipe(
          switchMap(() =>
            of(
              employeeActions.deleteEmployeeSuccess({ id }),
              this.showAlert('Employee deleted successfully', 'pass')
            )
          ),
          catchError((error) => of(this.showAlert(error.message, 'fail')))
        );
      })
    )
  );

  private readonly createEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeeActions.createEmployee),
      switchMap(({ employee }) => {
        return this.employeeService.add(employee).pipe(
          switchMap(() =>
            of(
              employeeActions.createEmployeesSuccess({ employee }),
              this.showAlert('Employee added successfully', 'pass')
            )
          ),
          catchError((error) => of(this.showAlert(error.message, 'fail')))
        );
      })
    )
  );

  private readonly updateEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeeActions.updateEmployee),
      switchMap(({ employee }) => {
        return this.employeeService.update(employee).pipe(
          switchMap(() =>
            of(
              employeeActions.updateEmployeesSuccess({ employee }),
              this.showAlert('Employee updated successfully', 'pass')
            )
          ),
          catchError((error) => of(this.showAlert(error.message, 'fail')))
        );
      })
    )
  );

  private showAlert(message: string, response: string) {
    if (response === 'pass') {
      this.toasterService.success(message);
    } else {
      this.toasterService.error(message);
    }

    return employeeActions.emptyAction();
  }
}
