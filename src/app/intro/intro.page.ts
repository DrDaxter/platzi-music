import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  slideOps = {
    initialSlide: 0,
    slidesPerView: 1,
    centeredSlides: true,
    speed: 400
  }

  slides = [
    {
      title:"Escucha tu musica",
      subTitle:"EN CUALQUIER LUGAR",
      description:`Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      Voluptatibus, autem! Quo, consequatur inventore? Voluptas distinctio corporis pariatur totam id velit natus numquam earum.
      Magnam est exercitationem doloremque, assumenda nulla expedita.`,
      icon:"Play",
    },
    {
      title:"Disfruta de",
      subTitle:"VIDEOS INCREIBLES",
      description:`Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      Voluptatibus, autem! Quo, consequatur inventore? Voluptas distinctio corporis pariatur totam id velit natus numquam earum.
      Magnam est exercitationem doloremque, assumenda nulla expedita.`,
      icon:"videocam",
    },
    {
      title:"Accede al exclusivo",
      subTitle:"MODO DEPORTE",
      description:`Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      Voluptatibus, autem! Quo, consequatur inventore? Voluptas distinctio corporis pariatur totam id velit natus numquam earum.
      Magnam est exercitationem doloremque, assumenda nulla expedita.`,
      icon:"bicycle",
    }
  ];
  constructor(
    private router: Router,
    private storage: Storage
  ) { }

  ngOnInit() {
  }

  close(){
    
    this.storage.set('isIntroShowed',true);
    this.router.navigate(['/home']);
  }
}
