import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

import { ContainerSign } from "../../components/Sign/SignStyle";
import { FormStyled, InputStyled, ButtonStyled, Error } from "../../components/Sign/SignForm";
import {LoadingThreeDots} from "../../components/Loading/Loading";
import { useNavigate } from "react-router-dom";

export default function SignInPage() {
    const [loginData, setLoginData] = useState({email: '', password: ''});
    const [request, setRequest] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const { auth, login } = useAuth();

    useEffect(() => {
        if (auth) {
            navigate("/home-user");
        }
    }, [])

    function singIn(e){
        setRequest(true);
        setError(false);
        e.preventDefault();
        console.log(loginData)

        const url = process.env.REACT_APP_SIGN_IN_URL;

        axios.post(url, loginData)
            .then(sucess => {
                setRequest(false);
                login(sucess.data);
                navigate("/home-user");
            })
            .catch(fail => {
                setRequest(false);
                console.log(fail)
                setError(true);
            });
    }

    function insertLoginData(event) {
        event.target.setCustomValidity('');

        const value = event.target.value;
        const attribute = event.target.name;

        setLoginData({ ...loginData, [attribute]: value });
    }
    return (
        <>
            <ContainerSign>
                <FormStyled onSubmit={singIn}>
                    <InputStyled
                        placeholder="E-mail"
                        type="email"
                        name="email"
                        required
                        onChange={insertLoginData}
                        onInvalid={(event) => event.target.setCustomValidity('Por favor, insira um e-mail válido.')}
                    />
                    <InputStyled
                        placeholder="Senha"
                        type="password"
                        name="password"
                        required
                        onChange={insertLoginData}
                        onInvalid={(event) => event.target.setCustomValidity('Por favor, preencha este campo.')}
                    />
                    <ButtonStyled type="submit">
                        {request ? <LoadingThreeDots /> : "Entrar"}
                    </ButtonStyled>
                    {error && <Error>E-mail ou senha incorretos.</Error>}
                </FormStyled>
            </ContainerSign>
        </>
    );
}