import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-albums-modal',
  templateUrl: './albums-modal.page.html',
  styleUrls: ['./albums-modal.page.scss'],
})
export class AlbumsModalPage implements OnInit {
  @Input() albums;
  @Input() albumName;
  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    console.log(this.albums.items);
  }

  showItem(item){
    if (item.preview_url != null) {
      console.log(item);
      this.modalController.dismiss(item);
    }else{
      console.log(item);
      this.messages("Error","Parece que esta canción no tiene un preview");
    }
  }

  async messages(header,message){
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    return await alert.present();
  }

  goBack(){
    this.modalController.dismiss("");
  }
}
