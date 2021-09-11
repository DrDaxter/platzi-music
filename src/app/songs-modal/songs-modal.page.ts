import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-songs-modal',
  templateUrl: './songs-modal.page.html',
  styleUrls: ['./songs-modal.page.scss'],
})
export class SongsModalPage implements OnInit {
  @Input() songs: any[];
  //artist: string = '';
  @Input() artist;
  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    //this.songs = this.navParams.data.songs;
    //this.artist = this.navParams.data.arist;
    //console.log(this.artist);
  }

  async selectSong(song){
    await this.modalController.dismiss(song);
  }
}
