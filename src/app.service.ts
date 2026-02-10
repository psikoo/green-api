import { Injectable, Type } from '@nestjs/common';
import { METHOD_METADATA, PATH_METADATA } from '@nestjs/common/constants';
import { DiscoveryService, MetadataScanner } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';

import { RouteDefinition } from './constants/types/routeDefinition.type';
import { API_DEFAULT_VERSION } from './main';

@Injectable()
export class AppService {
  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly metadataScanner: MetadataScanner,
  ) {}

  getAllRoutes(): RouteDefinition[] {
    const controllers = this.discoveryService.getControllers();
    return controllers.map((wrapper: InstanceWrapper): RouteDefinition[] => {
      const instance = wrapper.instance as Record<string, object> | undefined;
      const metatype = wrapper.metatype as Type<unknown> | undefined;
      if(!instance || !metatype) return [];
      const controllerPath = Reflect.getMetadata(PATH_METADATA, metatype) as string | undefined;

      return this.metadataScanner.getAllMethodNames(instance).map((methodName: string) => {
        const methodPath = Reflect.getMetadata(PATH_METADATA, instance[methodName]) as string ?? '';
        const httpMethod = Reflect.getMetadata(METHOD_METADATA, instance[methodName]) as number;

        const apiVersionStr = 'v' + API_DEFAULT_VERSION + '/';
        const apiRouteStr = controllerPath + '/' + methodPath;
        // Clean path to remove multiple '/' in a row
        const urlStr = (apiVersionStr + apiRouteStr).replace(/\/+/g, '/');
        return {
          method: getHttpMethodName(httpMethod),
          path: urlStr,
        };
      });
    }).flat();
  }
}

function getHttpMethodName(type: number): string {
  const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'ALL', 'OPTIONS', 'HEAD'];
  return methods[type] || 'UNKNOWN';
}
