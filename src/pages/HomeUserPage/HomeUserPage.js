import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingCircle } from "../../components/Loading/Loading";
import { ContainerHomeUser } from "./HomeUserStyle";
import HeaderUser from "../../components/Profile/HeaderUser";
import ContainerPosts from "../../components/Profile/ContainerPosts";
import Header from "../../components/Header/Header";

export default function HomeUserPage() {
    const [userProfile, setUserProfile] = useState(null);
    const [userPosts, setUserPosts] = useState(null);
    const [profileId, setProfileId] = useState(null);
    const { id } = useParams();

    const { auth } = useAuth();
    const navigate = useNavigate();
    const config = auth && { headers: { Authorization: `Bearer ${auth.token}` } };

    useEffect(() => {
        setUserProfile(null);
        if (!auth) {
            navigate("/");
        }
        const url = `${process.env.REACT_APP_GET_USER_DATA}${id}`;
        axios.get(url, config).then((sucess) => {
            setUserProfile(sucess.data.profile);
            setUserPosts(sucess.data.posts);
            setProfileId(sucess.data.id);
        }).catch((error) => {
            console.log(error);
        });

    }, [id]);

    if (!userProfile) {
        return (
            <ContainerHomeUser>
                <LoadingCircle />
            </ContainerHomeUser>
        );
    }

    return (
        <ContainerHomeUser>
            <Header userProfile={userProfile} auth={auth} config={config}/>
            <HeaderUser userProfile={userProfile} auth={auth} profileId={profileId} config={config} />
            <ContainerPosts userPosts={userPosts} auth={auth} profileId={profileId}/>
        </ContainerHomeUser>
    );
}