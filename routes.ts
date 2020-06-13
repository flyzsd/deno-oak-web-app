import {Context, Request, Response, Router} from 'https://deno.land/x/oak/mod.ts';
import {delay} from "https://deno.land/std/async/mod.ts";
import {v4} from "https://deno.land/std/uuid/mod.ts";
import * as log from "https://deno.land/std/log/mod.ts";
import {Product} from "./types.ts";

const router = new Router();
export const controller = new AbortController();

const shutdown = ({request, response}: Context) => {
    try {
        log.warning(`shut down now ... => ${request}`);
        delay(1000);
        controller.abort();
        response.status = 200;
    } catch (error) {
        log.error(error);
        response.status = 500;
    }
};

const getProductById = ({params, request, response}: { params: any, request: Request, response: Response }) => {
    try {
        log.info(`getProductById => params = ${params}, request = ${request}`);
        const {id} = params;
        const product: Product = {
            id,
            name: "Product Three",
            description: "This is product three",
            price: 199.99,
            outOfStock: false
        };
        response.status = 200;
        response.body = product;
    } catch (error) {
        log.error(error);
        response.status = 500;
    }
};

const addProduct = async ({request, response}: Context) => {
    try {
        log.info(`addProduct => request = ${request}`);
        const body = await request.body();
        const product: Product = body.value;
        response.status = 200;
        response.body = {
            ...product,
            id: v4.generate(),
            outOfStock: false
        };
    } catch (error) {
        log.error(error);
        response.status = 500;
    }
};

router
    .get('/', ({response}: Context) => {
        response.status = 200;
        response.body = {};
    })
    .get('/products/:id', getProductById)
    .post('/products', addProduct)
    .post('/shutdown', shutdown);

export default router;