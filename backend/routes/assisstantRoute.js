import express from "express";
import multer from "multer";
import axios from "axios";
import FormData from "form-data";
import fs from "fs";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/analyze-prescription", upload.single("image"), async (req, res) => {
  try {
    const file = req.file;

    if (!file) return res.status(400).json({ error: "No image provided" });

    const formData = new FormData();
    formData.append("image", fs.createReadStream(file.path), file.originalname);

    const response = await axios.post("http://localhost:8000/upload", formData, {
      headers: formData.getHeaders(),
    });
    console.log(response.data)
    fs.unlink(file.path, (err) => {
      if (err) {
        console.error("Error deleting file:", err.message);
      } else {
        console.log("File deleted:", file.path);
      }
    });
    
    res.json(response.data);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
