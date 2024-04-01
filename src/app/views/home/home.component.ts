import { Component, ViewChild } from '@angular/core';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { ElementDialogComponent } from '../../shared/element-dialog/element-dialog.component';
import { MatDialog } from '@angular/material/dialog';

export interface PeriodicElement {
  name: string;
  position: number;
  price: number | string;
  validity: string | Date | number;
  perishable: boolean | string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Caderno', price: `R$ ${55.99}`, validity: new Date(2025, 5, 15).toLocaleDateString('pt-BR'),
    perishable:`${false}`
  },
  { position: 2, name: 'Lápis', price: `R$ ${4.99}`, validity: new Date(2025, 2, 17).toLocaleDateString('pt-BR'),
    perishable:`${false}`
  },
  { position: 3, name: 'Biscoito', price: `R$ ${6.99}`, validity: new Date(2024, 8, 6).toLocaleDateString('pt-BR'),
    perishable:`${true}`
  },
  { position: 4, name: 'Pão', price: `R$ ${5.59}`, validity: new Date(2024, 4, 5).toLocaleDateString('pt-BR'),
    perishable:`${true}`
  },
  { position: 5, name: 'Bacon', price: `R$ ${10.89}`, validity: new Date(2024, 7, 19).toLocaleDateString('pt-BR'),
    perishable:`${true}`
  },
  { position: 6, name: 'Lasanha', price: `R$ ${20.99}`, validity: new Date(2024, 9, 24).toLocaleDateString('pt-BR'),
    perishable:`${true}`
  },
  { position: 7, name: 'Panela', price: `R$ ${49.99}`, validity: new Date(2025, 1, 30).toLocaleDateString('pt-BR'),
    perishable:`${false}`
  },
  { position: 8, name: 'Mesa', price: `R$ ${199.99}`, validity: new Date(2025, 12, 25).toLocaleDateString('pt-BR'),
    perishable:`${false}`
  },
  { position: 9, name: 'Celular', price: `R$ ${2199.99}`, validity: new Date(2025, 11, 22).toLocaleDateString('pt-BR'),
    perishable:`${false}`
  },
  { position: 10, name: 'Macarrão', price: `R$ ${5.99}`, validity: new Date(2024, 10, 5).toLocaleDateString('pt-BR'),
    perishable: `${false}`
 },
];
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['position', 'name', 'price', 'validity','perishable','actions'];
  dataSource = ELEMENT_DATA;

  constructor(public dialog: MatDialog) { }

  openDialog(element: PeriodicElement | null): void {
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: "300px",
      data: element === null ? {
        position: null,
        name: "",
        price: "",
        validity: "",
        perishable: "?",
      } : {
        position: element.position,
        name: element.name,
        price: element.price,
        validity: element.validity,
        perishable: element.perishable,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (this.dataSource.map(p => p.position).includes(result.position)) {
          this.dataSource[result.position - 1] = result;
          this.table.renderRows()
        } else {
          this.dataSource.push(result);
          this.table.renderRows()
        }

      }
    });
  }
  editElement(element: PeriodicElement): void {
    this.openDialog(element);
  }

  deleteElement(position: number): void {
    this.dataSource = this.dataSource.filter(p => p.position !== position)
  }

}






