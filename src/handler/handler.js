const { nanoid } = require("nanoid");
const { books } = require("../data/Archive");
const validation = require("../validation/validation");
const {
  responseWithData,
  responseNoMsg,
  responseNoData
} = require("../utils/utils");

// Create
const createBook = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  } = request.payload;

  if (!validation.checkEmpty(name)) {
    return responseNoData(
      h,
      "fail",
      "Gagal menambahkan buku. Mohon isi nama buku"
    ).code(400);
  }

  if (readPage > pageCount) {
    return responseNoData(
      h,
      "fail",
      "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
    ).code(400);
  }

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = readPage === pageCount;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt
  };

  books.push(newBook);
  const isSuccess = books.filter(book => book.id === id).length > 0;

  if (isSuccess) {
    return responseWithData(h, "success", "Buku berhasil ditambahkan", {
      bookId: id
    }).code(201);
  }

  return responseNoData(h, "fail", "Buku gagal ditambahkan").code(500);
};

// Get All Books
const getBooks = (request, h) => {
  const { name, reading, finished } = request.query;

  let filteredBooks = books;

  if (!name && reading === undefined && finished === undefined) {
    const allBooks = books.map(({ id, name, publisher }) => ({
      id,
      name,
      publisher
    }));
    return responseNoMsg(h, "success", { books: allBooks }).code(200);
  }

  if (name) {
    filteredBooks = filteredBooks.filter(book =>
      book.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (reading === "0") {
    filteredBooks = filteredBooks.filter(book => book.reading === false);
  } else if (reading === "1") {
    filteredBooks = filteredBooks.filter(book => book.reading === true);
  }

  if (finished === "0") {
    filteredBooks = filteredBooks.filter(book => book.finished === false);
  } else if (finished === "1") {
    filteredBooks = filteredBooks.filter(book => book.finished === true);
  }

  const result = filteredBooks.map(({ id, name, publisher }) => ({
    id,
    name,
    publisher
  }));
  return responseNoMsg(h, "success", { books: result }).code(200);
};

// GetBook by id
const getBookById = (request, h) => {
  const { bookId } = request.params;
  const bookData = books.filter(book => book.id === bookId)[0];

  if (bookData !== undefined) {
    return responseNoMsg(h, "success", { book: bookData }).code(200);
  }

  return responseNoData(h, "fail", "Buku tidak ditemukan").code(404);
};

// Update book by id
const updateBookById = (request, h) => {
  const { bookId } = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  } = request.payload;
  const index = books.findIndex(book => book.id === bookId);

  if (index === -1) {
    return responseNoData(
      h,
      "fail",
      "Gagal memperbarui buku. Id tidak ditemukan"
    ).code(404);
  }

  if (!validation.checkEmpty(name)) {
    return responseNoData(
      h,
      "fail",
      "Gagal memperbarui buku. Mohon isi nama buku"
    ).code(400);
  }

  if (readPage > pageCount) {
    return responseNoData(
      h,
      "fail",
      "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
    ).code(400);
  }

  const finished = pageCount === readPage;
  const updatedBook = {
    ...books[index],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    updatedAt: new Date().toISOString()
  };

  books[index] = updatedBook;

  return responseNoData(h, "success", "Buku berhasil diperbarui").code(200);
};

// Delete book by id
const deleteBookById = (request, h) => {
  const { bookId } = request.params;
  const index = books.findIndex(book => book.id === bookId);

  if (index === -1) {
    return responseNoData(
      h,
      "fail",
      "Buku gagal dihapus. Id tidak ditemukan"
    ).code(404);
  }

  books.splice(index, 1);

  return responseNoData(h, "success", "Buku berhasil dihapus").code(200);
};

module.exports = {
  createBook,
  getBooks,
  getBookById,
  updateBookById,
  deleteBookById
};
