import styled from "styled-components";

export const ContainerHomeUser = styled.div`
    width: 100%;
    padding: 5% 0% 5% 0%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const ContainerPosts = styled.div`
    width: 70%;
    min-height: 100px;
    margin-top: 5%;
`;

export const PostImage = styled.img`
    width: 100%;
    height: auto;
    border-radius: 10px;
`;

export const PostFrame = styled.div`
    padding: 1%;
    border: solid 1px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    margin-top: 5%;
`;

export const PostInfo = styled.div`
    padding: 2%;
    display: flex;
    justify-content: space-between;
    p{
        font-family: 'Raleway';
    }
`;