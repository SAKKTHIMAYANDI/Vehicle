import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchComponents, updateComponent } from "../api";

const EditComponent = () => {
    const { id } = useParams();  // Get component ID from URL
    const navigate = useNavigate();  // Initialize navigation
    const [component, setComponent] = useState({ name: "", price: "" });

    useEffect(() => {
        fetchComponents().then(components => {
            const comp = components.find(c => c.id === parseInt(id, 10));
            if (comp) setComponent(comp);
        });
    }, [id]);

    const handleChange = (e) => {
        setComponent({ ...component, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateComponent(id, component);
        navigate("/");  // Redirect back to the list
    };

    return (
        <div>
            <h2>Edit Component</h2>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" name="name" value={component.name} onChange={handleChange} required />
                <br />
                <label>Price ($):</label>
                <input type="number" name="price" value={component.price} onChange={handleChange} required />
                <br />
                <button type="submit">Update Component</button>
                <button type="button" onClick={() => navigate("/")}>Cancel</button>
            </form>
        </div>
    );
};

export default EditComponent;
