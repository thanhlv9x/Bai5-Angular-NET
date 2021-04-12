import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { EmployeeRepository } from '../repositories/employee.repository';
import { Employee } from '../models/employee.class';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'Application/json' })
}
const rootUrl = 'https://localhost:5001';

@Injectable({
    providedIn: 'root',
})
export class EmployeeService {
    constructor(private httpClient: HttpClient) { }

    read(): Employee[] {
        return EmployeeRepository.instance.read();
    }

    readApi(): Observable<Employee[]> {
        const apiUrl = rootUrl + "/api/employee";
        return this.httpClient.get<Employee[]>(apiUrl).pipe();
    }

    update(model: Employee): boolean {
        return EmployeeRepository.instance.update(model);
    }

    updateApi(model: Employee): Observable<Employee> {
        const apiUrl = rootUrl + "/api/employee/" + model.id;
        return this.httpClient.put<Employee>(apiUrl, model, httpOptions).pipe();
    }

    create(model: Employee): boolean {
        return EmployeeRepository.instance.create(model);
    }

    createApi(model: Employee): Observable<Employee> {
        const apiUrl = rootUrl + "/api/employee";
        return this.httpClient.post<Employee>(apiUrl, model, httpOptions).pipe();
    }

    delete(id: number): boolean {
        return EmployeeRepository.instance.delete(id);
    }

    deleteApi(id: number): Observable<{}> {
        const apiUrl = rootUrl + "/api/employee/" + id;
        return this.httpClient.delete(apiUrl, httpOptions).pipe();
    }

    getKeys(): string[] {
        return EmployeeRepository.instance.getKeys();
    }
}
