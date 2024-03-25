import { Slice, createSlice, Dispatch } from '@reduxjs/toolkit';
interface AuthObject {
    email: string,
    password: string,
}
interface AuthRes {
    email: string,
    idToken: string,
    expiresIn: string,
}

interface AuthResError {
    error: string,
    message: string,
}
interface AuthState {
    isLoggedIn: boolean,
    userData: null | AuthRes,
    token: string | null,
}



const initialState: AuthState = { isLoggedIn: false, userData: null, token: null};
const authSlice: Slice<AuthState> = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // updateProfile(state, action){
        //     state.userData = action.payload;
        // },
        login(state, action){
            state.isLoggedIn = true;
            state.userData = action.payload;
            state.token = action.payload.idToken;
        },
        logout(state){
            state.isLoggedIn = false;
            state.token = null;
            state.userData = null;
        },
    }
});
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;



export const authThunk = (authType: boolean, authobj: AuthObject) => {
    return async(dispatch: Dispatch) => {
        try{
            const res = await fetch(`http://localhost:4000/auth/${authType ? 'signin': 'signup'}`,{
                method: 'POST',
                body: JSON.stringify(authobj),
                headers:{
                    'Content-Type': 'application/json'
                }
            });
            if(!res.ok){
                const errorData: AuthResError = await res.json();
                throw new Error(errorData.message);
            }

            const resData: AuthRes = await res.json();
            localStorage.setItem('mailclienttoken', resData.idToken);
            // dispatch(login(resData));
        }
        catch(err){
            throw err;
        }
    }
}
