import { Routes } from '@angular/router';
import { ListagemContatoComponent } from './listagem-contato/listagem-contato.component';
import { FormularioContatoComponent } from './formulario-contato/formulario-contato.component';

export const routes: Routes = [
    {
        path: 'contact',
        component: ListagemContatoComponent
    },
    {
        path: 'contact/add',
        component: FormularioContatoComponent
    },
    {
        path: 'contact/edit/:id',
        component: FormularioContatoComponent
    }
];
