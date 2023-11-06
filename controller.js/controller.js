const Books = require("../model/bookSchema");

//add book
const addBook = async (req, res) => {
  try {
    const {title,author,summary} = req.body;
    // console.log(payload,"#######################################################")
    const bookExist = await Books.findOne({ title });
    console.log(bookExist, "*****************************");
    if (bookExist) {
      return res.status(400).json({ message: "Book Title Already Exist" });
    }
    const savedBook = await new Books( {title,author,summary}).save();
    return res.status(200).json(savedBook);
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: "Something went wrong while adding book" });
  }
};

//get all books
const getBookList = async (req, res) => {
  try {
    const data = await Books.find({});
    console.log(data);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({
      message: "Something went wrong while fetching list of all book",
    });
  }
};

//get single book
const getBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    if (!bookId) {
      return res.status(400).json({ message: "Book ID is missing in request parameters" });
    }
    const book = await Books.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book does not exist" });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong while getting the single book" });
  }
};


const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    if (!bookId) {
      return res
        .status(400)
        .json({ message: "Book ID is missing in request parameters" });
    }
    const deletedBook = await Books.findByIdAndDelete(bookId);
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong while deleting the book" });
  }
};

const updateSummary = async (req, res) => {
  try {
    const bookId = req.params.id;
    const payload = req.body;
    if (!bookId || !payload) {
      return res
        .status(400)
        .json({ message: "Book ID and summary are required" });
    }
    const existingBook = await Books.findById(bookId);
    if (!existingBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    if (
      payload.title === existingBook.title &&
      payload.author === existingBook.author
    ) {
      const updatedBook = await Books.findByIdAndUpdate(
        bookId,
        { summary: payload.summary },
        { new: true }
      );
      res.status(200).json(updatedBook);
    } else {
      return res.status(400).json({
        message:
          "Cannot update fields other than summary (title and author must match)",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong while updating the summary" });
  }
};

module.exports = {
  addBook,
  getBookList,
  getBookById,
  deleteBook,
  updateSummary,
};
