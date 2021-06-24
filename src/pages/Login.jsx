import React from "react";
import { useTranslation } from "react-i18next";
import { object, string } from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styled from "styled-components";
import DTextField from "../components/TextField/DTextField";
import SubmitButton from "../components/SubmitButton/SubmitButton";
import { login } from "../service/auth.service";
import { useAuthStateValue } from "../context/AuthContext";
import { useApplicationStateValue } from "../context/ApplicationContext";
import {useHistory} from "react-router";

const Login = () => {
  const { t } = useTranslation();
  const { setAccessToken, setRefreshToken, setLoggedUser, setLoggedIn } =
    useAuthStateValue();
  const { setLoading } = useApplicationStateValue();
  const history = useHistory();

  const validationSchema = object().shape({
    username: string()
      .required(t("validation.required", { fieldName: t("login.username") }))
      .max(50, t("validation.maxLength", { length: 50 })),
    password: string()
      .required(t("validation.required", { fieldName: t("login.password") }))
      .max(50, t("validation.maxLength", { length: 50 })),
  });

  const { handleSubmit, control } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    try {
      const response = await login(data);
      const { accessToken, refreshToken, user } = response.data;
      console.log(accessToken, refreshToken, user);
      if (accessToken) {
        setLoading(true);
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        // window.location.href = "/";
        setLoggedUser(user);
        setLoggedIn(true);
        sessionStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        setTimeout(() => {
          setLoading(false);
          history.push("/home")
        }, 100);
      }
      console.log(response);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container>
      <Header>{t("login.headerTitle")}</Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="username"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <DTextField
              label={t("login.username")}
              value={value}
              onChange={onChange}
              required
              error={!!error}
              helperText={error ? error.message : null}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <DTextField
              label={t("login.password")}
              value={value}
              type="password"
              onChange={onChange}
              required
              error={!!error}
              helperText={error ? error.message : null}
            />
          )}
        />
        <SubmitButton type="submit">{t("login.confirmButton")}</SubmitButton>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex: 1;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  font-size: 24px;
  font-weight: bold;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export default Login;
