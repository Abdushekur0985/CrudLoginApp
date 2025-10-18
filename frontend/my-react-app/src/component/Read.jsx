import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function Read() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    ID: "",
    Name: "",
    Email: ""
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/student/${id}`)
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data[0] : res.data;

        if (data) {
          setStudent({
            ID: data.ID || "",
            Name: data.Name || "",
            Email: data.Email || ""
          });
        } else {
          Swal.fire({
            icon: "warning",
            title: "No Data",
            text: `No student found with ID: ${id}`
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching student:", err);
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch student details!"
        });
      });
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center mt-5">
        <h4>⏳ Loading student data...</h4>
      </div>
    );
  }

  const handleEdit = () => {
    Swal.fire({
      title: "Edit Student?",
      text: "Do you want to edit this student's details?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, edit",
      cancelButtonText: "No, cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/update/${id}`);
      }
    });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-3">Student Details</h2>
      <p><strong>ID:</strong> {student.ID}</p>
      <p><strong>Name:</strong> {student.Name}</p>
      <p><strong>Email:</strong> {student.Email}</p>

      <div className="mt-3">
        <Link to="/" className="btn btn-secondary me-2">
          Back
        </Link>
        <button
          onClick={handleEdit}
          className="btn btn-primary"
        >
          Edit
        </button>
      </div>
    </div>
  );
}

export default Read;


;


