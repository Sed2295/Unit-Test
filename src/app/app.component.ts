import { Component, OnInit } from '@angular/core';
import { User } from './model/user.interface';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'IntroPruebasUnitarias';
  myVar:string = 'Hola Mundo';
  saludo:string = 'Buenos dias Alfredo';
  users:User[] = [];

  constructor(private _userService:UserService){}

  ngOnInit(){
    this.getUsers();
  }

  par(numero:number):boolean {
    return numero%2===0 ? true : false;
  }
  getUsers() {
    this._userService.getAll().subscribe(users => {
      this.users = users
      console.log(this.users);
    })
  }
}
