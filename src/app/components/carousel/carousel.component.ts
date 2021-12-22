import { Component, OnInit } from '@angular/core';
import { GalleryItem, ImageItem } from 'ng-gallery';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})


export class CarouselComponent implements OnInit {

  private imgUrl = "https://odontomed.s3.sa-east-1.amazonaws.com/banner/"
  img: GalleryItem[];

  constructor() { }

  ngOnInit(): void {
    this.img = this.imagenes();
  }

  imagenes():GalleryItem[]{
    let img: GalleryItem[];
    let blanqueamiento = this.imgUrl + "blanqueamiento.jpg";
    let implantes = this.imgUrl + "implantes.jpg";
    let implantes2 = this.imgUrl + "implantes2.jpg";
    let operatoria = this.imgUrl + "operatoria.jpg";
    let ortodoncia = this.imgUrl + "ortodoncia.jpg";
    let protesis = this.imgUrl + "protesis.jpg";
    img = [
      new ImageItem({src: operatoria}),
      new ImageItem({src: ortodoncia}),
      new ImageItem({src: protesis}),
      new ImageItem({src: blanqueamiento}),
      new ImageItem({src: implantes}),
      new ImageItem({src: implantes2})
    ]
    return img;

  }

}
