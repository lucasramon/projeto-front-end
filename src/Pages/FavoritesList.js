import React from "react";
import { Navigate } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";
import { useAuth } from "../hooks/auth";
const Dashboard = () => {
    const { logout } = useAuth();
    return (
        <div>
            <p>Welcome to your Dashboard</p>
            <Button
                onClick={logout}
                sx={{ marginTop: 3, borderRadius: 3 }}>
                {'Sair'}
            </Button>
        </div>
    );
};
export default Dashboard;