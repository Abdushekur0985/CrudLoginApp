import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function Update() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    Name: "",
    Email: "",
  });

  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch student data
    axios
      .get("http://localhost:8081/Read/" + id)
      .then((res) => {
        setValues(res.data[0]);
        setLoading(false);

        // ✅ Confirmation to go to update page (optional)
        Swal.fire({
          icon: "question",
          title: "Go to Update Page?",
          text: "Do you want to update this student's data?",
          showCancelButton: true,
          confirmButtonText: "Yes, go to update!",
          cancelButtonText: "No, stay here",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/update/" + id);
          } else {
            Swal.fire("Cancelled", "You stayed on the current page.", "info");
          }
        });
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        Swal.fire({
          icon: "question",
          title: "are you sure?",
          text: "going to update!",
        });
      });
  }, [id, navigate]);

  // ✅ Show loading while fetching data
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        ⏳ Loading student data...
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:8081/Update/" + id, values)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Student details have been updated successfully.",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => navigate("/"));
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to update student. Please try again.",
        });
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center text-primary">Update Student</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow"
        style={{ maxWidth: "450px", margin: "0 auto" }}
      >
        <div className="mb-3">
          <label className="form-label fw-bold">Name:</label>
          <input
            type="text"
            className="form-control"
            value={values.Name}
            onChange={(e) => setValues({ ...values, Name: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Email:</label>
          <input
            type="email"
            className="form-control"
            value={values.Email}
            onChange={(e) => setValues({ ...values, Email: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn btn-success w-100">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default Update;

