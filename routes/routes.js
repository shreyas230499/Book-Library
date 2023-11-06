const {
  addBook,
  getBookList,
  getBookById,
  updateSummary,
  deleteBook
} = require("../controller.js/controller");

const bookRouter = require("express").Router();

bookRouter.get("/", getBookList);
bookRouter.get("/:id", getBookById,);
bookRouter.post("/", addBook);
bookRouter.patch("/:id", updateSummary); 
bookRouter.delete("/:id", deleteBook);

module.exports = {
  bookRouter,
};
