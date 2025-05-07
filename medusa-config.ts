import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

const config = defineConfig({
  
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
    workerMode: process.env.MEDUSA_WORKER_MODE as "shared" | "worker" | "server",
  },

  admin: {
    disable: false, //process.env.DISABLE_MEDUSA_ADMIN === "false" 
    backendUrl: process.env.VITE_MEDUSA_SERVER_URL,
  },
     
  modules: [
    {
      resolve: "./src/modules/Ecommerce",
    },
    {
      resolve: "@medusajs/medusa/cache-redis",
      options: { 
        redisUrl: process.env.REDIS_URL,
      },
    },
    {
      resolve: "@medusajs/medusa/event-bus-redis",
      options: { 
        redisUrl: process.env.REDIS_URL,
      },
    },
    {
      resolve: "@medusajs/medusa/workflow-engine-redis",
      options: {
        redis: {
          url: process.env.REDIS_URL,
        },
      },
    },

  ],
   
  plugins: [
    {
      resolve: "@medusajs/file-local",
      options: {
        upload_dir: "static",
        backend_url: `https://medusa-store-ecommerce-sever-2.onrender.com/health/static`,
      },
    },
  ],
}) as any


module.exports = config; 