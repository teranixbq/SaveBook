const {
  createBook,
  getBooks,
  getBookById,
  deleteBookById,
  updateBookById
} = require("../handler/handler");

const routes = [
  {
    method: "POST",
    path: "/books",
    handler: createBook
  },
  {
    method: "GET",
    path: "/books",
    handler: getBooks
  },
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: getBookById
  },
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: updateBookById
  },
  {
    method: "DELETE",
    path: "/books/{bookId}",
    handler: deleteBookById
  }
];

module.exports = {
  routes
};
