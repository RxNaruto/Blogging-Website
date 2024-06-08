import { Link } from "react-router-dom";

export const Home = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-slate-200">
            
            <div className="flex flex-col items-center ">
                <div className="text-5xl font-extrabold mb-20">
                Welcome to Naruto's Blogging Website!
                </div>
                
                <Link to={'/signup'}>
                <button className="px-10 py-4  bg-slate-900 text-white text-lg font-semibold rounded hover:bg-blue-700 transition duration-300">
                    Get Started
                </button>
                </Link>
            </div>
        </div>
    );
}
