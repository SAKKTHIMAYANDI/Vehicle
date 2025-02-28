import React, { useState, useEffect } from "react";
import { fetchIssues, fetchComponents, fetchServices, addService } from "../api";
import { useNavigate } from "react-router-dom";

const Invoices = () => {
    const [issues, setIssues] = useState([]); 
    const [components, setComponents] = useState([]); 
    const [invoices, setInvoices] = useState([]); 

    const [selectedIssue, setSelectedIssue] = useState(""); 
    const [selectedComponent, setSelectedComponent] = useState(""); 
    const [quantity, setQuantity] = useState(1);
    const [laborCost, setLaborCost] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();

    // Fetch Data on Component Mount
    useEffect(() => {
        const loadData = async () => {
            try {
                const issuesResponse = await fetchIssues();
                console.log("Issues Response:", issuesResponse);
                setIssues(issuesResponse || []);

                const componentsResponse = await fetchComponents();
                console.log("Components Response:", componentsResponse);
                setComponents(componentsResponse || []);

                const invoicesResponse = await fetchServices();
                console.log("Invoices Response:", invoicesResponse?.data);
                setInvoices(invoicesResponse?.data || []);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        loadData();
    }, []);

    // Update Total Price When Quantity or Labor Cost Changes
    useEffect(() => {
        if (selectedComponent) {
            const component = components.find(comp => comp.id === parseInt(selectedComponent, 10));
            const componentPrice = component ? parseFloat(component.price) : 0;
            setTotalPrice((componentPrice * quantity) + laborCost);
        }
    }, [selectedComponent, quantity, laborCost, components]);

    // Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!selectedIssue || !selectedComponent) {
            alert("Please select an issue and a component.");
            return;
        }
    
        // Convert IDs to integers to match Django expectations
        const newInvoice = {
            issue: parseInt(selectedIssue, 10),  // Ensure it's an integer
            component: parseInt(selectedComponent, 10),
            quantity: parseInt(quantity, 10),
            labor_cost: parseFloat(laborCost),
            total_price: parseFloat(totalPrice),
        };
    
        console.log("Sending Invoice Data:", newInvoice);  // Debugging
        const response = await addService(newInvoice);
        console.log("Invoice values Response:", response.data);
        if (response?.data) {
            setInvoices([...invoices, response.data]);
        }
        // try {
        //     const response = await addService(newInvoice);
        //     console.log("Response:", response?.data);
    
        //     if (response?.data) {
        //         setInvoices([...invoices, response.data]);
        //     }
        // } catch (error) {
        //     console.error("Error adding invoice:", error);
        //     if (error.response) {
        //         console.error("Response Status:", error.response.status);
        //         console.error("Response Data:", error.response.data);
        //     }
        // }
    };
    
    

    return (
        <div>
            <h2>Generate Invoice</h2>
            <form onSubmit={handleSubmit}>
                {/* Issue Dropdown */}
                <label>Issue:</label>
                <select value={selectedIssue} onChange={(e) => setSelectedIssue(e.target.value)} required>
                    <option value="">Select Issue</option>
                    {issues.map(issue => (
                        <option key={issue.id} value={issue.id}>
                            {issue.description} (Vehicle: {issue.vehicle})
                        </option>
                    ))}
                </select>

                {/* Component Dropdown */}
                <label>Component:</label>
                <select value={selectedComponent} onChange={(e) => setSelectedComponent(e.target.value)} required>
                    <option value="">Select Component</option>
                    {components.map(comp => (
                        <option key={comp.id} value={comp.id}>
                            {comp.name} - ${comp.price}
                        </option>
                    ))}
                </select>
                <br/>
                
                {/* Quantity */}
                <label>Quantity:</label>
                <input
                    type="number"
                    value={quantity}
                    min="1"
                    onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                    required
                />

                {/* Labor Cost */}
                <label>Labor Cost ($):</label>
                <input
                    type="number"
                    value={laborCost}
                    min="0"
                    step="0.01"
                    onChange={(e) => setLaborCost(parseFloat(e.target.value))}
                    required
                />

                {/* Total Price (Read-Only) */}
                <label>Total Price ($):</label>
                <input type="text" value={totalPrice.toFixed(2)} readOnly />

                <button type="submit">Create Invoice</button>
                <button type="button" onClick={() => navigate("/view-invoices")}>View Invoices</button>

            </form>

            {/* Display Invoices */}
            {/* <h3>Invoices</h3>
            {invoices.length > 0 ? (
                <ul>
                    {invoices.map((invoice, index) => (
                        <li key={index}>
                            Issue {invoice.issue} | Component {invoice.component} | Quantity: {invoice.quantity} |
                            Labor: ${invoice.labor_cost} | Total: ${invoice.total_price}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No invoices generated yet.</p>
            )} */}
        </div>
    );
};

export default Invoices;
