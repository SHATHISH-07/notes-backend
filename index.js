require("dotenv").config();
const express = require("express");
const Note = require("./models/note");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

app.get("/api/notes", async (req, res) => {
  try {
    const notes = await Note.find({});
    res.json(notes);
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
});

app.get("/api/notes/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (note) {
      res.json(note);
    } else {
      res.status(404).send({ error: "Note not found" });
    }
  } catch (error) {
    res.status(400).send({ error: "Malformatted id" });
  }
});

app.post("/api/notes", async (req, res) => {
  try {
    const { content, important = false } = req.body;
    const note = new Note({
      content,
      important,
    });

    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(400).send({ error: "Failed to create note" });
  }
});

app.delete("/api/notes/:id", async (req, res) => {
  try {
    await Note.findByIdAndRemove(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(400).send({ error: "Malformatted id" });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
