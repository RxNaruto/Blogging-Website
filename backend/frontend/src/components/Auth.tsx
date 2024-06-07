import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { SignupInput} from "@xznaruto/zod_val_medium"
import { InputBox } from "./InputBox"
import { BACKEND_URL } from "../config"
import axios from "axios"


export const Auth = ({type}: {type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [postInputs,setPostInputs] = useState<SignupInput>({
        name: "",
        username: "",
        password: "",
        

    })
    async function sendRequest(){
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type ==="signup" ? "signup" : "signin"}`,postInputs);
            const jwt = response.data;
            localStorage.setItem("token",jwt);
            navigate("/blogs");
        }catch(e){
            
            
        }
    }
    return <div className=" h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
            <div className="px-10">
                <div className="text-4xl font-extrabold">
                    Create an account
                </div>
                <div className="text-slate-500">
                    {type === "signin" ? "Don't have an account? " : "Already have an account?"}
                    <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>{type === "signin" ? "Sign up" : "Sign in"}</Link>
                </div>
            </div>
            <div className="pt-3">
            {type === "signup" ? <InputBox label="Name" placeholder="Jhon Doe" onChange={(e)=>{
                setPostInputs({
                    ...postInputs,
                name: e.target.value
                })
            }}
            /> : null}
            <InputBox label="Username" placeholder="Jhon@mail.com" onChange={(e)=>{
                setPostInputs({
                    ...postInputs,
                username: e.target.value
                })
            }}
            />
            <InputBox label="Password" type= {"password"} placeholder="12345678" onChange={(e)=>{
                setPostInputs({
                    ...postInputs,
                password: e.target.value
                })
            }}
            />
            <button onClick={sendRequest} type="button" className="text-white w-full bg-gray-800 mt-6 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Sign up" : "Sign in"  }</button>
            </div>
            </div>
        </div>
    </div>
}