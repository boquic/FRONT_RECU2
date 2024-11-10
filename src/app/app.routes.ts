import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotaComponent } from './nota/nota.component';

export const routes: Routes = [
    {
        path:'',
        component: HomeComponent,
        title:'home'
    },
    {
        path:'coche',
        component:NotaComponent,
        title:'coche'
    },
    {
        path:'**',
        redirectTo:'',
        pathMatch:'full'
    }

];
