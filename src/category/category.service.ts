import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  create(name: string) {
    const category = this.categoryRepository.create({ name });
    return this.categoryRepository.save(category);
  }
  findAll() {
    return this.categoryRepository.find({ relations: ['videos'] });
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['videos'],
    });
    if (!category) throw new NotFoundException(`카테고리 ID ${id} 못찾음!!!`);
    category.updateCategoryCount();
    await this.categoryRepository.save(category);
    return category;
  }

  async updateCategoryCount(categoryId: number): Promise<void> {
    const category = await this.findOne(categoryId);
    category.updateCategoryCount();
    await this.categoryRepository.save(category);
  }

  remove(id: number) {
    return this.categoryRepository.delete({ id });
  }
}
