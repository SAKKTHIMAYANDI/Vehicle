import React, { useState, useEffect } from "react";
import { fetchServices, deleteInvoice } from "../api";
import { useNavigate } from "react-router-dom";  // Import useNavigate

const ViewInvoices = () => {
    const [invoices, setInvoices] = useState([]);
    const navigate = useNavigate();  // Initialize navigate

    useEffect(() => {
        fetchServices()
            .then(response => {
                console.log(response);
                if (Array.isArray(response)) {
                    setInvoices(response);
                } else {
                    console.error("Expected an array but got:", response);
                    setInvoices([]);
                }
            })
            .catch(error => {
                console.error("Error fetching invoices:", error);
                setInvoices([]);
            });
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this invoice?");
        if (!confirmDelete) return;

        try {
            await deleteInvoice(id);
            setInvoices(prevInvoices => prevInvoices.filter(invoice => invoice.id !== id));
            alert("Invoice deleted successfully!");
        } catch (error) {
            console.error("Failed to delete invoice:", error);
            alert("Error deleting invoice!");
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit-invoice/${id}`);  // Redirect to edit page
    };

    return (
        <div>
            <h2>All Invoices</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Issue</th>
                        <th>Component</th>
                        <th>Quantity</th>
                        <th>Labor Cost</th>
                        <th>Total Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.length > 0 ? (
                        invoices.map((invoice) => (
                            <tr key={invoice.id}>
                                <td>{invoice.issue_description}</td>
                                <td>{invoice.component_name}</td>
                                <td>{invoice.quantity}</td>
                                <td>${invoice.labor_cost}</td>
                                <td>${invoice.total_price}</td>
                                <td>
                                    <button onClick={() => handleEdit(invoice.id)}>Edit</button>
                                    <button onClick={() => handleDelete(invoice.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No invoices found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ViewInvoices;
