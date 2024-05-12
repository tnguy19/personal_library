import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://covers.openlibrary.org/b/isbn/";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "personal_library",
  password: "Culun2003", //Remove when upload
  port: 5432,
});

db.connect();

let books =[];
let sortingCriteria = "date_read DESC";

app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM books ORDER BY " + sortingCriteria);
    books = result.rows;
    //console.log(result.rows);
    //console.log(books);
    for (let item of books) {
      try {
        item.image = findCoverURL(item.isbn);
      } catch (err) {
        console.log(`Error fetching book cover for ISBN ${item.isbn}:`, err);
      }
    }
    res.render("index.ejs", {
      books: books
    });
  } catch (err) {
    console.log(err);
  }
  });   

app.get("/date", async (req,res) => {
  sortingCriteria = "date_read DESC";
  res.redirect("/");
  })

app.get("/rating", async (req,res) => {
    sortingCriteria = "rating DESC";
    res.redirect("/");
  })

app.get("/edit/:id", async (req,res) => {
  try {
    const result = await db.query("SELECT * FROM books WHERE id = $1", [req.params.id]);
    let book = result.rows[0];
    book.image = findCoverURL(book.isbn);
    //console.log(book);
    res.render("edit.ejs", {
      book: book
    });
  } catch (err) {
    console.log(`Error fetching book for edit with id ${req.params.id}:`, err);
  }
})

app.post("/edit/:id", async (req,res) => {
  try {
    //console.log(req.body);
    const editPost = req.body;
    await db.query("UPDATE books SET title = $1, isbn = $2, date_read = $3, rating = $4,comment = $5, link = $6 WHERE id = $7", [editPost.title, editPost.isbn, editPost.date, editPost.rating, editPost.comment, editPost.link, editPost.id]);
    res.redirect("/");
  } catch (err) {
    console.log(`Error saving edit for book with id ${req.params.id}:`, err);
  }
})

app.get("/add", (req,res) => {
  res.render("add.ejs");
})

app.post("/add", async (req,res) => {
  const book = req.body;
  //console.log(book);
  try {
    await db.query("INSERT INTO books (title, isbn, date_read, rating, comment, link) VALUES ($1, $2, $3, $4, $5, $6)", [book.title, book.isbn, book.date, book.rating, book.link, book.comment]);
    res.redirect('/');
  } catch (err) {
    console.log(`Error adding new review for book with title: ${book}:`, err);
  }
})

app.post("/delete/:id", async (req,res) => {
  const deletedPost =  req.body;
  try {
    await db.query("DELETE FROM books WHERE id = $1", [deletedPost.id]);
    res.redirect("/");
  } catch (err) {
    console.log(`Error deleting review for book with id: ${deletedPost.id}:`, err);
  }
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    //console.log(posts);
  });

  function findCoverURL(isbn){
    return API_URL + isbn + "-M.jpg";
  }