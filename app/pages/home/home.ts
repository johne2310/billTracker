import {Component} from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { DateFormatPipe } from 'angular2-moment';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { BillCreatePage } from '../bill-create/bill-create';

@Component({
  templateUrl: 'build/pages/home/home.html',
  pipes: [DateFormatPipe]
})
export class HomePage {

  billList: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, public af: AngularFire) {
    this.billList = af.database.list('/bills');

  }

  newBill() {
    this.navCtrl.push(BillCreatePage);
  }

  promptPayment(billId: string) {
    let alert = this.alertCtrl.create({
      message: 'Mark as paid?',
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Mark as paid',
          handler: data => {
            this.billList.update(billId, { paid: true });
          }
        }
      ]
    });
    alert.present();
  }

}
