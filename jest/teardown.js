/* Default-Export */
export default async () => {
  if (global.__MONGOOSE__.connection.readyState !== 0) {
    await global.__MONGOOSE__.disconnect();
    await global.__MONGOOSE__.connection.close();
    await global.__MONGO_SERVER__.stop();
  }

  if(global.__SERVER__) global.__SERVER__.close();
}