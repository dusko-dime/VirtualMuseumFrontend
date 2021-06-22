import React from "react";
import { useTranslation } from "react-i18next";
import { object, string } from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styled from "styled-components";
import DTextField from "../components/TextField/DTextField";
import SubmitButton from "../components/SubmitButton/SubmitButton";

const Login = () => {
  const { t } = useTranslation();

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

  const onSubmit = (data) => {
    console.log(data);
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
