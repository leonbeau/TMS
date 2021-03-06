import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(user: User): Promise<any> {
    try {
      await this.usersRepository.insert(user);
      return {
        code: 0,
        message: '添加成功'
      }
    } catch (error) {
      return {
        code: 1,
        message: '添加失败'
      }
    }
    
  }

  async remove(id: string): Promise<any> {
    try {
      await this.usersRepository.delete(id);
      return {
        code: 0,
        message: '删除成功'
      }
    } catch (error) {
      return {
        code: 1,
        message: '删除失败'
      }
    }
    
  }

  async edit(id: number, user: User): Promise<any> {
    try {
      await this.usersRepository.update(id, user);
      return {
        code: 0,
        message: '更新成功'
      }
    } catch (error) {
      return {
        code: 1,
        message: '更新失败'
      }
    }
  }
  // 分页查询接口
  async findAll(pagination): Promise<Object> {
    let user;
    try {
      if (pagination.search) {
        user = await getRepository(User)
          .createQueryBuilder('user')
          .where("user.username like :username", { username: '%' + pagination.search + '%' })
          .skip((pagination.page-1)*pagination.size || 0)
          .take(pagination.size || 10)
          .getManyAndCount()
      } else {
        user = await getRepository(User)
        // createQueryBuilder 创建一个查询构建器 可用于查询
          .createQueryBuilder('user')
          .skip((pagination.page-1)*pagination.size || 0)
          .take(pagination.size || 10)
          .getManyAndCount()
      }

      return {
        code: 0,
        data: user[0],
        page: parseInt(pagination.page),
        size: parseInt(pagination.size),
        total: user[1],
      }
    } catch (error) {
      return {
        code: 1,
        message: '查询失败'
      }
    }
    
    
    
   
  }

  async findOne(id: string): Promise<object> {
    try {
      const res = await this.usersRepository.findOne(id);
      return {
        code: 0,
        message: '查询成功',
        data: res,
      }
    } catch (error) {
      return {
        code: 0,
        message: '查询失败',
      }
    }
  }

  async findOneByUsername(username: string): Promise<User> {
    const user = await getRepository(User)
      .createQueryBuilder('user')
      .where("user.username = :username", { username: username })
      .getOne()
    return user
  }
  // async findOneUnique(username: string): Promise<any> {
  //   return this.usersRepository.find(user => user.username === username);
  // }
}
