import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { TaskStatus } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { TasksService } from './tasks.service';
import { GetUser } from 'src/auth/get-user.decorator';

export class CreateTaskDto{
    title: string;
    description: string;
}

export class UpdateTaskDto{
    title: string;
    description: string;
    status: TaskStatus;
}

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
    constructor(private taskServices : TasksService) {}

    @Get()
    getAll(@GetUser('userId') userId: number) {
        return this.taskServices.getAll(userId) ;
    }

    @Get(':id')
    getOne(@Param('id' , ParseIntPipe) id: number , @GetUser('userId') userId: number){
        return this.taskServices.getOne(id,userId) ;
    }

    @Post()
    create(@Body() dto: CreateTaskDto, @GetUser('userId') userId: number){
        return this.taskServices.create(dto.title, dto.description ,userId) ;
    }

    @Patch(':id')
    update(
        @Param('id' , ParseIntPipe) id: number ,
        @Body() dto: UpdateTaskDto,
        @GetUser('userId') userId: number
    ){
        return this.taskServices.update(id, userId , dto)
    }

    @Delete(':id')
    delete(@Param('id' , ParseIntPipe) id: number , @GetUser('userId') userId: number){
        return this.taskServices.delete(id, userId) ;
    }
}
