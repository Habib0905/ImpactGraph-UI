import React, { createContext, useEffect, useReducer } from 'react'


export const AuthContext = createContext()
export const authReducer = ( state , action) => {
    switch(action.type){
        case 'LoginAdmin':
            return {useradmin:action.payload}
        case 'LoginUser':
            return {user:action.payload}
        case 'LogOut' :
            return {useradmin:null, user:null}
        default:
            return state
    }
}

export const AuthContextProvider = ({children}) => {
    const [state , dispatch ] = useReducer(authReducer, {
        user:null,
        useradmin:null
    })

useEffect(()=> {
    const user = JSON.parse(localStorage.getItem('user'))
    const adminuser = JSON.parse(localStorage.getItem('adminuser'))

    if(user){
        dispatch ({
            type:'LoginUser',
            payload : user
        })
    }
    else if (adminuser)
    {
        dispatch({
            type:'LoginAdmin',
            payload: adminuser
        })
    }
}, [])

console.log('AuthContext state:' , state)

return(
    <AuthContext.Provider value={{ ...state, dispatch}}>
        {children}
    </AuthContext.Provider>
)

}
