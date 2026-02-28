import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { retry } from 'rxjs';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async getAll(userId: number): Promise<Task[]> {
    return this.tasksRepository.find({ where: { userId } });
  }

async getOne(id: number, userId: number): Promise<Task> {
  const task = await this.tasksRepository.findOne({ 
    where: { id: Number(id), userId: Number(userId) } // find by both at once
  });
  if (!task) throw new NotFoundException('Task not found');
  return task;
}

  async create(
    title: string,
    description: string,
    userId: number,
  ): Promise<Task> {
    const task = this.tasksRepository.create({ title, description, userId });
    return this.tasksRepository.save(task);
  }

  async update(
    id: number,
    userId: number,
    attrs: Partial<Task>,
  ): Promise<Task> {
    const task = await this.getOne(id, userId);
    Object.assign(task, attrs);
    return this.tasksRepository.save(task);
  }

  async delete(id: number, userId: number): Promise<{ message: string }> {
    const task = await this.getOne(id, userId);
    await this.tasksRepository.remove(task);
    return { message: 'Task deleted successfully' };
  }
}
