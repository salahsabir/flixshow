// LOGIN ACTIONS

export const loginStart = () =>({
    type:"LOGIN_START",
});

export const loginSuccess = (user) =>({
    type:"LOGIN_SUCCESS",
    payload:user,
});

export const loginFailure = (err) =>({
    type:"LOGIN_FAILURE",
    payload:err,
});

// LOGOUT ACTIONS

export const logout = () =>({
    type:"LOGOUT",
});