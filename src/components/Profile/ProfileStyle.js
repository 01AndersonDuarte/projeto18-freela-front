import styled from "styled-components";

export const Container = styled.div`
    width: 80%;
    padding: 1%;
    border-radius: 10px;
    border: solid 1px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: space-around;
    line-height: 200%;
`;

export const UserInformation = styled.div`
    width: 70%;
    color: #000;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;    
`;

export const UserPicture = styled.img`
    width: 100px;
    height: 100px;
    border: solid 1px rgba(0, 0, 0, 0.4);
    border-radius: 60px;
    object-fit: cover;
`;

export const Picture = styled.div`
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    p{
        font-family: 'Raleway';
    }
`;

export const Followers = styled.div`
    width: 50%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
export const Biography = styled.div`
    width: 90%;
`;

export const Container2 = styled.div`
    width: 70%;
    min-height: 100px;
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

export const FrameHeader = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1;
    position: fixed;
    top: 0;
    left: 0;
    div{
        width: 25vw;
        padding: 2%;
        border-radius: 5px;
        background-color: rgba(255, 255, 255, 0.9);
        position: fixed;
        top: 25%;
        left: 37.5%;

        display: flex;
        flex-direction: column;

        span{
            width: 100%;
            display: flex;
            justify-content: flex-end;
            cursor: pointer;
        }
        
    }
    img{
        width: 50px;
        height: 50px;
        border-radius: 60px;
        margin-right: 3%;
        border: solid 1px rgba(0, 0, 0, 0.3);
        object-fit: cover;
    }
`;

export const Item = styled.li`
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