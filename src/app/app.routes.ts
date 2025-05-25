// app.routes.ts
import { Routes, CanActivateFn } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ShellComponent } from './shared/layout/shell/shell.component';
import { permissionGuard } from './core/permission.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: '',
    component: ShellComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      // Dashboard
      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
      },

      // Gestion Poinçons
      {
        path: 'gestion/poincon/liste',
        loadComponent: () => import('./gestion/poincon/liste/liste.component').then(m => m.ListeComponent),
        //canActivate: [permissionGuard('Poinçons.consulter')]
      },
      {
        path: 'gestion/poincon/ajouter/step1',
        loadComponent: () => import('./gestion/poincon/ajouter-step1/ajouter-step1.component').then(m => m.AjouterStep1Component),
        //canActivate: [permissionGuard('Poinçons.ajouter')]
      },
      {
        path: 'gestion/poincon/ajouter/step2',
        loadComponent: () => import('./gestion/poincon/ajouter-step2/ajouter-step2.component').then(m => m.AjouterStep2Component),
        //canActivate: [permissionGuard('Poinçons.ajouter')]
      },
      {
        path: 'gestion/poincon/ajouter/step3',
        loadComponent: () => import('./gestion/poincon/ajouter-step3/ajouter-step3.component').then(m => m.AjouterStep3Component),
        //canActivate: [permissionGuard('Poinçons.ajouter')]
      },
      {
        path: 'gestion/poincon/details/:id',
        loadComponent: () => import('./gestion/poincon/details/details.component').then(m => m.DetailsComponent),
        //canActivate: [permissionGuard('Poinçons.consulter')]
      },
      {
        path: 'gestion/poincon/modifier/:id',
        redirectTo: 'gestion/poincon/modifier/:id/step1',
        pathMatch: 'full'
      },
      {
        path: 'gestion/poincon/modifier/:id/step1',
        loadComponent: () => import('./gestion/poincon/modifier-step1/modifier-step1.component').then(m => m.ModifierStep1Component),
        //canActivate: [permissionGuard('Poinçons.modifier')]
      },
      {
        path: 'gestion/poincon/modifier/:id/step2',
        loadComponent: () => import('./gestion/poincon/modifier-step2/modifier-step2.component').then(m => m.ModifierStep2Component),
        //canActivate: [permissionGuard('Poinçons.modifier')]
      },

      // Suivi Utilisation
      {
        path: 'suivi/utilisation/liste',
        loadComponent: () => import('./suivi/utilisation/liste/liste.component').then(m => m.ListeUtilisationComponent),
        //canActivate: [permissionGuard('Utilisations.consulter')]
      },
      {
        path: 'suivi/utilisation/details/:id',
        loadComponent: () => import('./suivi/utilisation/details/details.component').then(m => m.DetailsUtilisationComponent),
        //canActivate: [permissionGuard('Utilisations.consulter')]
      },
      {
        path: 'suivi/utilisation/ajouter',
        loadComponent: () => import('./suivi/utilisation/ajouter/ajouter.component').then(m => m.AjouterUtilisationComponent),
        //canActivate: [permissionGuard('Utilisations.ajouter')]
      },

      // Historique Audit Trail
      {
        path: 'historique/auditTrail',
        loadComponent: () => import('./history/auditTrail/liste/liste.component').then(m => m.ListeAuditComponent),
        //canActivate: [permissionGuard('Audit.consulter')]
      },

      // Historique Connexions
      {
        path: 'historique/connexions',
        loadComponent: () => import('./history/liste-connexions/liste-connexions.component').then(m => m.ListeConnexionsComponent),
        //canActivate: [permissionGuard('Connexions.consulter')]
      },

      // Gestion Utilisateurs
      {
        path: 'gestion/utilisateur/liste',
        loadComponent: () => import('./gestion/utilisateurs/liste/liste.component').then(m => m.ListeUtilisateursComponent),
        //canActivate: [permissionGuard('Utilisateurs.consulter')]
      }
    ]
  },

  { path: '**', redirectTo: 'dashboard' },
];
