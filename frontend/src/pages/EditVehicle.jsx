import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchVehicles, updateVehicle } from "../api";

const EditVehicle = () => {
    const { id } = useParams();  // Get vehicle ID from URL
    const navigate = useNavigate();  // Navigation hook
    const [vehicle, setVehicle] = useState({ vehicle_id: "", owner_name: "", contact_number: "" });

    useEffect(() => {
        fetchVehicles().then(vehicles => {
            const foundVehicle = vehicles.find(v => v.id === parseInt(id, 10));
            if (foundVehicle) setVehicle(foundVehicle);
        });
    }, [id]);

    const handleChange = (e) => {
        setVehicle({ ...vehicle, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateVehicle(id, vehicle);
        navigate("/");  // Redirect back to vehicle list
    };

    return (
        <div>
            <h2>Edit Vehicle</h2>
            <form onSubmit={handleSubmit}>
                <label>Vehicle ID:</label>
                <input type="text" name="vehicle_id" value={vehicle.vehicle_id} onChange={handleChange} required />
                <br />
                <label>Owner Name:</label>
                <input type="text" name="owner_name" value={vehicle.owner_name} onChange={handleChange} required />
                <br />
                <label>Contact Number:</label>
                <input type="text" name="contact_number" value={vehicle.contact_number} onChange={handleChange} required />
                <br />
                <button type="submit">Update Vehicle</button>
                <button type="button" onClick={() => navigate("/")}>Cancel</button>
            </form>
        </div>
    );
};

export default EditVehicle;
