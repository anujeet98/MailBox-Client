import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import mailBoxReducer from './mailboxSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        mailbox: mailBoxReducer,
    }
});


export default store;