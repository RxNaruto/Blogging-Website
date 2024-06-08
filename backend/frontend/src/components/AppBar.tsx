import { Avatar } from "./Avatar"
import { Link } from "react-router-dom"
export const AppBar=()=>{
    return <div className="border-b flex justify-between px-10 py-4">
        <div className="flex flex-col justify-center">
           Vichar
        </div>
        <div>
            <Link to={'/publish'}>
            <button type="button" className="text-white mr-8 bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">New</button>
        </Link>
            <Avatar name="naruto" />
        </div>

    </div>
}