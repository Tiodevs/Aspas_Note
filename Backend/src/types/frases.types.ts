export interface Phrase {
  id?: string;
  phrase: string;
  author: string;
  tags: string[];
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface User {
  id?: string;
  email: string;
  name?: string;
  username: string;
  avatar?: string;
  bio?: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreatePhraseDto {
  phrase: string;
  author: string;
  tags: string[];
  userId: string;
}

export interface CreateUserDto {
  email: string;
  name?: string;
  username: string;
  avatar?: string;
  bio?: string;
  password: string;
}