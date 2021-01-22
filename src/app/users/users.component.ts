import {Component, OnInit, ViewChild} from '@angular/core';
import {DataServiceService} from '../services/data-service.service';
import {element} from 'protractor';
import {Users} from '../models/user.model';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {log} from 'util';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(
    private dataService: DataServiceService
  ) { }
  displayedColumns: string[] = ['id', 'username', 'name', 'lastname', 'isActive', 'lastLogin', 'isSuperuser'];

  dataSource = new MatTableDataSource();
  data;

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.dataService.getUsers().then(value => {
      console.log(value);
      // tslint:disable-next-line:no-shadowed-variable
      this.dataSource = new MatTableDataSource(value.map(element => {
        return new Users(element);
      }));
      this.dataSource.sort = this.sort;
      this.data = this.dataSource.data;
    });
  }

  applyFilter(event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.data = this.data.filter(value => {
      return value.username.includes(filterValue);
    });
  }

}
