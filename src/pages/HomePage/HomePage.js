import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function HomePage(){
    const navigate = useNavigate();

    const { auth, login } = useAuth();

    useEffect(() => {
        if (auth) {
            navigate("/home-user");
        }
    }, [])
    return(<></>);
}