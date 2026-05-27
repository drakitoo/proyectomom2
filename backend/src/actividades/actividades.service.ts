import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ActividadesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.tarea.findMany();
  }

  async create(data: { nombre: string; prioridad: string }) {
    return this.prisma.tarea.create({
      data: { ...data, completado: false },
    });
  }

  async completar(id: number) {
    return this.prisma.tarea.update({
      where: { id },
      data: { completado: true },
    });
  }

  async eliminar(id: number) {
    return this.prisma.tarea.delete({ where: { id } });
  }
}
