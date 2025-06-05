import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SidebarComponent } from './shared/layout/shell/shell.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: SidebarComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },

      // 👉 Gestion - Poinçon
      {
        path: 'gestion/poincon/liste',
        loadComponent: () =>
          import('./gestion/poincon/liste/liste.component').then((m) => m.ListeComponent),
      },
      {
        path: 'gestion/poincon/ajouter/step1',
        loadComponent: () =>
          import('./gestion/poincon/ajouter-step1/ajouter-step1.component').then((m) => m.AjouterPoinconStep1Component),
      },
      {
        path: 'gestion/poincon/ajouter/step2',
        loadComponent: () =>
          import('./gestion/poincon/ajouter-step2/ajouter-step2.component').then((m) => m.AjouterPoinconStep2Component),
      },
      {
        path: 'gestion/poincon/ajouter/step3',
        loadComponent: () =>
          import('./gestion/poincon/ajouter-step3/ajouter-step3.component').then((m) => m.AjouterStep3Component),
      },
      {
        path: 'gestion/poincon/details/:id',
        loadComponent: () =>
          import('./gestion/poincon/details/details.component').then((m) => m.DetailsComponent),
      },
      {
        path: 'gestion/poincon/modifier/:id',
        loadComponent: () =>
          import('./gestion/poincon/modifier-step1/modifier-step1.component').then((m) => m.ModifierStep1Component),
      },
      {
        path: 'gestion/poincon/modifier/:id/step2',
        loadComponent: () =>
          import('./gestion/poincon/modifier-step2/modifier-step2.component').then((m) => m.ModifierStep2Component),
      },

      // 👉 Suivi - Utilisation
      {
        path: 'suivi/utilisation/liste',
        loadComponent: () =>
          import('./suivi/utilisation/liste/liste.component').then((m) => m.ListeUtilisationComponent),
      },
      {
        path: 'suivi/utilisation/details/:id',
        loadComponent: () =>
          import('./suivi/utilisation/details/details.component').then((m) => m.DetailsUtilisationComponent),
      },
      {
        path: 'suivi/utilisation/ajouter',
        loadComponent: () =>
          import('./suivi/utilisation/ajouter/ajouter.component').then((m) => m.AjouterUtilisationComponent),
      },
      {
        path: 'suivi/utilisation/modifier/:id',
        loadComponent: () =>
          import('./suivi/utilisation/modifier/modifier.component').then((m) => m.ModifierUtilisationComponent),
      },

      // 🏁 Redirect default
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },

  // Catch-all route
  { path: '**', redirectTo: 'dashboard' },
];
