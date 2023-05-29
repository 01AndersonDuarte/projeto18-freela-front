import styled from "styled-components";
import { InputStyled } from "../Sign/SignForm";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { LoadingCircle } from "../Loading/Loading";

export default function Header({ userProfile, auth, config }) {
    const [searchValue, setSearchValue] = useState("");
    const [filteredProfiles, setFilteredProfiles] = useState([]);
    const inputRef = useRef(null);

    const [profiles, setProfiles] = useState();
    const [primaryProfile, setPrimaryProfile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const url = process.env.REACT_APP_GET_PROFILES_USERS;

        axios.get(url, config).then((sucess) => {
            setProfiles(sucess.data.profiles);
            setPrimaryProfile(sucess.data.primaryUser[0]);
        }).catch((error) => {
            console.log(error);
        });

        const filtered = profiles?.filter((p) => {
            if (searchValue !== '' && p !== null) return p.userName.toLowerCase().includes(searchValue.toLowerCase());
        }
        );
        setFilteredProfiles(filtered);

    }, [searchValue]);

    function getSuggestionsPosition() {
        const inputRect = inputRef.current.getBoundingClientRect();
        const top = inputRect.bottom;
        const left = inputRect.left;
        const width = inputRect.width;
        const position = "absolute";
        const backgroundColor = "white";
        const borderRadius = "2px";
        const border = "solid 1px rgba(212, 212, 212, 1)";
        const zIndex = "1";
        return { top, left, width, position, backgroundColor, borderRadius, border, zIndex };
    };

    if (!primaryProfile) {
        return (
            <ContainerHeader>
                <LoadingCircle />
            </ContainerHeader>
        );
    }

    return (
        <ContainerHeader>
            <h1>PicBook</h1>
            <InputStyled
                type="text"
                placeholder="Pesquisar usuários"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                ref={inputRef}
            />
            <img src={primaryProfile.picture} alt="" onClick={() => {
                navigate(`/home-user/${auth.id}`);
            }} />
            {
                !filteredProfiles || filteredProfiles.length === 0 ?
                    ''
                    :
                    <div style={{ ...getSuggestionsPosition() }}>
                        <ul>
                            {filteredProfiles.map((profile, index) => (
                                <Item key={index} onClick={() => {
                                    setSearchValue('');
                                    navigate(`/home-user/${profile.userId}`);
                                }}>
                                    <img src={profile.picture}/>
                                    <p>{profile.userName}</p>
                                </Item>
                            ))}
                        </ul>
                    </div>
            }
        </ContainerHeader>
    );
}

const ContainerHeader = styled.div`
    width: 100%;
    height: 100px;
    /* padding: 0 5% 0 5%; */
    background-color: red;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;

    background-color: rgba(255, 255, 255, 0.96);
    color: #323232;
    box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.09);

    h1{
        font-family: 'Dancing Script';
        font-weight: 700;
        font-size: 38px;
    }

    img{
        width: 5%;
        height: 60%;
        border-radius: 100%;
        border: solid 1px rgba(0, 0, 0, 0.3);
        object-fit: cover;
    }
    input{
        width: 30%
    }
`;

const Item = styled.li`
    padding: 2%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
    &:hover{
        background-color: #f2f2f2;
    }
    img{
        width: 50px;
        height: 50px;
        border-radius: 60px;
        margin-right: 3%;
        border: solid 1px rgba(0, 0, 0, 0.3);
        object-fit: cover;
    }
`