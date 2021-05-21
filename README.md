# Simple Web Server using Deno and Oak

## IDE
Recommend to use VS code with deno plugin

## How to run the program?
`
deno run --allow-net server.ts
`

#### Runtime verification with dependencies
`
deno run --lock=lock.json --cached-only --allow-net server.ts
`

## How to reload all modules?
`
deno cache --reload server.ts
`

#### Download the project's dependencies into the machine's cache, integrity checking each resource.
`
deno cache --reload --lock=lock.json server.ts
`

## Create/update the lock file "lock.json".
`
deno cache --lock=lock.json --lock-write server.ts
`