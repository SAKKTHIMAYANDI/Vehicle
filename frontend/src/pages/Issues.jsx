import React, { useState, useEffect } from "react";
import { fetchIssues, addIssue, fetchVehicles } from "../api";
import { useNavigate } from "react-router-dom";

const Issues = () => {
    const [issues, setIssues] = useState([]);
    const [vehicles, setVehicles] = useState([]); 
    const [vehicleId, setVehicleId] = useState(""); // Ensure it's a string initially
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const loadData = async () => {
            try {
                const vehiclesResponse = await fetchVehicles();
                console.log("Vehicles Response:", vehiclesResponse);

                setVehicles(vehiclesResponse || []);
            } catch (error) {
                console.error("Error fetching vehicles:", error);
            }
        };
        loadData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!vehicleId) {
            alert("Please select a vehicle.");
            return;
        }

        // Convert vehicleId to integer
        const newIssue = { 
            vehicle: parseInt(vehicleId, 10), // Ensure it's an integer
            description 
        };
        console.log("Sending Issue Data:", newIssue);

        try {
            const response = await addIssue(newIssue);
            console.log("Response Data:", response?.data);

            if (response?.data) {
                setIssues([...issues, response.data]);
            } else {
                setIssues([...issues, { ...newIssue, status: "Pending", reported_date: new Date() }]);
            }

            setDescription("");
        } catch (error) {
            console.error("Error adding issue:", error);
            if (error.response) {
                console.error("Response Status:", error.response.status);
                console.error("Response Data:", error.response.data);
            }
        }
    };

    return (
        <div>
            <h2>Report Vehicle Issues</h2>
            <form onSubmit={handleSubmit}>
                <select value={vehicleId} onChange={(e) => setVehicleId(e.target.value)} required>
                    <option value="">Select Vehicle</option>
                    {vehicles.map((vehicle) => (
                        <option key={vehicle.id} value={vehicle.id}>
                            {vehicle.id} - {vehicle.owner_name}
                        </option>
                    ))}
                </select>

                <input 
                    type="text" 
                    placeholder="Issue Description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    required 
                />
                
                <button type="submit">Report Issue</button>
                <button type="button" onClick={() => navigate("/view-issues")}>View Issues</button>

            </form>

            {issues.length > 0 ? (
                <ul>
                    {issues.map((issue) => (
                        <li key={issue.id || issue.vehicle}>
                            <strong>Vehicle:</strong> {issue.vehicle} <br />
                            <strong>Description:</strong> {issue.description} <br />
                            <strong>Status:</strong> {issue.status || "Pending"} <br />
                            <strong>Reported:</strong> {issue.reported_date ? new Date(issue.reported_date).toLocaleString() : "Just now"}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No issues reported yet.</p>
            )}
        </div>
    );
};

export default Issues;
