import {Context, Request, Response, Router} from 'https://deno.land/x/oak/mod.ts';
import {Product} from "./types.ts";

const router = new Router();
export const controller = new AbortController();

const shutdown = ({request, response}: Context) => {
    try {
        console.warn(`shut down now ... => ${request}`);
        controller.abort();
        response.status = 200;
    } catch (error) {
        console.error(error);
        response.status = 500;
    }
};

const getProductById = ({params, request, response}: { params: any, request: Request, response: Response }) => {
    try {
        console.log(`getProductById => params = ${params}, request = ${request}`);
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
        console.error(error);
        response.status = 500;
    }
};

const addProduct = async ({request, response}: Context) => {
    try {
        console.log(`addProduct => request = ${request}`);
        const body = await request.body();
        const product: Product = body.value;
        response.status = 200;
        response.body = {
            ...product,
            outOfStock: false
        };
    } catch (error) {
        console.error(error);
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