import { Request, Response, NextFunction } from 'express';

const getUsers = async (req: Request, res: Response, next: NextFunction) => {};
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
