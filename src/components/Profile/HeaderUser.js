import { Container, UserInformation, UserPicture, Picture, Biography, Followers } from "./ProfileStyle";

export default function HeaderUser({ userProfile }) {

    return (
        <Container>
            <Picture>
                <UserPicture src={userProfile.userPicture} alt="" />
                <p>{userProfile.userProfile.userName}</p>
                <button>Seguir</button>
            </Picture>
            <UserInformation>
                <Followers>
                    {userProfile.userProfile.name}
                    <button>Seguidores</button>
                    <button>Seguindo</button>
                </Followers>
                <Biography>
                    <p>{userProfile.userProfile.biography}</p>
                </Biography>
            </UserInformation>
        </Container>
    );
}