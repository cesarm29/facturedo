import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import {CommonModule} from "@angular/common";
// cache cookie
import Cookies from 'js-cookie';
//service
import { HomeService } from '../services/home.service';

import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  id: String;
  email: String;
  percentage: Number;
  responseAuctionsList: any = [];
  responseOperationsList: any = [];
  responseList: any = [];

  constructor(private menu: MenuController, private formBuilder: FormBuilder, private router: Router,  public homeService: HomeService) {
    this.email = Cookies.get('email');
    if (this.email == undefined) {
      //redirect to login
      this.router.navigate(['/login'])
    }
    this.getAuctions();
  }
  

  ngOnInit() {
    
  }

  homeRedirect() {
    this.menu.close();
    //redirect to login
    this.router.navigate(['/home']);
  }

  openStart() {
    this.menu.open();
    }

  openEnd() {
    this.menu.close();
    //remove cookies
    Cookies.remove('token');
    Cookies.remove('email');
    //redirect to login
    this.router.navigate(['/login']);
    }


  getAuctions() {
    this.homeService.getAuctions().then(res => {
      //response change to array
      this.responseAuctionsList = res;
      //iterate for operations
      for (let i = 0; i < this.responseAuctionsList.results.length; i++) {
        const operation = this.responseAuctionsList.results[i].operation;
        //service get operations for id
        this.homeService.getOperations(operation).then(res => {
          //populate list response operations
          this.responseOperationsList = res;
          //validation percentage > 100
          if(this.responseAuctionsList.results[i].percentage_completed > 1){
            this.percentage = 1;
          }else{
            this.percentage = this.responseAuctionsList.results[i].percentage_completed
          }
          //join the information in one array
          this.responseList.push({ 
            operation: this.responseAuctionsList.results[i].operation,
            percentage_completed: this.percentage,
            end_date: this.responseAuctionsList.results[i].end_date,
            debtor_entity_name: this.responseOperationsList.debtor_entity_name,
            amount: this.responseOperationsList.amount,
            cost_time_priority: this.responseOperationsList.cost_time_priority,
            payment_date: this.responseOperationsList.payment_date
          }); 

        },
          err => console.log(err)
        );
      }
    },
      err => console.log(err)
    );

    //response
    console.log(this.responseList);
  }
}
