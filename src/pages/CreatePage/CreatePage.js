import styled from "styled-components";
import { FormStyled, InputStyled } from "../../components/Sign/SignForm";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function CreatePage() {
    const [picture, setPicture] = useState(null);
    const [description, setDescription] = useState();

    const { auth } = useAuth();
    const navigate = useNavigate();
    const config = auth && { headers: { Authorization: `Bearer ${auth.token}` } };

    console.log(auth.token);

    function sendPost(e){
        e.preventDefault();

        const url = process.env.REACT_APP_CREATE_POST;
        const formData = new FormData();
        formData.append('photo', picture);
        formData.append('description', description);

        axios.post(url, formData, config).then((sucess) => {
            navigate("/home-user");
          }).catch((error) => {
            console.log(error);
          });

    }

    return (
        <ContainerCreate>
            <FormPost action="/create-post" method="POST" encType="multipart/form-data" onSubmit={sendPost}>
                {picture && <ImagePost src={URL.createObjectURL(picture)} />}
                <input
                    type="file"
                    accept="image/png,image/jpeg"
                    required
                    onChange={(e) => {
                        e.target.setCustomValidity('');
                        setPicture(e.target.files[0]);
                    }}
                    onInvalid={(event) => event.target.setCustomValidity('Por favor, escolha uma foto.')}
                />
                <InputDes
                    placeholder="Descrição"
                    type="text"
                    name="description"
                    required
                    onChange={(e) => {
                        e.target.setCustomValidity('');
                        setDescription(e.target.value);
                    }}
                    onInvalid={(event) => event.target.setCustomValidity('Por favor, preencha este campo.')}
                />
                <button>Publicar</button>
            </FormPost>
        </ContainerCreate>
    );
}

const ContainerCreate = styled.div`
    width: 100%;
    padding: 2% 0 2% 0;
    border-radius: 10px;
    border: solid 1px rgba(0, 0, 0, 0.2);

    display: flex;
    align-items: center;
    justify-content: center;
`;

const ImagePost = styled.img`
    width: 250px;
    height: 250px;
    border-radius: 10px;
    object-fit: cover;
`;

const InputDes = styled.input`
    width: 50%;
    border: solid 1px rgba(212, 212, 212, 1);
    border-radius: 5px;
    outline: 0;

    box-sizing: border-box;
    padding: 10px;
    font-size: 18px;
`;


const FormPost = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 50%;
    gap: 15px;

    input:focus{
        transform: scale(1.07);
    }
    input:focus::-webkit-input-placeholder {
        color: transparent;
    }

    input[type="file"]::-webkit-file-upload-button {
        visibility: hidden;
    }

    input[type="file"]::before {
        content: '+';
        display: inline-block;
        background: #c6a59c;
        color: #fff;
        padding: 4px 8px;
        border-radius: 4px;
        cursor: pointer;
    }

    input[type="file"]:hover::before {
        background: #62716f;
    }
`;