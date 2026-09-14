import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Labs } from './pages/labs/labs';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'inicio', 
        component: Home
    },
    {
        path: 'lab',
        component: Labs
    },
    {
        path: 'labs',
        component: Labs
    }
];
