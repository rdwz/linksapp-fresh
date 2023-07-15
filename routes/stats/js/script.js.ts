import { HandlerContext, Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET(_req: Request, _ctx: HandlerContext) {
    return fetch("https://pa.basswave.net/js/script.js");
  },
};
