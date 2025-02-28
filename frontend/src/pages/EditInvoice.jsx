import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchServices, updateInvoice } from "../api";  // Ensure these API functions exist

const EditInvoice = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        issue_description: "",
        component_name: "",
        quantity: "",
        labor_cost: "",
        total_price: "",
    });

    useEffect(() => {
        fetchServices().then(invoice => {
            const comp = invoice.find(c => c.id === parseInt(id, 10));
            if (comp) setFormData(comp);
        });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let updatedFormData = { ...formData, [name]: value };

        // Update total_price by adding the new labor_cost value
        if (name === "labor_cost") {
            const newLaborCost = parseFloat(value) || 0;
            const initialTotal = parseFloat(formData.total_price) || 0;
            const initialLaborCost = parseFloat(formData.labor_cost) || 0;

            // Calculate new total price (subtract old labor cost, add new labor cost)
            updatedFormData.total_price = initialTotal - initialLaborCost + newLaborCost;
        }

        setFormData(updatedFormData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateInvoice(id, formData);
            alert("Invoice updated successfully!");
            navigate("/");  // Redirect to invoice list
        } catch (error) {
            console.error("Error updating invoice:", error);
            alert("Failed to update invoice.");
        }
    };

    return (
        <div>
            <h2>Edit Invoice</h2>
            <form onSubmit={handleSubmit}>
                <label>Issue Description:</label>
                <input type="text" name="issue_description" value={formData.issue_description} onChange={handleChange} required />

                <label>Component Name:</label>
                <input type="text" name="component_name" value={formData.component_name} onChange={handleChange} required />

                <label>Quantity:</label>
                <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />

                <label>Labor Cost:</label>
                <input type="number" name="labor_cost" value={formData.labor_cost} onChange={handleChange} required />

                <label>Total Price:</label>
                <input type="number" name="total_price" value={formData.total_price} readOnly />

                <button type="submit">Update Invoice</button>
            </form>
        </div>
    );
};

export default EditInvoice;
