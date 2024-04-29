import { setupWorker } from "msw/browser"

import userHandlers from "./handlers/user"

const handlers = [...userHandlers]

export const worker = setupWorker(...handlers)
