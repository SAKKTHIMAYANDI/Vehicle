import React, { useState, useEffect } from "react";
import { fetchComponents, addComponent } from "../api";
import { useNavigate } from "react-router-dom";

const Components = () => {
    const [components, setComponents] = useState([]); // Always initialize with an empty array
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const navigate = useNavigate();

    // Fetch components from API when the component mounts
    useEffect(() => {
        fetchComponents()
            .then(response => {
                console.log("Fetched Components:", response.data); // Debugging
                if (Array.isArray(response.data)) {
                    setComponents(response.data);
                } else {
                    console.error("Expected an array but got:", response.data);
                    setComponents([]); // Fallback to an empty array
                }
            })
            .catch(error => {
                console.error("Error fetching components:", error);
                setComponents([]); // Ensure it's always an array
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !price) {
            alert("Please enter both name and price!");
            return;
        }

        const newComponent = { name, price };

        try {
            await addComponent(newComponent);
            setComponents(prevComponents => [...prevComponents, newComponent]); // Update UI
            setName("");
            setPrice("");
        } catch (error) {
            console.error("Failed to add component:", error);
        }
    };

    const handleEdit = (component) => {
        setEditingId(component.id);
        setName(component.name);
        setPrice(component.price);
    };

    const handleDelete = async (id) => {
        try {
            await deleteComponent(id);
            setComponents(prevComponents => prevComponents.filter(comp => comp.id !== id));
        } catch (error) {
            console.error("Failed to delete component:", error);
        }
    };

    return (
        <div>
            <h2>Component Management</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Component Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                />
                <input 
                    type="number" 
                    placeholder="Price" 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)} 
                    required 
                />
                <div>
                    <button type="submit">Add Component</button>
                    <button type="button" onClick={() => navigate("/view-components")}>View</button>
                </div>
                    
                <div>

                </div>
            </form>
            
            <table border="1" >
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
                                    <button onClick={() => handleEdit(component)}>Edit</button>
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

export default Components;
