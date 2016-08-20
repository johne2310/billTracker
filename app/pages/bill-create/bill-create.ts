import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

/*
  Generated class for the BillCreatePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/bill-create/bill-create.html',
})
export class BillCreatePage {

  billList: FirebaseListObservable<any>;
  dueDate: String = new Date().toISOString();

  

  constructor(private navCtrl: NavController, public af: AngularFire) {
    this.billList = af.database.list('/bills');
  }

  createBill(name, amount, dueDate) {
    this.billList.push({
      name: name,
      amount: amount,
      dueDate: dueDate,
      paid: false
    })
      .then(newBill => {
        this.navCtrl.pop();
      }, error => {
        console.log('Error: ', error);
      });
  }
}

