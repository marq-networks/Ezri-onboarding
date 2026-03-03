import app from "../src/app";

export default async function handler(req: any, res: any) {
  // Delegate to Fastify
  await app.ready();
  
  // Log request for debugging Vercel routing
  if (req.url.includes('reset-password')) {
    console.log(`[Vercel Function] Incoming request: ${req.method} ${req.url}`);
  }

  app.server.emit("request", req, res);
}
