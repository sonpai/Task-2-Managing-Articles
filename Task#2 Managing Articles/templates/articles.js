//Sofia Kononenko Sham Hasson

const express = require("express");
const router = express.Router();
const db = require("../dbSingleton").getConnection();

//H
// Get the amount of articles
router.get("/count", (req, res) => {
  db.query("SELECT COUNT(*) AS count FROM articles", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
});

//A
// Add a new article

router.post("/", (req, res) => {
  const { title, content, author } = req.body;
  if (!title || !content || !author) {
    return res
      .status(400)
      .json({ error: "All fields (title, content, author) are required." });
  }
  db.query(
    "INSERT INTO articles (title, content, author) VALUES (?, ?, ?)",
    [title, content, author],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: result.insertId, title, content, author });
    }
  );
});

//B
// Get an article by ID

router.get("/", (req, res) => {
  db.query("SELECT * FROM articles", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

//C
// Get an article by ID

router.get("/:id", (req, res) => {
  db.query(
    "SELECT * FROM articles WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0)
        return res.status(404).json({ error: "Article not found." });
      res.json(results[0]);
    }
  );
});

//D
// Delete an article by ID
router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM articles WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0)
        return res.status(404).json({ error: "Article not found." });
      res.json({ message: "Article deleted successfully." });
    }
  );
});

//E
// Get articles by author
router.get("/author/:author", (req, res) => {
  db.query(
    "SELECT * FROM articles WHERE author = ?",
    [req.params.author],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
});

//F
// Get articles created after a specific date
router.get("/created-after/:date", (req, res) => {
  db.query(
    "SELECT * FROM articles WHERE created_at > ?",
    [req.params.date],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
});

//G
// Get articles ordered by creation date
router.get("/ordered-by-date", (req, res) => {
  db.query(
    "SELECT * FROM articles ORDER BY created_at DESC",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
});

//I
// Get articles with titles matching a pattern
router.get("/search/:pattern", (req, res) => {
  db.query(
    "SELECT * FROM articles WHERE title LIKE ?",
    [`%${req.params.pattern}%`],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
});

//J
// Get distinct number of authors
router.get("/distinct-authors", (req, res) => {
  db.query("SELECT DISTINCT author FROM articles", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

module.exports = router;
