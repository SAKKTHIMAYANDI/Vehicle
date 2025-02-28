import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/";

// Fetch functions
export const fetchComponents = async () => {
    console.log("Conecte")
    const response = await axios.get(`${API_URL}components/`);
    return response.data;
};

export const fetchVehicles = async () => {
    const response = await axios.get(`${API_URL}vehicles/`);
    console.log(" VAlues for the APi: ",response.data)
    return response.data;
};

export const updateVehicle = async (id, vehicleData) => {
    return await axios.put(`http://127.0.0.1:8000/api/vehicles/${id}/`, vehicleData, {
        headers: { "Content-Type": "application/json" },
    });
};

// Delete a vehicle
export const deleteVehicle = (id) => {
    return axios.delete(`${API_URL}vehicles/${id}/`);
};

export const fetchIssues = async () => {
    const response = await axios.get(`${API_URL}issues/`);
    return response.data;
};

export const fetchServices = async () => {
    const response = await axios.get(`${API_URL}services/`);
    return response.data;
};

export const addComponent = async (componentData) => {
    const response = await axios.post(`${API_URL}components/`, componentData);
    return response.data;
};

// Update an existing component
export const updateComponent = (id, updatedComponent) => {
    return axios.put(`${API_URL}components/${id}/`, updatedComponent);
};

// Delete a component
export const deleteComponent = (id) => {
    return axios.delete(`${API_URL}components/${id}/`);
};

export const addVehicle = async (vehicleData) => {
    const response = await axios.post(`${API_URL}vehicles/`, vehicleData);
    return response.data;
};

export const addIssue = async (issueData) => {
    console.log("API_URL: ",API_URL)
    const response = await axios.post(`${API_URL}issues/`, issueData);
    return response.data;
};


export const updateIssue = async (id, updatedIssue) => {
    return axios.put(`${API_URL}issues/${id}/`, updatedIssue);
};

// Delete a component
export const deleteIssue = (id) => {
    return axios.delete(`${API_URL}issues/${id}/`);
};
// export const addService = async (serviceData) => {
//     // console.log("serviceData: ",serviceData)
//     const response = await axios.post(`${API_URL}services/`, serviceData);
//     // console.log("APIJS values: ",response)
//     return response.data;
// };

export const addService = async (serviceData) => {
    try {
        const response = await axios.post("http://127.0.0.1:8000/api/services/", serviceData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response;
    } catch (error) {
        console.error("Error adding service:", error);
        if (error.response) {
            console.error("Response Data:", error.response.data);
        }
        throw error;
    }
};

export const updateInvoice = async (id, updatedData) => {
    return axios.put(`${API_URL}services/${id}/`, updatedData);
};
export const deleteInvoice = (id) => {
    console.log("deleted function invoice")
    return axios.delete(`${API_URL}services/${id}/`);
};
