// importing the libraries
import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Listen first
app.listen(8081, () => {
  console.log("✅ Server is running on http://localhost:8081");
});

// ✅ Connect to MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'abdushekur',
  password: 'abdushekur',
  database: 'database1'
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    console.log("✅ MySQL connected successfully!");
  }
});

// ✅ Fetch all students
app.get('/', (req, res) => {
  const sql = "SELECT * FROM student";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching students:", err);
      return res.status(500).send(err);
    }
    res.send(result);
  });
});

//  Adding new student
app.post('/student', (req, res) => {
  const sql = "INSERT INTO student (Name, Email) VALUES (?, ?)";
   const values =[req.body.Name,req.body.Email];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Insert error:", err);
      return res.status(500).send(err);
    }
    console.log("✅ Inserted successfully:", result);
    res.send(result);
  });
});

// viewing or reading from database
app.get("/student/:id", (req, res) => {
  const sql = "SELECT * FROM student WHERE ID = ?";
  const { id } = req.params;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error fetching student:", err);
      return res.status(500).send(err);
    }

    if (result.length === 0) {
      return res.status(404).send({ message: "Student not found" });
    }

    res.status(200).send(result); // 
  });
});

// updating the data

app.put("/Update/:id", (req, res) => {
  const { id } = req.params;
  const { Name, Email } = req.body;

  const sql = "UPDATE student SET Name = ?, Email = ? WHERE ID = ?";
  db.query(sql, [Name, Email, id], (err, result) => {
    if (err) {
      console.error("Error updating student:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student updated successfully" });
  });
});


// deleting the data
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM student WHERE ID = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting student:", err);
      return res.status(500).json({ message: "Database error" });
    }
    return res.json({ message: "Student deleted successfully" });
  });
});
