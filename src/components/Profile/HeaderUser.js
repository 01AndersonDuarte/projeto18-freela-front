import axios from "axios";
import { Container, UserInformation, UserPicture, Picture, Biography, Followers, FrameHeader, Item } from "./ProfileStyle";
import { useEffect, useState } from "react";
import { AiOutlineClose } from 'react-icons/ai';
import { useNavigate } from "react-router-dom";

export default function HeaderUser({ userProfile, auth, profileId, config }) {
    const [followState, setFollowState] = useState();
    const [reloadState, setReloadState] = useState(null);
    const [followers, setFollowers] = useState();
    const [following, setFollowing] = useState();

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    useEffect(() => {
        const url = `${process.env.REACT_APP_FOLLOWER_ID}${profileId}`;

        axios.get(url, config).then((sucess) => {
            setFollowState(sucess.data);
        }).catch((error) => {
            console.log(error);
        });

        axios.get(`${process.env.REACT_APP_FOLLOWERS_FOLLOWING}${profileId}`, config).then((sucess) => {
            setFollowers(sucess.data.followers);
            setFollowing(sucess.data.following);
        }).catch((error) => {
            console.log(error);
        });

    }, [reloadState]);

    function follow() {
        setReloadState(false);

        const url = `${process.env.REACT_APP_FOLLOW_ID}${profileId}`;

        axios.post(url, {}, config).then((sucess) => {
            setReloadState(true);
        }).catch((error) => {
            console.log(error);
        });
    }
    console.log(open);

    return (
        <Container>
            <Picture>
                <UserPicture src={userProfile.userPicture} alt="" />
                <p>{userProfile.userProfile.userName}</p>
                {auth.id != profileId && <button onClick={follow}>{followState ? 'Seguindo' : 'Seguir'}</button>}
            </Picture>
            <UserInformation>
                <Followers>
                    {userProfile.userProfile.name}
                    <button onClick={() => setOpen(followers)}>Seguidores</button>
                    <button onClick={() => setOpen(following)}>Seguindo</button>
                    <button onClick={() => navigate('/create-post')}>Criar post</button>
                </Followers>
                <Biography>
                    <p>{userProfile.userProfile.biography}</p>
                </Biography>
            </UserInformation>
            {open &&
                <FrameHeader>
                    <div>
                        <span><AiOutlineClose onClick={() => setOpen(false)} /></span>
                        {open.length ? open.map((f) => <User key={f.userId} user={f}></User>) : <p>Nenhum seguidor</p>}
                    </div>
                </FrameHeader>}
        </Container>
    );
}

function User({ user }) {
    return (
        <Item>
            <img src={user.picture} alt="" />
            <p>{user.userName}</p>
        </Item>
    );
}
