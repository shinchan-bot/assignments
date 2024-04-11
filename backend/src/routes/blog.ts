import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify, decode } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@vandavoe/medium-common";

export const blogRouter = new Hono<{
    Bindings: {
        JWT_SECRET: string;
        DATABASE_URL: string;
    },
    Variables:{
        userId:string;
    }
}>()

blogRouter.use('/*', async (c, next) => {
    const authHeader = c.req.header("authorization") || "";
    const user = await verify(authHeader, c.env.JWT_SECRET);
    console.log(user)
    if(user){
        c.set("userId", user.id)
    }
    else{
        c.status(403);
        return c.json({
            msg:"Please login first"
        })
    }
    await next();
})

blogRouter.post('/', async (c) => {
    const body = await c.req.json();
    const id = c.get("userId");
    const {success} = createBlogInput.safeParse(body)
    if(!success){
        c.status(411);
        return c.text("Invalid input"); 
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.blog.create({
        data:{
            title:body.title,
            content:body.content,
            authorId:Number(id)
        }
    }) 
    return c.json({
        id:blog.id
    })
    return c.text('Hello Hono!')
})


//pagination
blogRouter.get('/bulk', async (c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{
        const blogs = await prisma.blog.findMany()
        return c.json({blogs}) 
    }catch(e){
        c.status(411);
        return c.text("Error while fetching");
    }

})


blogRouter.get('/:id', async (c) => {
    const body = c.req.json();
    const id = c.req.param('id');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{
        const blog = await prisma.blog.findFirst({
            where:{
                id:Number(id)
            }
        }) 
        return c.json({
            blog
        })

    } catch(e){
        c.status(411);
        return c.json({
            msg:"error while fecthing"
        })
    }
    return c.text('Hello Hono!')
})


blogRouter.put('/',  async(c) => {
    const body = await c.req.json();
    const {success} = updateBlogInput.safeParse(body)
    if(!success){
        c.status(411);
        return c.text("Invalid input"); 
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.blog.update({
        where:{
            id:body.id
        },
        data:{
            title:body.title,
            content:body.content,
        }
    }) 
    return c.json({
        id:blog.id
    })
})
