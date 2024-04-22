import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-formulario-contato',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  templateUrl: './formulario-contato.component.html',
  styleUrl: './formulario-contato.component.scss'
})
export class FormularioContatoComponent {

  contato: any = {
    name: '',
    phone: '',
    email: '',
    description: '',
  }

  constructor(
    public http: HttpClient,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {
    console.log(location.pathname)
    this.carregarDocumento()
  }

  carregarDocumento() {
    const id = this.activatedRoute.snapshot.params['id']
    if (id) {
      const url = 'http://localhost:3000/contact/' + id
      lastValueFrom(this.http.get(url))
        .then(resposta => {
          console.log('A api retornou a seguinte resposta', resposta)
          this.contato = resposta
        }).catch(err => {
          console.log('Deu erro', err)
        })
    } else {
      console.log('Não consultou pq está cadastrando')
    }

  }

  salvar() {
    let url = 'http://localhost:3000/contact'
    const id = this.activatedRoute.snapshot.params['id']
    const body = this.contato
    let method = 'post'
    let promise;
    if (id) {
      url = `${url}/${id}`
      promise = lastValueFrom(this.http.put(url, body))
    } else {
      promise = lastValueFrom(this.http.post(url, body))
    }

    promise.then(resposta => {
      this.router.navigateByUrl('/contact')
    }).catch(err => {
      console.error('Deu erro', err)
    })

  }
}
