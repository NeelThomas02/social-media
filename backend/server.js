require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");

const authRoutes = require("./routes/auth");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(fileUpload()); // Add file upload middleware

// Serve uploaded files as static
app.use("/upload", express.static(path.join(__dirname, "uploads"))); // Ensure 'uploads' is where the files will be stored

// Routes
app.use("/api/auth", authRoutes);
app.post("/upload", (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No files were uploaded.");
    }

    const profilePicture = req.files.profilePicture;
    const uploadPath = path.join(__dirname, "uploads", profilePicture.name);

    profilePicture.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).send(err);
        }

        // Send the file URL as the response
        res.send({ fileUrl: `http://localhost:5000/upload/${profilePicture.name}` });
    });
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
