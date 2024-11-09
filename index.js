const express = require("express");
const app = express();

const cors = require("cors");

app.use(cors());
app.use(express.json());

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true,
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

app.get("/api/notes", (req, res) => {
  res.send(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const note = notes.find((note) => note.id === req.params.id);
  if (note) {
    res.send(note);
  } else {
    res.status(404).end("<h1>Note not found<h1>");
  }
});

app.post("/api/notes", (req, res) => {
  const newNote = {
    id: JSON.stringify(notes.length + 1),
    content: req.body.content,
    important: req.body.important || false,
  };

  notes = [...notes, newNote];

  res.json(newNote);
});

app.delete("/api/notes/:id", (req, res) => {
  const note = notes.filter((note) => note.id === req.params.id);
  res.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
