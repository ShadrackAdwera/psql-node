import { Request, Response, NextFunction } from 'express';
import { UserRepo } from '../repo/users';
import { IUserData } from '../types';
import { toCamelCase } from '../utils/toCamelCase';

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  const users = await UserRepo.find();
  const parsedUsers = toCamelCase<IUserData>(users);
  res.status(200).json({ count: users.length, users: parsedUsers });
};
const getUser = async (req: Request, res: Response, next: NextFunction) => {};
const addUser = async (req: Request, res: Response, next: NextFunction) => {};
const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export { getUsers, getUser, addUser, updateUser, deleteUser };
