import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { LoadingCircle } from "../../components/Loading/Loading";
import { ContainerHomeUser, ContainerPosts, PostImage, PostFrame, PostInfo } from "./HomeUserStyle";
import HeaderUser from "../../components/Profile/HeaderUser";
import dayjs from "dayjs";

export default function HomeUserPage() {
    const [userProfile, setUserProfile] = useState(null);
    const [userPosts, setUserPosts] = useState(null);

    const { auth, login } = useAuth();
    const navigate = useNavigate();
    const config = auth && { headers: { Authorization: `Bearer ${auth.token}` } };

    useEffect(() => {
        if (!auth) {
            navigate("/");
        }
        const url = process.env.REACT_APP_GET_USER_DATA;
        axios.get(url, config).then((sucess) => {
            setUserProfile(sucess.data.profile);
            setUserPosts(sucess.data.posts);
        }).catch((error) => {
            console.log(error);
        });

    }, []);

    if (!userProfile) {
        return (
            <ContainerHomeUser>
                <LoadingCircle />
            </ContainerHomeUser>
        );
    }

    console.log(userProfile)

    return (
        <ContainerHomeUser>
            <HeaderUser userProfile={userProfile} />

            <ContainerPosts>
                {userPosts.length ?
                    userPosts.map(p => <Post post={p} />)
                    :
                    <Link to="/create-post">Criar primeiro post</Link>
                }
            </ContainerPosts>
        </ContainerHomeUser>
    );
}

function Post({ post }) {
    const date = dayjs(post.date);
    const formattedDate = date.format('DD/MM/YYYY');
    const formattedTime = date.format('HH:mm');
    return (
        <PostFrame>
            <PostImage src={post.image} alt="" />
            <PostInfo>
                <p>{post.description}</p>
                <p>{formattedDate} às {formattedTime}</p>
            </PostInfo>
        </PostFrame>
    );
}