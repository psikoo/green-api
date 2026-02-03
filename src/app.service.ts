import { Injectable } from '@nestjs/common';
import { app } from './main';
import { Router } from 'express';

@Injectable()
export class AppService {
  getRouts(): JSON {
    const server = app.getHttpServer();
    const router: Router = server._events.request.router;
    if(!router) return JSON.parse(JSON.stringify({"Error": "No router"}));
    let availableRoutes: [{ path: string, methods: string[] }?] = [];
    for(let i=0; i<router.stack.length; i++) {
      let route = router.stack[i].route;
      if (route && isNotInList(route!.path, availableRoutes) && route.path !== "/v1$" && route.path !== "/v1/*path") {
        availableRoutes.push({
          path: route!.path,
          methods: getMethods(route.path , router),
        })
      }
    }
    return JSON.parse(JSON.stringify(availableRoutes));
  }
}

function isNotInList(path: string, availableRoutes: [{ path: string, methods: string[] }?]): boolean {
  if(path.endsWith('/:id')) return false;
  for(let i=0; i<availableRoutes.length; i++) {
    if(availableRoutes[i]!.path === path) return false;
  }
  return true;
}

function getMethods(path: string, router: Router): string[] {
  let methods: string[] = [];
  for(let i=0; i<router.stack.length; i++) {
    let route = router.stack[i].route;
    if(!route) {}
    else if(route.path === path) { methods.push(route.stack[0].method) } 
    else if(route.path === path+"/:id") { methods.push(route?.stack[0].method+"/:id") }
  }
  return methods;
}