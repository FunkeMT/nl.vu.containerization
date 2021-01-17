import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'inventory-ui';

  books: any;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.sendGetRequest().subscribe((data: any) => {
      console.log(data.books);
      let booksArray = Object.keys(data.books).map(it => data.books[it])
      console.log(booksArray)
      this.books = booksArray;
    })  
  }
}
