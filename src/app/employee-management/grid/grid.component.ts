import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Employee } from '../../models/employee.class';
import { EmployeeService } from "../../services/employee.service";
import { AddDialogComponent } from "../dialog/add/add-dialog.component";
import { EditDialogComponent } from "../dialog/edit/edit-dialog.component";
import { RemoveDialogComponent } from "../dialog/remove/remove-dialog.component";
import { MatTableDataSource } from '@angular/material/table';
import { MatHeaderRowDef } from '@angular/material/table';
import { MatRowDef } from '@angular/material/table';

@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.css'],
})
export class GridComponent {
    private _data: Employee[];
    private _dataSource: any;
    public get dataSource(): any {
        return this._dataSource;
    }
    public set dataSource(v: any) {
        this._dataSource = v;
    }

    private _displayedColumns: string[];
    public get displayedColumns(): string[] {
        return this._displayedColumns;
    }
    public set displayedColumns(v: string[]) {
        this._displayedColumns = v;
    }

    private _service: EmployeeService;

    constructor(private service: EmployeeService, public dialog: MatDialog) {
        this._service = service;
        this._displayedColumns = service.getKeys();
        if (!this._displayedColumns.includes("actions"))
            this._displayedColumns.push("actions");
        // this._dataSource = new MatTableDataSource(service.read());
        this.getAll();
    }

    getAll() {
        this._service.readApi().subscribe((res: Employee[]) => {
            this._data = res;
            this._dataSource = new MatTableDataSource(this._data);
        })
    }

    onAdd(): void {
        const dialogRef = this.dialog.open(AddDialogComponent, {
            width: "500px",
            height: "700px",
            maxHeight: "700px",
            data: new Employee()
        });

        dialogRef.afterClosed().subscribe(result => {
            // this.dataSource = new MatTableDataSource(this._service.read());
            this.getAll();
        });
    }

    onEdit(i: number, data: Employee) {
        console.log(data);
        const dialogRef = this.dialog.open(EditDialogComponent, {
            width: "500px",
            height: "700px",
            maxHeight: "700px",
            data: data
        });

        dialogRef.afterClosed().subscribe(result => {
            // this.dataSource = new MatTableDataSource(this._service.read());
            this.getAll();
        });
    }
    onRemove(data: Employee) {
        const dialogRef = this.dialog.open(RemoveDialogComponent, {
            width: "500px",
            data: data
        });

        dialogRef.afterClosed().subscribe(result => {
            // this.dataSource = new MatTableDataSource(this._service.read());
            this.getAll();
        });
    }
}
