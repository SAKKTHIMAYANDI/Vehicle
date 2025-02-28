import React, { useState, useEffect } from "react";
import { fetchIssues, deleteIssue } from "../api";
import { useNavigate } from "react-router-dom";  // Import useNavigate

const ViewIssues = () => {
    const [issues, setIssues] = useState([]);
    const navigate = useNavigate();  // Initialize navigate function

    useEffect(() => {
        fetchIssues()
            .then(response => {
                if (Array.isArray(response)) {
                    setIssues(response);
                } else {
                    console.error("Expected an array but got:", response);
                    setIssues([]);
                }
            })
            .catch(error => {
                console.error("Error fetching issues:", error);
                setIssues([]);
            });
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this issue?");
        if (!confirmDelete) return;

        try {
            await deleteIssue(id);
            setIssues(prevIssues => prevIssues.filter(issue => issue.id !== id));
            alert("Issue deleted successfully!");
        } catch (error) {
            console.error("Failed to delete issue:", error);
            alert("Error deleting issue!");
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit-issue/${id}`);  // Redirect to the edit page
    };

    return (
        <div>
            <h2>All Reported Issues</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Vehicle</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Reported Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {issues.length > 0 ? (
                        issues.map((issue) => (
                            <tr key={issue.id}>
                                <td>{issue.owner_name}</td>
                                <td>{issue.description}</td>
                                <td>{issue.status || "Pending"}</td>
                                <td>{issue.reported_date ? new Date(issue.reported_date).toLocaleString() : "Just now"}</td>
                                <td>
                                    <button onClick={() => handleEdit(issue.id)}>Edit</button>
                                    <button onClick={() => handleDelete(issue.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No issues reported yet.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ViewIssues;
