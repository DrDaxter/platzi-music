import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlbumsModalPage } from '../albums-modal/albums-modal.page';
import { PlatziMusicService } from '../services/music/platzi-music.service';
import { SongsModalPage } from '../songs-modal/songs-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  songs: any[] = [];
  albums: any[] = [];
  artists:any[] = [];
  currentSong:any = {};
  playing = true;
  newTime;
  song: {
    playing:boolean;
    name: string;
    preview_url: string;
  } = {
    playing:true,
    name: '',
    preview_url: '',
  };
  slideOpts = {
    initialSlide: 2,
    slidesPerView: 4,
    centeredSlides: true,
    speed: 400,
  };
  constructor(
    private musicService: PlatziMusicService,
    private modal: ModalController,
  ) {}

  ionViewDidEnter() {
    this.musicService.getNewReleases().then(releases => {
      this.artists = this.musicService.getArtists();
      console.log(this.artists);
      this.songs = releases.albums.items.filter(e => e.album_type == "single");
      this.albums = releases.albums.items.filter(e => e.album_type == "album");
      //console.log(this.albums);
    });
  }

  async showSong(artist){
    console.log(artist.name);
    const songs = await this.musicService.getArtistTopTracks(artist.id);
    const modal = await this.modal.create({
      component: SongsModalPage,
      componentProps:{
        songs: songs.tracks,
        artist: artist.name,
      }
    });

    modal.onDidDismiss().then(res => {
      this.song = res.data;
      console.log(this.song);
    });
    return await modal.present();
  }

  async showAlbum(album){
    console.log(album);
    const albums = await this.musicService.getAlbumsTrack(album.id);
    const modal = await this.modal.create({
      component: AlbumsModalPage,
      componentProps:{
        albums: albums,
        albumName: album.name
      }
    });
    modal.onDidDismiss().then(res => {
      this.song = res.data;
    });
    return await modal.present();
  }

  play(){
    this.currentSong = new Audio(this.song.preview_url);
    this.currentSong.play();
    this.currentSong.addEventListener('timeupdate', () => {
      this.newTime = (this.currentSong.currentTime / this.currentSong.duration);
    });
    this.playing = false;
  }

  pause(){
    this.currentSong.pause();
    this.playing = true;
  }

  parseTime(newTime = "0.00"){
    if (newTime) {
      const partTime = parseInt(newTime.toString().split(".")[0],10);
      let minutes = Math.floor(partTime/60).toString();
      if (minutes.length == 1) {
        minutes = "0" + minutes;
      }

      let seconds = (partTime % 60).toString();
      if (seconds.length == 1) {
        seconds = "0" + seconds;
      }

      return minutes + ":" + seconds;
    }
  }
}
