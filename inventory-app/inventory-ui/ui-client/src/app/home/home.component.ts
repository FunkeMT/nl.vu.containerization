import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';

import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

export interface BookData {
  id: number;
  title: string;
  author: string;
  quantity: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  books: any[] = [];
  displayedColumns: string[] = ['book-id', 'title', 'author', 'quantity', 'action'];

  /**
   * Error ignored!!!
   * see: tsconfig.json -> "strictPropertyInitialization": false
   */
  @ViewChild('booksTable', {static:true}) booksMatTable: MatTable<any>;

  constructor(private dataService: DataService, public dialog: MatDialog) { }

  ngOnInit() {
    this.dataService.sendGetRequest().subscribe((data: any) => {
      console.log(data.books);
      let booksArray = Object.keys(data.books).map(it => data.books[it])
      this.books = booksArray;
    });
  }

  openDialog(action: string, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowData(result.data);
      } else if(result.event == 'Update'){
        this.updateRowData(result.data);
      } else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj: any) {
    console.log("AddRowData");

    let newBook = {
      "title": row_obj.title,
      "author": row_obj.author,
      "quantity": row_obj.quantitiy
    };

    this.dataService.sendPostCreateRequest(newBook).subscribe((data: any) => {
      let booksArray = Object.keys(data.books).map(it => data.books[it])
      this.books = booksArray;
    });

    this.booksMatTable.renderRows();
  }

  updateRowData(row_obj: any) {
    console.log('updateRowData');
    console.log(row_obj);

    let updateBook = {
      "book_id": row_obj.id,
      "title": row_obj.title,
      "author": row_obj.author,
      "quantity": row_obj.quantitiy
    };

    this.dataService.sendPostUpdateRequest(updateBook).subscribe((data: any) => {
      let booksArray = Object.keys(data.books).map(it => data.books[it])
      this.books = booksArray;
    });

    this.booksMatTable.renderRows();
  }

  deleteRowData(row_obj: BookData) {
    console.log('deleteRowData');
    console.log(row_obj);

    this.dataService.sendGetDeleteRequest(row_obj.id).subscribe((data: any) => {
      let booksArray = Object.keys(data.books).map(it => data.books[it])
      this.books = booksArray;
    });

    this.booksMatTable.renderRows();
  }

}
