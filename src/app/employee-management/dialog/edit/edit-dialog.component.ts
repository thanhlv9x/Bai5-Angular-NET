import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from '../../../services/employee.service';
import { Employee } from "../../../models/employee.class";
import { AlertComponent } from '../alert/alert.component';
import { isValidDate, isValidName, isValidCode, isValidEmail } from '../../../models/validators';

@Component({
    selector: 'app-edit.dialog',
    templateUrl: './edit-dialog.component.html',
    styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent {
    confirmBtn = false;
    formBuilder = new FormBuilder();
    formGroup: FormGroup;
    firstError?: string;
    data: Employee = new Employee();
    constructor(public dialogRef: MatDialogRef<EditDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public dataEdit: Employee,
        public dataService: EmployeeService, public dialog: MatDialog) {
        this.data = { ...dataEdit };
        this.formGroup = this.formBuilder.group({
            'name': new FormControl(this.data.name, [Validators.required, isValidName]),
            'code': new FormControl(this.data.code, [Validators.required, isValidCode]),
            'email': new FormControl(this.data.code, [Validators.required, isValidEmail]),
            'date': new FormControl(this.data.dob, [Validators.required, isValidDate]),
        });
    }

    onCancel(): void {
        this.dialogRef.close();
    }

    onConfirm(): void {
        this.confirmBtn = true;
        if (!this.onValidate()) {
            this.confirmBtn = false;
            return;
        }
        if (!this.data.image) {
            this.confirmBtn = false;
            return;
        }
        if (this.formGroup.status !== "INVALID") {
            let imgTag: any = document.getElementById('imageUpload');
            this.data.image = imgTag.src;
            // var result = this.dataService.update(this.data);
            this.dataService.updateApi(this.data).subscribe(employee => {
                this.dialog.open(AlertComponent, {
                    data: { message: "Cập nhật " + (employee ? "thành công" : "không thành công") }
                });
                if (employee) {
                    this.dialogRef.close(employee);
                }
            });
        } else {
            this.dialog.open(AlertComponent, {
                data: { message: "Dữ liệu không hợp lệ !" }
            });
            this.confirmBtn = false;
        }
    }

    onUpload(event: any): void {
        this.readURL(event.target, this.data);
    }

    onClear(): void {
        let inputImage: any = document.getElementById('inputImage');
        let imgTag: any = document.getElementById('imageUpload');
        inputImage.value = null;
        imgTag.src = "";
        this.data.image = "";
    }

    onValidate(): boolean {
        const props = Object.keys(this.formGroup.value);
        this.firstError = "";
        props.forEach((prop) => {
            if (!this.firstError && this.formGroup.get(prop)?.errors) {
                this.firstError = prop;
            }
        })
        return !this.firstError;
    }

    readURL(input: any, data: any) {
        if (input.files && input.files[0] && input.files[0].type.includes('image/')) {
            var reader = new FileReader();

            reader.onload = function (e) {
                data.image = e.target?.result;
                let imgTag: any = document.getElementById('imageUpload');
                imgTag.src = e.target?.result;
            }

            reader.readAsDataURL(input.files[0]);
        } else {            
            this.onClear();
        }
    }
}
