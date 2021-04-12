import { Employee, Keys } from '../models/employee.class';
import { Injectable } from '@angular/core';

const Employees: Employee[] = [
    {
        id: 1,
        name: 'Hydrogen',
        code: 'H',
        address: 'demo trainning',
        dob: new Date(),
        email: 'abc@gmail.com',
        image: 'image.png',
    },
    {
        id: 2,
        name: 'Helium',
        code: 'He',
        address: 'demo trainning',
        dob: new Date(),
        email: 'abc@gmail.com',
        image: 'image.png',
    },
    {
        id: 3,
        name: 'Lithium',
        code: 'Li',
        address: 'demo trainning',
        dob: new Date(),
        email: 'abc@gmail.com',
        image: 'image.png',
    },
    {
        id: 4,
        name: 'Beryllium',
        code: 'Be',
        address: 'demo trainning',
        dob: new Date(),
        email: 'abc@gmail.com',
        image: 'image.png',
    },
    {
        id: 5,
        name: 'Boron',
        code: 'B',
        address: 'demo trainning',
        dob: new Date(),
        email: 'abc@gmail.com',
        image: 'image.png',
    },
    {
        id: 6,
        name: 'Carbon',
        code: 'C',
        address: 'demo trainning',
        dob: new Date(),
        email: 'abc@gmail.com',
        image: 'image.png',
    },
    {
        id: 7,
        name: 'Nitrogen',
        code: 'N',
        address: 'demo trainning',
        dob: new Date(),
        email: 'abc@gmail.com',
        image: 'image.png',
    },
    {
        id: 8,
        name: 'Oxygen',
        code: 'O',
        address: 'demo trainning',
        dob: new Date(),
        email: 'abc@gmail.com',
        image: 'image.png',
    },
    {
        id: 9,
        name: 'Fluorine',
        code: 'F',
        address: 'demo trainning',
        dob: new Date(),
        email: 'abc@gmail.com',
        image: 'image.png',
    },
    {
        id: 10,
        name: 'Neon',
        code: 'Ne',
        address: 'demo trainning',
        dob: new Date(),
        email: 'abc@gmail.com',
        image: 'image.png',
    },
];

export class EmployeeRepository {
    private static _instance: EmployeeRepository;
    public static get instance(): EmployeeRepository {
        if (this._instance) return this._instance;
        this._instance = new EmployeeRepository();
        return this._instance;
    }

    private _data: Employee[];

    constructor() {
        this._data = Employees;
    }

    read(): Employee[] {
        return this._data;
    }

    create(model: Employee): boolean {
        if (model === null) return false;
        let listId: number[] = this._data.map((item) => (item.id ?? 1));
        let id: number = Math.max(...listId) < 1 ? 1 : Math.max(...listId) + 1;
        model.id = id;
        this._data.push(model);
        return true;
    }

    update(model: Employee): boolean {
        var index = this._data.findIndex((item) => item.id === model.id);
        if (index === -1) return false;
        this._data[index] = model;
        return true;
    }

    delete(id: number): boolean {
        var index = this._data.findIndex((item) => item.id === id);
        if (index === -1) return false;
        this._data.splice(index, 1);
        return true;
    }

    getKeys(): string[] {
        return Keys;
    }
}
