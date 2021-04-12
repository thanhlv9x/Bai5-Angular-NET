import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { EmployeeService } from '../../../services/employee.service';
import { Employee } from "../../../models/employee.class";
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-remove.dialog',
  templateUrl: './remove-dialog.component.html',
  styleUrls: ['./remove-dialog.component.css']
})
export class RemoveDialogComponent {
    confirmBtn = false;
    date = new FormControl(this.data.dob);
    constructor(public dialogRef: MatDialogRef<RemoveDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Employee,
        public dataService: EmployeeService, public dialog: MatDialog) { }

    onCancel(): void {
        this.dialogRef.close();
    }

    onConfirm(): void {
        this.confirmBtn = true;
        // var result = this.dataService.delete(this.data.id ?? -1);
        this.dataService.deleteApi(this.data.id ?? -1).subscribe(result => {
            this.dialog.open(AlertComponent, {
                data: { message: "Xóa " + (result ? "thành công" : "không thành công") }
            });
            if (result) {
                this.dialogRef.close(this.data.id);
            }
        });
    }
}
