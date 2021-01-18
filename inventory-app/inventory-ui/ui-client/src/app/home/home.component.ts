import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  books: any;
  displayedColumns = ['book-id', 'title', 'author', 'quantity'];

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
