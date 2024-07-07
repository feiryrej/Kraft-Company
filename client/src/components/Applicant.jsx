import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./style.css"; // Import the CSS file

const Applicant = () => {
  const [applicants, setApplicants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchApplicants();
  }, []);

  useEffect(() => {
    setFilteredApplicants(
      applicants.filter((applicant) =>
        applicant.Applicant_ID.toString().includes(searchTerm)
      )
    );
  }, [searchTerm, applicants]);

  const fetchApplicants = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/auth/get_applicants"
      );
      if (response.data.status === "Success") {
        setApplicants(response.data.applicants);
      } else {
        setError(response.data.error || "Failed to fetch applicants");
      }
    } catch (error) {
      console.error("Error fetching applicants:", error);
      setError("Failed to fetch applicants");
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this applicant?"
      );
      if (!confirmDelete) {
        return;
      }

      const response = await axios.delete(
        `http://localhost:3000/auth/auth/delete_applicant/${id}`
      );
      if (response.status === 200) {
        fetchApplicants();
      }
    } catch (error) {
      console.error("Error deleting applicant:", error);
      setError("Failed to delete applicant");
    }
  };

  const handlePrint = (applicant) => {
    const printContent = `
      <div>
        <h2>Applicant Details</h2>
        <p><strong>ID:</strong> ${applicant.Applicant_ID}</p>
        <p><strong>Name:</strong> ${applicant.Name}</p>
        <p><strong>SSS Number:</strong> ${applicant.SSS_number}</p>
        <p><strong>Address:</strong> ${applicant.Address}</p>
        <p><strong>Phone Number:</strong> ${applicant.Phone_No}</p>
        <p><strong>Email:</strong> ${applicant.Email}</p>
      </div>
    `;

    const newWindow = window.open("", "", "width=800,height=600");
    newWindow.document.write(printContent);
    newWindow.document.close();
    newWindow.print();
  };

  return (
    <div className="floating-panel">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 style={{ color: 'white' }}>Applicant List</h3>
        <Link to="/dashboard/add_applicant" className="btn btn-success">
          Add Applicant
        </Link>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search by Applicant ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>SSS Number</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplicants.map((applicant) => (
              <tr key={applicant.Applicant_ID}>
                <td>{applicant.Applicant_ID}</td>
                <td>{applicant.Name}</td>
                <td>{applicant.SSS_number}</td>
                <td>{applicant.Address}</td>
                <td>{applicant.Phone_No}</td>
                <td>{applicant.Email}</td>
                <td>
                  <div className="btn-group" role="group">
                    <Link
                      to={`/dashboard/edit_applicant/${applicant.Applicant_ID}`}
                      className="btn btn-info btn-sm"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleDelete(applicant.Applicant_ID)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => handlePrint(applicant)}
                    >
                      Print
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Applicant;
