import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { decode, sign, verify } from 'hono/jwt'
import {signupInput, signinInput} from "@vandavoe/medium-common"

export const userRouter = new Hono<{
    Bindings: {
        JWT_SECRET: string;
        DATABASE_URL: string;
    }
}>()



userRouter.post('/signup', async (c) => {
    const body = await c.req.json();
    const {success} = signupInput.safeParse(body)
    if(!success){
        c.status(411);
        return c.text("Invalid input"); 
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    //zod and password hash
    try {
        const user = await prisma.user.create({
            data: {
                username: body.username,
                password: body.password,
                name: body.name
            }
        })

        const token = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({ token })
    } catch (e) {
        console.log(e)
        c.status(411);
        return c.text("User already exist");
    }
})

userRouter.post('/signin', async (c) => {
    const body = await c.req.json();
    const {success} = signinInput.safeParse(body)
    if(!success){
        c.status(411);
        return c.text("Invalid input"); 
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    //zod and password hash
    try {
        const user = await prisma.user.findFirst({
            where: {
                username: body.username,
                password: body.password,
            }
        })
        if (!user) {
            c.status(403);
            return c.text("Unauthorised user")
        }
        const token = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({ token })
    } catch (e) {
        console.log(e)
        c.status(411);
        return c.text("invalid");
    }

})