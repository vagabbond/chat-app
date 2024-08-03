import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { login, register, editChat, createChat, deleteChat } from './userOperations';
import { IState } from '../../types/state';
import { IAuthResponse, IChatResponse } from '../../types/operations';

const initialState: IState = {
  _id: null,
  firstName: null,
  photo: null,
  lastName: null,
  chats: null,
  notification: null,
  error: null
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setMessage: (state, action) => {
      if (state.chats) {
        state.chats
          .filter((chat) => chat._id === action.payload.chatId)[0]
          .messages.push(action.payload.message);
      }
    },
    setNotification: (state, action) => {
      state.notification = action.payload;
    },
    setChat: (state, action) => {
      state.chats = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, action: PayloadAction<IAuthResponse>) => {
        state._id = action.payload._id;
        state.firstName = action.payload.firstName;
        state.photo = action.payload.photo;
        state.lastName = action.payload.lastName;
        state.chats = action.payload.chats;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<IAuthResponse>) => {
        state._id = action.payload._id;
        state.firstName = action.payload.firstName;
        state.photo = action.payload.photo;
        state.lastName = action.payload.lastName;
        state.chats = action.payload.chats;
      })
      .addCase(createChat.fulfilled, (state, action: PayloadAction<IChatResponse>) => {
        if (state.chats) {
          state.chats.push(action.payload);
        }
      })
      .addCase(editChat.fulfilled, (state, action: PayloadAction<IChatResponse>) => {
        if (state.chats) {
          state.chats = state.chats.map((chat) =>
            chat._id === action.payload._id ? action.payload : chat
          );
        }
      })
      .addCase(deleteChat.fulfilled, (state, action: PayloadAction<string>) => {
        if (state.chats) {
          state.chats = state.chats.filter((chat) => chat._id !== action.payload);
        }
      })
      .addCase(login.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.message;
        }
      })
      .addCase(register.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.message;
        }
      })
      .addCase(createChat.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.message;
        }
      })
      .addCase(editChat.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.message;
        }
      })
      .addCase(deleteChat.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.message;
        }
      });
  }
});

export const { setMessage, setNotification, setChat } = userSlice.actions;

export default userSlice.reducer;
