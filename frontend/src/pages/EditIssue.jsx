import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchIssues, updateIssue } from "../api"; 

const EditIssue = () => {
    const { id } = useParams();  // Get the issue ID from the URL
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        owner_name: "",
        description: "",
        status: "",
    });

    useEffect(() => {
        fetchIssues().then(issue => {
                console.log("issue: ",issue)
                const comp = issue.find(c => c.id === parseInt(id, 10));
                if (comp) setFormData(comp);
            });
        }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateIssue(id, formData);
            alert("Issue updated successfully!");
            navigate("/");  // Redirect to the issue list page
        } catch (error) {
            console.error("Error updating issue:", error);
            alert("Failed to update issue.");
        }
    };

    return (
        <div>
            <h2>Edit Issue</h2>
            <form onSubmit={handleSubmit}>
                <label>Owner Name:</label>
                <input type="text" name="owner_name" value={formData.owner_name} onChange={handleChange} required />

                <label>Description:</label>
                <textarea name="description" value={formData.description} onChange={handleChange} required />

                <label>Status:</label>
                <select name="status" value={formData.status} onChange={handleChange}>
                    <option value="Pending">Pending</option>
                    <option value="Resolved">Resolved</option>
                    <option value="In Progress">In Progress</option>
                </select>

                <button type="submit">Update Issue</button>
            </form>
        </div>
    );
};

export default EditIssue;
