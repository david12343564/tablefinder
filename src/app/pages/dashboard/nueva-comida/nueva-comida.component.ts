import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Producto } from 'src/app/shared/interfaces/producto';
import { ProductoService } from 'src/app/shared/services/producto.service';
import { PrivilegiosService } from 'src/app/shared/services/privilegios.service';


@Component({
  selector: 'app-nueva-comida',
  templateUrl: './nueva-comida.component.html',
  styleUrls: ['./nueva-comida.component.scss']
})
export class NuevaComidaComponent {
  formLogin: FormGroup
  @ViewChild('imageInput', { static: false }) imagenInput!: ElementRef;
  selectedFile: File | null = null;
  selectedImageUrl: any = null;

  constructor(
    formBuilder: FormBuilder,
    private productoService: ProductoService,
    private router: Router,
    private privilegioService: PrivilegiosService
  ) {
    this.formLogin = formBuilder.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
    });
    this.privilegioService.isRestaurant.subscribe((privilegio: boolean) => {
      this.isRestaurant = privilegio;
      console.log(this.isRestaurant)
    });

    if (this.url != '/comida') {
      this.isNew = false;
      this.productoService.observableProducto.subscribe((producto: Producto) => {
        this.producto = producto;
        this.infoProducto.nombre = this.producto.nombre
        this.infoProducto.categoria = this.producto.categoria
        this.infoProducto.descripcion = this.producto.descripcion
      })
      if (this.producto._id == '') {
        this.isNew = false;
        this.url = this.router.url.replace('/comida/', '')
        this.productoService.getProductoById(this.url).subscribe((data: any) => {
          this.producto = data
          this.infoProducto.nombre = this.producto.nombre
          this.infoProducto.categoria = this.producto.categoria
          this.infoProducto.descripcion = this.producto.descripcion
        })
      }
    }
  }

  isNew: boolean = true;
  url: string = this.router.url;
  isRestaurant: boolean = false;
  producto: Producto = { _id: '', nombre: '', descripcion: '', foto: '', precio: 0, categoria: '' }
  nextDashboard: boolean = false;
  invalidReq: boolean = false;
  infoProducto = { nombre: '', descripcion: '', categoria: '' };

  nuevaProducto() {
    console.log('nueva Producto')
    console.log(this.infoProducto)

    const formData = new FormData();
    formData.append('nombre', this.infoProducto.nombre);
    formData.append('descripcion', this.infoProducto.descripcion);
    formData.append('categoria', this.infoProducto.categoria);
    if (this.selectedFile) {
      formData.append('imagen', this.selectedFile);
    }
    this.productoService.addProducto(formData).subscribe((data: any) => {
      this.invalidReq = false;
      this.router.navigate(['/dashboard'])
    }, error => {
      this.invalidReq = true;
    });
  }

  mofidicarProducto() {
    console.log('modificar producto')
    console.log(this.infoProducto)

    this.productoService.modifyProducto(this.infoProducto, this.producto._id || '').subscribe((data: any) => {
      this.invalidReq = false;
      this.router.navigate(['/dashboard'])
    }, error => {
      this.invalidReq = true;
    });

  }

  seleccionarImagen() {
    this.imagenInput.nativeElement.click();
  }

  onFileSelect(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;

    if (files && files[0]) {
      this.selectedFile = files[0];
      // Image preview
      const reader = new FileReader();
      reader.onload = (e: any) => this.selectedImageUrl = e.target.result;
      reader.readAsDataURL(this.selectedFile);
    }
  }
}
