import { Container2, PostImage, PostFrame, PostInfo } from "./ProfileStyle";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

export default function ContainerPosts({userPosts, auth, profileId}) {
    return (
        <Container2>
            {userPosts.length ?
                userPosts.map((p, i) => <Post key={i} post={p} />)
                :
                (profileId === auth.id ? <Link to="/create-post">Criar primeiro post</Link>
                    : <p>Este usuário não possui nenhuma postagem</p>)
            }
        </Container2>

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