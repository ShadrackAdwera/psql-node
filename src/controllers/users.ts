import { HttpError } from '@adwesh/common';
import { Request, Response, NextFunction } from 'express';
import { UserRepo } from '../repo/users';
import { IUserData } from '../types';
import { toCamelCase } from '../utils/toCamelCase';

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  const users = await UserRepo.find();
  const parsedUsers = toCamelCase<IUserData>(users);
  res.status(200).json({ count: users.length, users: parsedUsers });
};
const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  if (!id) return next(new HttpError('Please provide the ID', 400));
  const user = await UserRepo.findById(Number(id));
  const parsedUser = toCamelCase(user);
  res.status(200).json({ user: parsedUser[0] });
};
const addUser = async (req: Request, res: Response, next: NextFunction) => {
  const { username, bio } = req.body;
  const data = await UserRepo.create({ username, bio });
  const parsedUser = toCamelCase(data);
  res.status(201).json({ message: 'User created!', user: parsedUser[0] });
};
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const { username, bio } = req.body;
  const data = await UserRepo.findAndUpdate(Number(id), { username, bio });
  const parsedUser = toCamelCase(data);
  res
    .status(200)
    .json({ message: 'The user has been updated!', user: parsedUser[0] });
};
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  await UserRepo.findAndDelete(Number(id));
  res.status(200).json({ message: 'User has been deleted' });
};

export { getUsers, getUser, addUser, updateUser, deleteUser };
