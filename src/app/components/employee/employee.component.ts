import { CurrencyPipe } from '@angular/common';
import {
  Component,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subscription } from 'rxjs';
import Employee from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { NewEmployeeComponent } from '../new-employee/new-employee.component';

@Component({
  selector: 'app-employee',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    CurrencyPipe,
  ],
  templateUrl: './employee.component.html',
})
export class EmployeeComponent implements OnInit, OnDestroy {
  dataSource!: Omit<Employee, 'id'>[];
  displayedColumns: string[];
  subscription: Subscription;
  employees: WritableSignal<Employee[]>;

  constructor(
    private readonly matDialog: MatDialog,
    private readonly empService: EmployeeService
  ) {
    this.displayedColumns = ['name', 'doj', 'role', 'salary', 'actions'];
    this.employees = signal([]);
    this.subscription = new Subscription();
  }

  ngOnInit() {
    this.subscription.add(
      this.empService.getAll().subscribe((employees) => {
        this.employees.set(employees);
        this.dataSource = this.employees();
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addEmployee() {
    this.showDialog();
  }

  editEmployee(employee: Employee) {
    this.showDialog(employee);
  }

  deleteEmployee(id: string) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.subscription.add(this.empService.delete(id.toString()).subscribe());
    }
  }

  showDialog(employee: Employee | null = null) {
    this.matDialog.open(NewEmployeeComponent, {
      width: '50%',
      enterAnimationDuration: '500ms',
      data: { employee },
    });
  }
}
