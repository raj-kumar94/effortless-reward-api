import createDatabaseConnection from './databaseConnection.js';
import app from './server.js';
const port = Number(process.env.PORT || 8000);

createDatabaseConnection().then(() => {
  app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
  });
})