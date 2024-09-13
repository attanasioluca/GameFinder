import React, { useEffect } from "react";
import usePost from "../hooks/usePost";
import { useNavigate } from "react-router-dom";

const GoogleLoginPage = () => {
    const navigate = useNavigate();
    const { data, error, post } = usePost(
        "http://localhost:3000/getGoogleToken"
    );
    const func = async () => {
        try {
            await post({});
            console.log("post complete, token:", data)
        } catch (err) {
            console.error("Error adding game", err);
        }
    };
    func();
    if (data) {
        localStorage.setItem("token", data as string);
        navigate("/");
    }
    return <></>;
};

export default GoogleLoginPage;
