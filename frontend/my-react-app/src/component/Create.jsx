import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"; // ✅ modern popup

function Create() {
  const [values, setValues] = useState({ Name: "", Email: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8081/student", values)
      .then(() => {
        // ✅ SweetAlert success popup
        Swal.fire({
          icon: "success",
          title: "Student Created!",
          text: "The student has been created successfully.",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => navigate("/")); // Navigate after popup closes
      })
      .catch((err) => {
        console.error("Error:", err);
        // ✅ SweetAlert error popup
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: "Could not create the student. Please try again.",
        });
      });
  };

  return (
    <div className="d-flex flex-column align-items-center mt-5">
      <div className="bg-white p-4 rounded shadow" style={{ width: "400px" }}>
        <h2 className="text-center text-primary mb-4">Create Student</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter student name"
              value={values.Name}
              onChange={(e) => setValues({ ...values, Name: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter student email"
              value={values.Email}
              onChange={(e) => setValues({ ...values, Email: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Create;
