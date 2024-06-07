import { Circle } from "./Circle";
import { Avatar } from "./Avatar";
import { Link } from "react-router-dom";
interface BlogCardProps  {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: number

}

export const BlogCard=({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps)=>{
    return <Link to={`/blog/${id}`}>
    <div className="border-b border-slate-200  p-4 w-screen max-w-screen-md cursor-pointer">
              <div className="flex">
                
                <Avatar name={authorName} />
                
                <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
                {authorName}
                </div>
                <div className="flex justify-center flex-col pl-2 ">
                    <Circle />
                </div>
                <div className="pl-2 font-thin text-sm text-slate-500 flex justify-center flex-col">
                {publishedDate}
                </div>
              </div>
              <div className="text-xl font-semibold pt-2">
                {title}
              </div>
              <div className="text-md font-thin">
                {content.slice(0,100) + "..."}
              </div>
              <div className="text-sm text-slate-500 font-thin pt-4">
                {`${Math.ceil (content.length /100)} minute(s) Read`}
              </div>
              
    </div>
    </Link>
}

