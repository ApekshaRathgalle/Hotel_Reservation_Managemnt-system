import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'home',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'hotels',
    renderMode: RenderMode.Server
  },
  {
    path: 'resorts',
    renderMode: RenderMode.Server
  },
  {
    path: 'weddings',
    renderMode: RenderMode.Server
  },
  {
    path: 'events',
    renderMode: RenderMode.Server
  },
  {
    path: 'offers',
    renderMode: RenderMode.Server
  },
  {
    path: 'auth/**',
    renderMode: RenderMode.Client
  },
  {
    path: 'admin/**',
    renderMode: RenderMode.Client
  },
  {
    path: 'user-dashboard/**',
    renderMode: RenderMode.Client
  },
  {
    path: 'booking/**',
    renderMode: RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Server
  }
];
