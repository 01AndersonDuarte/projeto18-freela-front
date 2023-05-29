import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import styled from "styled-components";

export default function HomePage() {
    const navigate = useNavigate();

    const { auth, login } = useAuth();

    useEffect(() => {
        if (auth) {
            navigate(`/home-user/${auth.id}`);
        }
        // navigate(`/sign-in`);
    }, [])
    return (
        <ContainerHome>
            <div>
                <h1>PicBook</h1>
                <button onClick={()=>navigate('sign-in')}>Entre</button>
                <button onClick={()=>navigate('sign-up')}>Cadastre-se</button>
            </div>
        </ContainerHome>
    );
}

const ContainerHome = styled.div`
    width: 100%;
    height: 100vh;
    padding: 5%;
    background-color: rgba(255, 255, 255, 0.9);
    
    display: flex;
    flex-direction: column;
    align-items: center;
    h1{
        font-family: 'Dancing Script';
        font-weight: 700;
        font-size: 58px;
        margin-bottom: 50px;
    }
    
    button{
        width: 100%;
    }
   
`;