import { config } from 'dotenv';
import { app } from './app';

config();

const port = Number(process.env.PORT) || 3333;

app
  .listen({
    port,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log(`🚀 Server running on http://localhost:${port}`);
  })
  .catch((err: any) => {
    console.error(err);
    process.exit(1);
  });

