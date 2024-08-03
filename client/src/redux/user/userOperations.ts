import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

import {
  IAuthResponse,
  IError,
  IRegisterArgs,
  IChatResponse,
  ICreateArgs,
  IEditArgs
} from '../../types/operations';
import { API_URL } from '../../types/constants';

axios.defaults.baseURL = API_URL;

export const login = createAsyncThunk<IAuthResponse, string, IError>(
  'user/login',
  async (userId) => {
    const response = await axios.get(`api/login/${userId}`);
    const result = await response.data;
    return result.data;
  }
);

export const register = createAsyncThunk<IAuthResponse, IRegisterArgs, IError>(
  'user/register',
  async () => {
    const response = await axios.post('api/register');

    const result = await response.data;
    return result.data;
  }
);

export const createChat = createAsyncThunk<IChatResponse, ICreateArgs, IError>(
  'user/createChat',
  async (data) => {
    const response = await axios.post('api/chat', data);
    const result = await response.data;
    return result.data;
  }
);

export const editChat = createAsyncThunk<IChatResponse, IEditArgs, IError>(
  'user/editChat',
  async (data) => {
    const response = await axios.put('api/chat', data);
    const result = await response.data;
    return result.data;
  }
);

export const deleteChat = createAsyncThunk<string, string, IError>(
  'user/deleteChat',
  async (chatId: string) => {
    const response = await axios.delete(`api/chat/${chatId}`);
    const result = await response.data;
    return result.data;
  }
);
