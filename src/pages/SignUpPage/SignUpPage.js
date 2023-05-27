import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import { ContainerSign } from "../../components/Sign/SignStyle";
import { LoadingThreeDots } from "../../components/Loading/Loading";
import { FormStyled, InputStyled, ButtonStyled, Error } from "../../components/Sign/SignForm";

export default function SignUpPage() {
    const [registrationData, setRegistrationData] = useState({ name: "", userName: "", email: "", password: "", confirmPassword: "" });
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

        axios.post(url, registrationData)
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
                <FormStyled onSubmit={signUp}>
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