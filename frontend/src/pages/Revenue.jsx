import React, { useState, useEffect } from "react";
import { fetchServices } from "../api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, AreaChart, CartesianGrid, Area, ResponsiveContainer } from "recharts";

const RevenueChart = () => {
    const [dailyData, setDailyData] = useState([]);
    const [monthlyData, setMonthlyData] = useState([]);
    const [yearlyData, setYearlyData] = useState([]);

    useEffect(() => {
        fetchServices().then(response => {
            console.log("Raw API Response:", response);

            const services = Array.isArray(response) ? response : response.data || [];

            if (!services || services.length === 0) {
                console.warn("No data received.");
                return;
            }

            console.log("Processed Services:", services);

            // Initialize maps
            const dailyMap = {};
            const monthlyMap = {};
            const yearlyMap = {};

            services.forEach(service => {
                if (!service.total_price || !service.id) return; // Ensure valid data

                const date = new Date().toISOString().split("T")[0]; // Mock current date
                const month = date.slice(0, 7); // Extract YYYY-MM
                const year = date.slice(0, 4); // Extract YYYY
                const revenue = parseFloat(service.total_price) || 0;

                // Aggregate Revenue
                dailyMap[date] = (dailyMap[date] || 0) + revenue;
                monthlyMap[month] = (monthlyMap[month] || 0) + revenue;
                yearlyMap[year] = (yearlyMap[year] || 0) + revenue;
            });

            // Convert objects to arrays for Recharts
            setDailyData(Object.keys(dailyMap).map(date => ({ date, revenue: dailyMap[date] })));
            setMonthlyData(Object.keys(monthlyMap).map(month => ({ date, revenue: monthlyMap[month] })));
            setYearlyData(Object.keys(yearlyMap).map(year => ({ date, revenue: yearlyMap[year] })));

        }).catch(error => {
            console.error("Error fetching services:", error);
        });
    }, []);

    return (
        <div>
            <h2>Daily Revenue</h2>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={dailyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorDaily" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" />
                    <YAxis tick={{ fontSize: 12 }} />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="revenue" stroke="#8884d8" fillOpacity={1} fill="url(#colorDaily)" />
                </AreaChart>
            </ResponsiveContainer>

            <h2>Monthly Revenue</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenue" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>

            <h2>Yearly Revenue</h2>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={yearlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorYearly" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#ffc658" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" />
                    <YAxis tick={{ fontSize: 12 }} />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="revenue" stroke="#ffc658" fillOpacity={1} fill="url(#colorYearly)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RevenueChart;
