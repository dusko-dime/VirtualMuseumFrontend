import React from "react";
import { useForm, Controller } from "react-hook-form";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import DTextField from "../components/TextField/DTextField";
import SubmitButton from "../components/SubmitButton/SubmitButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, ref } from "yup";
import * as yup from "yup";
// eslint-disable-next-line no-undef
require("yup-password")(yup);
import { register } from "../service/auth.service";

const Register = () => {
  const { t } = useTranslation();

  const validationSchema = object().shape({
    firstName: string().max(50, t("validation.maxLength", { length: 50 })),
    lastName: string().max(50, t("validation.maxLength", { length: 50 })),
    username: string()
      .required(t("validation.required", { fieldName: t("register.username") }))
      .max(50, t("validation.maxLength", { length: 50 }))
      .min(12, t("validation.minLength", { length: 12 }))
      .matches(/^[^(@|#|//)]*$/, t("validation.specialCharacters")),
    email: string()
      .required(t("validation.required", { fieldName: t("register.email") }))
      .max(50, t("validation.maxLength", { length: 50 }))
      .email(t("validation.email")),
    password: string()
      .required(t("validation.required", { fieldName: t("register.password") }))
      .min(15, t("validation.minLength", { length: 15 }))
      .minLowercase(1, t("validation.passwordPolicy"))
      .minUppercase(1, t("validation.passwordPolicy"))
      .minNumbers(1, t("validation.passwordPolicy")),
    repeatPassword: string()
      .required(
        t("validation.required", { fieldName: t("register.repeatPassword") })
      )
      .max(50, t("validation.maxLength", { length: 50 }))
      .oneOf([ref("password"), null], t("validation.confirmPasswordInvalid")),
  });

  const { handleSubmit, control, formState } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      await register(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container>
      <Header>{t("register.headerTitle")}</Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="firstName"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <DTextField
              label={t("register.firstName")}
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <DTextField
              label={t("register.lastName")}
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <DTextField
              label={t("register.email")}
              value={value}
              onChange={onChange}
              error={!!error}
              type="email"
              required
              helperText={error ? error.message : null}
            />
          )}
        />
        <Controller
          name="username"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <DTextField
              label={t("register.username")}
              value={value}
              onChange={onChange}
              error={!!error}
              required
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
              label={t("register.password")}
              value={value}
              type="password"
              onChange={onChange}
              error={!!error}
              required
              helperText={error ? error.message : null}
            />
          )}
        />
        <Controller
          name="repeatPassword"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <DTextField
              label={t("register.repeatPassword")}
              value={value}
              type="password"
              onChange={onChange}
              error={!!error}
              required
              helperText={error ? error.message : null}
            />
          )}
        />
        <SubmitButton disabled={!formState.isValid} type="submit">
          {t("register.confirmButton")}
        </SubmitButton>
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

export default Register;
