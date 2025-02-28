import React, { useState, useEffect } from "react";
import { fetchComponents, deleteComponent } from "../api";
import { useNavigate } from "react-router-dom";  // Import useNavigate

const ViewComponents = () => {
    const [components, setComponents] = useState([]);
    const navigate = useNavigate();  // Initialize navigation

    useEffect(() => {
        fetchComponents()
            .then(response => {
                if (Array.isArray(response)) {
                    setComponents(response);
                } else {
                    console.error("Expected an array but got:", response);
                    setComponents([]);
                }
            })
            .catch(error => {
                console.error("Error fetching components:", error);
                setComponents([]);
            });
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteComponent(id);
            setComponents(prevComponents => prevComponents.filter(comp => comp.id !== id));
        } catch (error) {
            console.error("Failed to delete component:", error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);  // Redirect to edit page
    };

    return (
        <div>
            <h2>All Components</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {components.length > 0 ? (
                        components.map((component) => (
                            <tr key={component.id}>
                                <td>{component.name}</td>
                                <td>${component.price}</td>
                                <td>
                                    <button onClick={() => handleEdit(component.id)}>Edit</button>
                                    <button onClick={() => handleDelete(component.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No components found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ViewComponents;
