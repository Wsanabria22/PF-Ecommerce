const server = require("./src/app.js");
const { conn } = require("./src/db.js");

const {
  storeAllCategories,
  storeAllProducts,
  storeAllUsers,
  createNewAdminUser,
} = require("./src/Controllers/dbcharge/dbcharge");

const port = process.env.PORT || 3001;
// Syncing all the models at once.

conn.sync({ force: false }).then(() => {
  server.listen(port, async () => {
    console.log("Server listening at port: " + port); // eslint-disable-line no-console

    // await storeAllCategories();
    // await storeAllProducts();
    // await storeAllUsers();
    // await createNewAdminUser();
  });
});
