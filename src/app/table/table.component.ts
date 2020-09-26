import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  url = 'https://jsonplaceholder.typicode.com/users';
  users: any[] = [];
  name_value: string;
  email_value: string;
  address_value: string;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http
      .get<any[]>(this.url)
      .subscribe(response => response.forEach(value => {
        this.users.push(value)
      }))
  }

  onClickAddress(user) {
    this.users.forEach(userFromList => {
      if (userFromList['id'] == user['id']) {
        alert(user['address']['geo']['lat'] + ' ' + user['address']['geo']['lng'])
      }
    })
  }

  checkValue(value) {
    return value !== null && value != undefined && value.length > 0;
  }

  getFilteredUsers(nameValue, emailValue, addressValue) {
    if (this.checkValue(nameValue)) {
      return this.getFilteredUsersByName(nameValue);
    } else if (this.checkValue(emailValue)) {
      return this.getFilteredUsersByEmail(emailValue);
    } else if (this.checkValue(addressValue)) {
      return this.getFilteredUsersByAddress(addressValue);
    } else {
      console.log('oh no')
      return this.users;
    }
  }

  getFilteredUsersByName(nameValue) {
    let result: any[] = [];
    if (nameValue === null || nameValue == undefined) {
      return this.users;
    } else {
      this.users.forEach(userFromList => {
        if (nameValue == userFromList['name'].substring(0, nameValue.length)) {
          result.push(userFromList);
        }
      })
    }
    return result;
  }

  getFilteredUsersByEmail(emailValue) {
    let result: any[] = [];
    if (emailValue === null || emailValue == undefined) {
      return this.users;
    } else {
      this.users.forEach(userFromList => {
        if (emailValue == userFromList['email'].substring(0, emailValue.length)) {
          result.push(userFromList);
        }
      })
    }
    return result;
  }

  getFilteredUsersByAddress(addressValue) {
    let result: any[] = [];
    if (addressValue === null || addressValue == undefined) {
      return this.users;
    } else {
      this.users.forEach(userFromList => {
        if (addressValue == userFromList['address']['zipcode'].substring(0, addressValue.length)) {
          result.push(userFromList);
        }
      })
    }
    return result;
  }
}
