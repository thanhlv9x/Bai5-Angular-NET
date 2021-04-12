import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { EmployeeManagementRoutingModule } from './employee-management-routing.module';

import { GridComponent } from './grid/grid.component';
import { AddDialogComponent } from './dialog/add/add-dialog.component';
import { EditDialogComponent } from './dialog/edit/edit-dialog.component';
import { RemoveDialogComponent } from './dialog/remove/remove-dialog.component';
import { AlertComponent } from './dialog/alert/alert.component';
import { EmployeeService } from 'app/services/employee.service';

@NgModule({
    declarations: [
        GridComponent,
        AddDialogComponent,
        EditDialogComponent,
        RemoveDialogComponent,
        AlertComponent
    ],
    imports: [
        CommonModule,
        EmployeeManagementRoutingModule,
        MatTableModule,
        MatInputModule,
        FormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatDatepickerModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        MatCardModule,
        MatButtonModule
    ],
    providers: [EmployeeService],
    bootstrap: [GridComponent]
})
export class EmployeeManagementModule { }
