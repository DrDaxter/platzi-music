import { Injectable } from '@angular/core';
import * as dataArtist from '../artists.json';

@Injectable({
  providedIn: 'root'
})
export class PlatziMusicService {

  constructor() { }

  getArtists(){
    return dataArtist.items;
  }

  getNewReleases(){
    return fetch('https://platzi-music-api.herokuapp.com/browse/new-releases').then(
      response => response.json()  
    )
  }

  getArtistTopTracks(artistId){
    return fetch(`https://platzi-music-api.herokuapp.com/artists/${artistId}/top-tracks?country=CO`).then(
      response=> response.json()
      );
  }

  getAlbumsTrack(albumId){
    return fetch(`https://platzi-music-api.herokuapp.com/albums/${albumId}/tracks?country=CO`).then(
      response => response.json()
    );
  }
}
