import React from "react";
import { useForm, Controller } from "react-hook-form";
import styled from "styled-components";
import {useTranslation} from "react-i18next";
import DTextField from "../components/TextField/DTextField";
import SubmitButton from "../components/SubmitButton/SubmitButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, ref } from "yup";
import * as yup from "yup";
require("yup-password")(yup);

const Register = () => {

    const {t} = useTranslation();

    const validationSchema = object().shape({
        firstName: string().max(50, t("validation.maxLength", {length: 50})),
        lastName: string().max(50, t("validation.maxLength", {length: 50})),
        username: string().required(t("validation.required", {fieldName: t("register.username")})).max(50, t("validation.maxLength", {length: 50})),
        email: string().required(t("validation.required", {fieldName: t("register.email")})).max(50, t("validation.maxLength", {length: 50})).email(t("validation.email")),
        password: string().minLowercase(1, t("validation.passwordPolicy")).minUppercase(1, t("validation.passwordPolicy")).minNumbers(1, t("validation.passwordPolicy")).required(t("validation.required", {fieldName: t("register.password")})),
        repeatPassword: string().required(t("validation.required", {fieldName: t("register.repeatPassword")})).max(50, t("validation.maxLength", {length: 50})).oneOf([ref("password"), null], t("validation.confirmPasswordInvalid")),
    });

    const { handleSubmit, control } = useForm({
        resolver: yupResolver(validationSchema),
        mode: "onBlur"
    });

    const onSubmit = data => {
        console.log(data);
    };

    return (
        <Container>
            <Header>
                {t("register.headerTitle")}
            </Header>
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
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : null}
                        />
                    )}
                />
                <SubmitButton type="submit">
                    {
                        t("register.confirmButton")
                    }
                </SubmitButton>
            </Form>
        </Container>
    )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex: 1;
`;

const Header = styled.div`
  display:flex;
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