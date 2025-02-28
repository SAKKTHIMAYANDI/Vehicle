import React, { useState, useEffect } from "react";
import { fetchServices } from "../api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const RevenueChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchServices().then(response => {
            const chartData = response.data.map(service => ({
                date: service.created_at.split("T")[0],
                revenue: parseFloat(service.total_cost),
            }));
            setData(chartData);
        });
    }, []);

    return (
        <BarChart width={600} height={300} data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="#8884d8" />
        </BarChart>
    );
};

export default RevenueChart;
