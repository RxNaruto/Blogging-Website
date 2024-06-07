import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {decode,sign,verify} from 'hono/jwt'
import { buildErrorMessage } from "vite";
import { createBlogInput,updateBlogInput } from "@xznaruto/zod_val_medium";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
      },
      Variables:{
       userId: any;
      }
}>();

blogRouter.use("/*",async(c,next)=>{
 const authHeader = c.req.header("authorization") || "";
 const user = await verify(authHeader,c.env.JWT_SECRET);
 if(user){
    c.set("userId", user.id);
    await  next();
 }else{
    c.json({
        message: "You are not authorized"
    })
 }
    
})

blogRouter.post('/', async(c) => {
  const body = await c.req.json();
  const {success} = createBlogInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({
        message: "Input are not correct"
      })
      
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    
      }).$extends(withAccelerate())
      
    
    const authorId = c.get("userId");
    const blog = await prisma.blog.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: Number(authorId)

        }
    })
    return c.json({
        id: blog.id
    })
  })
  
blogRouter.put('/', async(c) => {
  const body = await c.req.json();
  const {success} = updateBlogInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({
        message: "Input are not correct"
      })
      
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    
      }).$extends(withAccelerate())
      
    

    const blog = await prisma.blog.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content,
     
        }
    })
    return c.json({
        id: blog.id
    })
  })

  blogRouter.get('/bulk', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    
      }).$extends(withAccelerate())

      const blogs = await prisma.blog.findMany();
      return c.json({
        blogs
      })
  })
  

blogRouter.get('/:id', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    
      }).$extends(withAccelerate())
      
    const id = await c.req.param("id");

  try {
      const blog = await prisma.blog.findFirst({
          where: {
              id: Number(id)
          }
         
      })
      return c.json({
          id: blog
      })
  } catch (e) {
    c.status(411);
    return c.json({
        message: "Internal Server error"
    })

    
  }
  })
  