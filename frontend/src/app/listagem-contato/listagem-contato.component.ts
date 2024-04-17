import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-listagem-contato',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  templateUrl: './listagem-contato.component.html',
  styleUrl: './listagem-contato.component.scss'
})
export class ListagemContatoComponent {

  lista: any = []

  constructor(
    //Injeção de Dependencia
    public http: HttpClient,
    public router: Router
  ) {
    this.carregarContatos()
  }

  carregarContatos() {
    const url = 'http://localhost:3000/contact'

    console.log('Buscando os dados na url', url)
    //Observable

    //Promessa
    lastValueFrom(this.http.get(url))
      .then(resposta => {
        console.log('A api retornou a seguinte resposta', resposta)
        this.lista = resposta
      }).catch(err => {
        console.log('Deu erro', err)
      })

  }


  redirecionarParaFormularioDeCadastro() {
    this.router.navigateByUrl('/contact/add')
  }

  removerContato(contato: any) {
    console.log('Removendo contato', contato)

    const url = 'http://localhost:3000/contact/' + contato.id

    //Promessa
    lastValueFrom(this.http.delete(url))
      .then(resposta => {
        console.log('A api retornou a seguinte resposta', resposta)
        this.carregarContatos()
      }).catch(err => {
        console.log('Deu erro', err)
      })
  }

  editarContato(contato: any) {
    this.router.navigateByUrl('/contact/edit/' + contato.id)
  }

}
