import React, { useState, useEffect } from "react";
import { fetchVehicles, addVehicle } from "../api"; // Ensure correct API calls
import { useNavigate } from "react-router-dom";

const Vehicles = () => {
    const [vehicles, setVehicles] = useState([]); // Ensure vehicles is an array
    const [vehicleId, setVehicleId] = useState(""); 
    const [ownerName, setOwnerName] = useState(""); 
    const [contactNumber, setContactNumber] = useState("");
    const navigate = useNavigate();

    // Fetch Vehicles on Component Mount
    useEffect(() => {
        const loadVehicles = async () => {
            try {
                const response = await fetchVehicles();
                setVehicles(response?.data || []); // Ensure response is an array
            } catch (error) {
                console.error("Error fetching vehicles:", error);
                setVehicles([]); // Fallback to empty array
            }
        };
        loadVehicles();
    }, []);

    // Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newVehicle = { vehicle_id: vehicleId, owner_name: ownerName, contact_number: contactNumber };
            const response = await addVehicle(newVehicle);

            if (response?.data) {
                setVehicles([...vehicles, response.data]); // Update UI with API response
            } else {
                setVehicles([...vehicles, newVehicle]); // Fallback if no data returned
            }

            // Clear input fields
            setVehicleId("");
            setOwnerName("");
            setContactNumber("");
        } catch (error) {
            console.error("Error adding vehicle:", error);
        }
    };

    return (
        <div>
            <h2>Vehicle Management</h2>
            <form onSubmit={handleSubmit}>
                <label>Vehicle ID:</label>
                <input 
                    type="text" 
                    placeholder="Enter Vehicle ID" 
                    value={vehicleId} 
                    onChange={(e) => setVehicleId(e.target.value)} 
                    required 
                />
                
                <label>Owner Name:</label>
                <input 
                    type="text" 
                    placeholder="Enter Owner Name" 
                    value={ownerName} 
                    onChange={(e) => setOwnerName(e.target.value)} 
                    required 
                />
                
                <label>Contact Number:</label>
                <input 
                    type="tel" 
                    placeholder="Enter Contact Number" 
                    value={contactNumber} 
                    onChange={(e) => setContactNumber(e.target.value)} 
                    required 
                />
                
                <button type="submit">Add Vehicle</button>
                <button type="button" onClick={() => navigate("/view-vehicles")}>View Vehicles</button>

            </form>
            
            {/* Ensure vehicles is an array before mapping */}
            {vehicles.length > 0 ? (
                <ul>
                    {vehicles.map((vehicle, index) => (
                        <li key={index}>
                            <strong>ID:</strong> {vehicle.vehicle_id} | 
                            <strong> Owner:</strong> {vehicle.owner_name} | 
                            <strong> Contact:</strong> {vehicle.contact_number}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No vehicles found.</p>
            )}
        </div>
    );
};

export default Vehicles;
