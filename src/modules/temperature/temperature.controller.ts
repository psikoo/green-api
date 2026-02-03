import { Controller, Get, Post, Body, Patch, Param, Headers, Delete, Query } from '@nestjs/common';

import { Roles } from 'src/auth/passport/decorators/roles.decorator';
import { Role } from 'src/constants';
import { CreateTemperatureDto } from './dto/createTemperature.dto';
import { UpdateTemperatureDto } from './dto/updateTemperature.dto';
import { TemperatureService } from './temperature.service';
import { Temperature } from './entities/temperature.entity';
import { PaginationDto } from '../pagination/pagination.dto';

@Controller('temperature')
export class TemperatureController {
  constructor(private readonly temperatureService: TemperatureService) {};

  @Get()
  @Roles(Role.ADMIN, Role.SENSOR, Role.MANAGER, Role.VIEWER)
  getAllTemperatures(): Promise<Temperature[]> {
    return this.temperatureService.getAllTemperatures();
  }
  @Get(":sensorid")
  @Roles(Role.ADMIN, Role.SENSOR, Role.MANAGER, Role.VIEWER)
  getXTemperaturesForId(@Query() pagination: PaginationDto, @Param("sensorid") sensorid: number): Promise<Temperature[]> {
    return this.temperatureService.getXTemperaturesForId(pagination, sensorid);
  }
  @Get("all/:sensorid")
  @Roles(Role.ADMIN, Role.SENSOR, Role.MANAGER, Role.VIEWER)
  getAllTemperaturesForId(@Param("sensorid") sensorid: number): Promise<Temperature[]> {
    return this.temperatureService.getAllTemperaturesForId(sensorid);
  }

  @Post()
  @Roles(Role.ADMIN, Role.SENSOR, Role.MANAGER)
  createTemperature(@Body() body: CreateTemperatureDto): Promise<Temperature> {
    return this.temperatureService.createTemperature(body);
  }

  @Patch(":id")
  @Roles(Role.ADMIN, Role.SENSOR, Role.MANAGER)
  updateTemperature(@Param("id") id: number, @Body() body: UpdateTemperatureDto): Promise<Temperature> {
    return this.temperatureService.updateTemperature(id, body);
  }

  @Delete(":id")
  @Roles(Role.ADMIN, Role.SENSOR, Role.MANAGER)
  deleteTemperature(@Param("id") id: number): Promise<JSON> {
    return this.temperatureService.deleteTemperature(id);
  }
}