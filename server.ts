import {Application} from 'https://deno.land/x/oak/mod.ts';
import router, {controller} from './routes.ts';

const port = 8000
const app = new Application();
const {signal} = controller;

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server running on port ${port}`)
await app.listen({port, signal});