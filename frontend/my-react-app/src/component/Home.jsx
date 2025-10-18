import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css"; // optional for styling

function Home() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/")
      .then((res) => setStudents(res.data))
      .catch((err) => {
        console.error("Error fetching students:", err);
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: "Could not fetch student list.",
        });
      });
  }, []);

  const handleDelete = (id) => {
    // ✅ Modern animated confirmation popup
    Swal.fire({
      title: "Are you sure?",
      text: "This student will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete("http://localhost:8081/delete/" + id)
          .then(() => {
            setStudents(students.filter((student) => student.ID !== id));

            // ✅ Success popup after deletion
            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: "The student has been deleted.",
              timer: 1500,
              showConfirmButton: false,
              showClass: {
                popup: "animate__animated animate__fadeInDown",
              },
              hideClass: {
                popup: "animate__animated animate__fadeOutUp",
              },
            });
          })
          .catch((err) => {
            console.error(err);
            Swal.fire({
              icon: "error",
              title: "Error!",
              text: "Failed to delete student.",
            });
          });
      }
    });
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Student List</h2>
        <Link to="/create" className="btn btn-primary">
          ➕ Create Student
        </Link>
      </div>

      <table className="table table-bordered table-striped">
        <thead className="table-primary">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student.ID}>
                <td>{student.ID}</td>
                <td>{student.Name}</td>
                <td>{student.Email}</td>
                <td>
                  <Link
                    to={`/Read/${student.ID}`}
                    className="btn btn-info btn-sm me-2"
                  >
                    View
                  </Link>
                  <Link
                    to={`/Update/${student.ID}`}
                    className="btn btn-warning btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(student.ID)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No students found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Home;

