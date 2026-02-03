import { Controller, Get, Post, Body, Patch, Param, Headers, Delete, Query } from '@nestjs/common';

import { CreateTemperatureDto } from './dto/createTemperature.dto';
import { UpdateTemperatureDto } from './dto/updateTemperature.dto';
import { TemperatureService } from './temperature.service';
import { Temperature } from './entities/temperature.entity';
import { PaginationDto } from '../pagination/pagination.dto';

@Controller('temperature')
export class TemperatureController {
  constructor(private readonly temperatureService: TemperatureService) {};

  @Get()
  getAllTemperatures(): Promise<Temperature[]> {
    return this.temperatureService.getAllTemperatures();
  }
  @Get(":sensorid")
  getXTemperaturesForId(@Query() pagination: PaginationDto, @Param("sensorid") sensorid: number): Promise<Temperature[]> {
    return this.temperatureService.getXTemperaturesForId(pagination, sensorid);
  }
  @Get("all/:sensorid")
  getAllTemperaturesForId(@Param("sensorid") sensorid: number): Promise<Temperature[]> {
    return this.temperatureService.getAllTemperaturesForId(sensorid);
  }

  @Post()
  createTemperature(@Body() body: CreateTemperatureDto): Promise<Temperature> {
    return this.temperatureService.createTemperature(body);
  }

  @Patch(":id")
  updateTemperature(@Param("id") id: number, @Body() body: UpdateTemperatureDto): Promise<Temperature> {
    return this.temperatureService.updateTemperature(id, body);
  }

  @Delete(":id")
  deleteTemperature(@Param("id") id: number): Promise<JSON> {
    return this.temperatureService.deleteTemperature(id);
  }
}