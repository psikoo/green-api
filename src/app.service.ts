import { Injectable } from '@nestjs/common';
import { IRouter } from 'express';

import { app } from './main';

@Injectable()
export class AppService {
  getRouts(): JSON {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const server = app.getHttpServer();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const router: IRouter = server._events.request.router as IRouter;
    if(!router) return JSON.parse(JSON.stringify({ Error: 'No router' })) as JSON;
    const availableRoutes: [{ path: string; methods: string[] }?] = [];
    for(let i = 0; i < router.stack.length; i++) {
      const route = router.stack[i].route;
      if(route
        && isNotInList(route.path, availableRoutes)
        && route.path !== '/v1$'
        && route.path !== '/v1/*path'
      ) {
        availableRoutes.push({
          path: route.path,
          methods: getMethods(route.path, router),
        });
      }
    }
    return JSON.parse(JSON.stringify(availableRoutes)) as JSON;
  }
}

function isNotInList(
  path: string,
  availableRoutes: [{ path: string; methods: string[] }?],
): boolean {
  for(let i = 0; i < availableRoutes.length; i++) {
    if(availableRoutes[i]!.path === path) return false;
  }
  return true;
}

function getMethods(path: string, router: IRouter): string[] {
  const methods: string[] = [];
  for(let i = 0; i < router.stack.length; i++) {
    const route = router.stack[i].route;
    if(route!.path === path) {
      methods.push(route!.stack[0].method);
    } else if(route!.path === path + '/:id') {
      methods.push(route?.stack[0].method + '/:id');
    }
  }
  return methods;
}
