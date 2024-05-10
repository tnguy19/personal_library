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
  password: "", //Remove when upload
  port: 5432,
});

db.connect();

let books =[];
let sortingCriteria = "date_read DESC";

app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM books ORDER BY " + sortingCriteria);
    books = result.rows;
    console.log(result.rows);
    //console.log(books);
    for (let item of books) {
      try {
        const result = API_URL + item.isbn + "-M.jpg";
        item.image = result;
        //await db.query("INSERT INTO cover_images (book_id, image) VALUES ($1, $2)", [item.id, book_cover]);
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

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    //console.log(posts);
  });
