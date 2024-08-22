import React, { useContext } from 'react'
import { AuthContext } from './Authcontext'


const useAuthcontext = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw Error('useAuthContext must be used inside an AuthContextProvider')
      }
  return context
}

export default useAuthcontext
