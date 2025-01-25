import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import Employee from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { Store } from '@ngrx/store';
import employeeActions from '../../store/actions.store';

@Component({
  selector: 'app-new-employee',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    MatIconModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './new-employee.component.html',
  styles: ``,
})
export class NewEmployeeComponent implements OnInit, OnDestroy {
  title: string;
  formGroup: FormGroup;
  subscription: Subscription;

  constructor(
    private readonly matDialogRef: MatDialogRef<NewEmployeeComponent>,
    private readonly empService: EmployeeService,
    private readonly toasterService: ToastrService,
    @Inject(MAT_DIALOG_DATA) private readonly matDialogData: any,
    private readonly store: Store
  ) {
    this.title = this.matDialogData.employee ? 'Edit Employee' : 'New Employee';
    this.formGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      doj: new FormControl(new Date(), Validators.required),
      role: new FormControl('', Validators.required),
      salary: new FormControl(0, Validators.required),
    });

    this.subscription = new Subscription();
  }

  ngOnInit() {
    if (this.matDialogData.employee) {
      const { name, doj, role, salary } = this.matDialogData.employee;
      this.formGroup.setValue({ name, doj, role, salary });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  save() {
    if (this.formGroup.valid) {
      const employee: Employee = this.formGroup.value;

      this.subscription.add(
        this.empService.getAll().subscribe((employees) => {
          const lastId =
            employees.length > 0 ? employees[employees.length - 1].id : '0';

          if (this.matDialogData) {
            this.store.dispatch(
              employeeActions.updateEmployee({
                employee: {
                  ...employee,
                  id: this.matDialogData.employee.id,
                },
              })
            );
            this.closeDialog();
          } else {
            this.store.dispatch(
              employeeActions.createEmployee({
                employee: {
                  ...employee,
                  id: (Number(lastId) + 1).toString(),
                },
              })
            );
            this.closeDialog();
          }
        })
      );
    } else {
      this.formGroup.setErrors({ invalid: true });
    }
  }

  closeDialog() {
    this.ngOnDestroy();
    this.matDialogRef.close();
  }
}
