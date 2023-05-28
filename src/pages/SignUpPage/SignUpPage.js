import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import { ContainerSign } from "../../components/Sign/SignStyle";
import { LoadingThreeDots } from "../../components/Loading/Loading";
import { FormStyled, InputStyled, ButtonStyled, Error } from "../../components/Sign/SignForm";

export default function SignUpPage() {
    const [registrationData, setRegistrationData] = useState({ name: "", userName: "", biography: "", email: "", password: "", confirmPassword: "" });
    const [picture, setPicture] = useState();
    const [request, setRequest] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const { auth } = useAuth();

    useEffect(() => {
        if (auth) {
            navigate("/home-user");
        }
    }, [])

    function signUp(e) {
        setRequest(true);
        setError(false);
        e.preventDefault()

        if (registrationData.password !== registrationData.confirmPassword) {
            setRequest(false);
            return alert("As senhas nao sao compativeis");
        }

        const url = process.env.REACT_APP_SIGN_UP_URL;
        const formData = new FormData();
        formData.append('name', registrationData.name);
        formData.append('userName', registrationData.userName);
        formData.append('biography', registrationData.biography);
        formData.append('photo', picture);
        formData.append('email', registrationData.email);
        formData.append('password', registrationData.password);
        formData.append('confirmPassword', registrationData.confirmPassword);

        axios.post(url, formData)
            .then(sucess => {
                setRequest(false);
                navigate("/sign-in");
            }).catch(error => {
                setRequest(false);
                setError(true);
            })
    }

    function insertRegistrationData(event) {
        event.target.setCustomValidity('');
        const value = event.target.value;
        const attribute = event.target.name;

        setRegistrationData({ ...registrationData, [attribute]: value });
    }
    return (
        <>
            <ContainerSign>
                <FormStyled action="/signup" method="POST" encType="multipart/form-data" onSubmit={signUp}>
                    <InputStyled
                        placeholder="Nome"
                        type="text"
                        name="name"
                        required
                        onChange={insertRegistrationData}
                        onInvalid={(event) => event.target.setCustomValidity('Preencha este campo.')}
                    />
                    <InputStyled
                        placeholder="Nome de usuário"
                        type="text"
                        name="userName"
                        required
                        onChange={insertRegistrationData}
                        onInvalid={(event) => event.target.setCustomValidity('Preencha este campo.')}
                    />
                    <InputStyled
                        placeholder="Biografia"
                        type="text"
                        name="biography"
                        required
                        onChange={insertRegistrationData}
                        onInvalid={(event) => event.target.setCustomValidity('Por favor, preencha este campo.')}
                    />
                     <InputStyled
                        placeholder="Foto de perfil"
                        type="file"
                        accept="image/png,image/jpeg"
                        name="photo"
                        required
                        onChange={(e)=>{
                            e.target.setCustomValidity('');
                            setPicture(e.target.files[0]);
                        }}
                        onInvalid={(event) => event.target.setCustomValidity('Por favor, preencha este campo.')}
                    />
                    <InputStyled
                        placeholder="E-mail"
                        type="email"
                        name="email"
                        required
                        onChange={insertRegistrationData}
                        onInvalid={(event) => event.target.setCustomValidity('Por favor, insira um e-mail válido.')}
                    />
                    <InputStyled
                        placeholder="Senha"
                        type="password"
                        name="password"
                        required
                        onChange={insertRegistrationData}
                        onInvalid={(event) => event.target.setCustomValidity('Por favor, preencha este campo.')}
                    />
                    <InputStyled
                        placeholder="Confirme sua senha"
                        type="password"
                        name="confirmPassword"
                        required
                        onChange={insertRegistrationData}
                        onInvalid={(event) => event.target.setCustomValidity('Por favor, preencha este campo.')}
                    />
                    <ButtonStyled type="submit">
                        {request ? <LoadingThreeDots /> : "Cadastrar-se"}
                    </ButtonStyled>
                    {error && <Error>Insira dados válidos</Error>}
                </FormStyled>
            </ContainerSign>
        </>
    );
}