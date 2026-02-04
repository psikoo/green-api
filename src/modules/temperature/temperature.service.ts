import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTemperatureDto, UpdateTemperatureDto } from './dto/index';
import { Temperature } from './entities/temperature.entity';
import { PaginationDto } from '../pagination/pagination.dto';

@Injectable()
export class TemperatureService {
  constructor(@InjectRepository(Temperature) private readonly temperatureRepository: Repository<Temperature>) {}

  async getAllTemperatures(): Promise<Temperature[]> {
    return await this.temperatureRepository.find();
  }

  async getXTemperaturesForId(pagination: PaginationDto, sensorid: number): Promise<Temperature[]> {
    const temperature: Temperature[] | null = await this.temperatureRepository.find({
      where: { sensorid: sensorid },
      order: { id: { direction: 'DESC' } },
      take: pagination.take,
      skip: pagination.skip,
    });
    if(!temperature) throw new NotFoundException();
    else return temperature;
  }

  async getAllTemperaturesForId(sensorid: number): Promise<Temperature[]> {
    const temperature: Temperature[] | null = await this.temperatureRepository.find({
      where: { sensorid: sensorid },
      order: { id: { direction: 'DESC' } },
    });
    if(!temperature) throw new NotFoundException();
    else return temperature;
  }

  async createTemperature(body: CreateTemperatureDto): Promise<Temperature> {
    const temperature: Temperature = this.temperatureRepository.create({
      time: body.time,
      sensorid: body.sensorid,
      temperature: body.temperature,
    });
    return this.temperatureRepository.save(temperature);
  }

  async updateTemperature(id: number, body: UpdateTemperatureDto): Promise<Temperature> {
    const temperature: Temperature | undefined = await this.temperatureRepository.preload({
      id,
      time: body.time,
      sensorid: body.sensorid,
      temperature: body.temperature,
    });
    if(!temperature) throw new NotFoundException('Resource not found');
    else await this.temperatureRepository.save(temperature);
    return temperature;
  }

  async deleteTemperature(id: number): Promise<JSON> {
    const temperature: Temperature | null = await this.temperatureRepository.findOneBy({ id });
    if(!temperature) throw new NotFoundException('Resource not found');
    else {
      await this.temperatureRepository.remove(temperature);
      return JSON.parse(`{"deletedId": "${id}"}`) as JSON;
    }
  }
}
