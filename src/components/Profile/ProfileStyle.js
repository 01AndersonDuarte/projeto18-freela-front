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