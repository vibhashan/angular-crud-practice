import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Employee from '../models/employee.model';
import { map, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private readonly apiUrl = 'http://localhost:5000/employees';

  constructor(private readonly httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get<Employee[]>(this.apiUrl);
  }

  get(id: string) {
    return this.httpClient.get<Employee>(`${this.apiUrl}/${id}`);
  }

  add(employee: Employee) {
    return this.httpClient.post(this.apiUrl, employee);
  }

  update(employee: Employee) {
    return this.httpClient.put(`${this.apiUrl}/${employee.id}`, employee);
  }

  delete(id: string) {
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }
}
