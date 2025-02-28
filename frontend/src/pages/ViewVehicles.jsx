import React, { useState, useEffect } from "react";
import { fetchVehicles, deleteVehicle } from "../api";
import { useNavigate } from "react-router-dom";  // Import useNavigate

const ViewVehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const navigate = useNavigate();  // Initialize navigation

    useEffect(() => {
        fetchVehicles()
            .then(response => {
                console.log("response: ", response);
                if (Array.isArray(response)) {
                    setVehicles(response);
                } else {
                    console.error("Expected an array but got:", response);
                    setVehicles([]);
                }
            })
            .catch(error => {
                console.error("Error fetching vehicles:", error);
                setVehicles([]);
            });
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this vehicle?");
        if (!confirmDelete) return;

        try {
            await deleteVehicle(id);
            setVehicles(prevVehicles => prevVehicles.filter(vehicle => vehicle.id !== id));
            alert("Vehicle deleted successfully!");
        } catch (error) {
            console.error("Failed to delete vehicle:", error);
            alert("Error deleting vehicle!");
        }
    };

    const handleEdit = (id) => {
        navigate(`/api/vehicles/${id}`);  // Redirect to edit page
    };

    return (
        <div>
            <h2>All Vehicles</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Vehicle ID</th>
                        <th>Owner Name</th>
                        <th>Contact Number</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {vehicles.length > 0 ? (
                        vehicles.map((vehicle) => (
                            <tr key={vehicle.id}>
                                <td>{vehicle.vehicle_id}</td>
                                <td>{vehicle.owner_name}</td>
                                <td>{vehicle.contact_number}</td>
                                <td>
                                    <button onClick={() => handleEdit(vehicle.id)}>Edit</button>
                                    <button onClick={() => handleDelete(vehicle.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No vehicles found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ViewVehicles;
