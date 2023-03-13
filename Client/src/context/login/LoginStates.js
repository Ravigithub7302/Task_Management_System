import loginContext from "./loginContext";
 import { useState } from "react";
const LoginState = (props)=>{
    const [email,setEmail] = useState("");
    const [password,setPassword]=useState("");
    return(
        <loginContext.Provider value = {{email,setEmail,password,setPassword}}>
            {props.children}
        </loginContext.Provider>
    )
 }

 export default LoginState;