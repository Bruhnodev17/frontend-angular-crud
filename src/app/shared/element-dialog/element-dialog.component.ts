import {Component, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { PeriodicElement } from '../../views/home/home.component';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormsModule, NgModel } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-element-dialog',
  standalone: true,
  imports: [
    MatFormField, MatDialogContent, MatLabel,
     MatDialogActions, MatDialogClose, MatInputModule, FormsModule, CommonModule],
  templateUrl: './element-dialog.component.html',
  styleUrl: './element-dialog.component.scss'
})
export class ElementDialogComponent implements OnInit {

  element!: PeriodicElement;
  isChange!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: PeriodicElement,
    public dialogRef: MatDialogRef<ElementDialogComponent>,
  ) {}

  ngOnInit(): void{
    if(this.data.position != null){
      this.isChange = true
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}



