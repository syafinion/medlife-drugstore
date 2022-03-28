import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.page.html',
  styleUrls: ['./receipt.page.scss'],
})
export class ReceiptPage implements OnInit {

  @Input() order;
  content: string;


  constructor(private modalCtrl: ModalController,
    private pdfGenerator: PDFGenerator,
    private navCtrl: NavController) { }

  ngOnInit() {
    console.log('Invoice', this.order);
  }


  close(){
    this.modalCtrl.dismiss();
  }


  downloadInvoice(){
    this.content = document.getElementById('PrintInvoice').innerHTML;

    let options = {
      documentSize: 'A4',
      type: 'share',
      // landscape: 'portrait',
      fileName: 'MedLife.pdf'
    };

    this.pdfGenerator.fromData(this.content, options)
      .then((base64) => {
        console.log('OK', base64);
      }).catch((error) => {
        console.log('error', error);
      });
  }
}
