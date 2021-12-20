import { Component, OnInit } from '@angular/core';
import SwiperCore, {Autoplay, Pagination, Navigation} from 'swiper';

SwiperCore.use([Autoplay, Pagination, Navigation])

export class CarouselComponent implements OnInit {

  private imgUrl = "https://odontomed.s3.sa-east-1.amazonaws.com/banner/"
  img: string[];

  constructor() { }

  ngOnInit(): void {
    this.img = this.imagenes();
  }

  imagenes():string[]{
    let blanqueamiento = this.imgUrl + "blanqueamiento.jpg";
    let implantes = this.imgUrl + "implantes.jpg";
    let implantes2 = this.imgUrl + "implantes2.jpg";
    let operatoria = this.imgUrl + "operatoria.jpg";
    let ortodoncia = this.imgUrl + "ortodoncia.jpg";
    let protesis = this.imgUrl + "protesis.jpg";
    let img : string[] = [blanqueamiento, implantes, implantes2, operatoria, ortodoncia, protesis];
    return img;

  }

}
