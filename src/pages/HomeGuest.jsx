import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import BasicButton from "../components/BasicButton/BasicButton";
import { useHistory } from "react-router";
import { supportedLanguages } from "../i18n/init";
import { useApplicationStateValue } from "../context/ApplicationContext";

const HomeGuest = () => {
  const { t } = useTranslation();
  const { changeLanguage, language } = useApplicationStateValue();
  const history = useHistory();

  const openLoginPage = () => {
    history.push("/login");
  };

  const openRegisterPage = () => {
    history.push("/register");
  };

  return (
    <RootContainer>
      <Header>
        <TitleSpan>{t("homeGuest.title")}</TitleSpan>
        <DescriptionSpan>{t("homeGuest.description")}</DescriptionSpan>
      </Header>
      <ActionBox>
        <LoginBox>
          <LoginMessageBox>
            <LoginTitleMessageBox>
              {t("homeGuest.loginTitleMessage")}
            </LoginTitleMessageBox>
            <br />
            {t("homeGuest.loginDescriptionMessage")}
          </LoginMessageBox>
          <ActionButtonBox>
            <ActionButton onClick={openLoginPage}>
              {t("homeGuest.loginButton")}
            </ActionButton>
          </ActionButtonBox>
        </LoginBox>
        <RegisterBox>
          <RegisterMessageBox>
            <RegisterTitleMessageBox>
              {t("homeGuest.registerTitleMessage")}
            </RegisterTitleMessageBox>
            <br />
            {t("homeGuest.registerDescriptionMessage")}
          </RegisterMessageBox>
          <ActionButtonBox>
            <ActionButton onClick={openRegisterPage}>
              {t("homeGuest.registerButton")}
            </ActionButton>
          </ActionButtonBox>
        </RegisterBox>
      </ActionBox>
      <LanguageBox>
        {supportedLanguages.map((lng, index) => {
          return (
            <LanguageLink
              isselected={lng === language}
              key={index}
              onClick={() => {
                changeLanguage(lng);
              }}
            >
              {lng}
            </LanguageLink>
          );
        })}
      </LanguageBox>
    </RootContainer>
  );
};

const RootContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
  height: 100vh;
  background: rgb(126, 174, 203);
  background: radial-gradient(
    circle,
    rgba(126, 174, 203, 1) 0%,
    rgba(2, 106, 167, 1) 100%
  );
  flex-direction: column;
`;

const TitleSpan = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  height: 70%;
  font-weight: 500;
  font-size: 44px;
  align-items: center;
  color: #fff;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 40%;
`;

const DescriptionSpan = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  height: 30%;
  font-size: 32px;
  color: #fff;
`;

const ActionBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 54%;
  width: 80%;
`;

const LoginBox = styled.div`
  background-color: #fff;
  border-radius: 20px;
  height: 50%;
  flex: 1;
  padding: 3% 7%;
  margin-right: 5%;
`;

const RegisterBox = styled.div`
  background-color: #fff;
  border-radius: 20px;
  flex: 1;
  height: 50%;
  padding: 3% 7%;
  margin-left: 5%;
`;

const LoginMessageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex: 1;
  font-size: 24px;
  flex-direction: column;
  height: 60%;
`;

const RegisterMessageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex: 1;
  font-size: 24px;
  flex-direction: column;
  height: 60%;
`;

const LoginTitleMessageBox = styled.span`
  font-weight: 500;
  font-size: 28px;
`;

const RegisterTitleMessageBox = styled.span`
  font-weight: 500;
  font-size: 28px;
`;

const ActionButton = styled(BasicButton)`
  font-size: 20px;
  height: 60px;
  min-width: 140px;
`;

const ActionButtonBox = styled.div`
  height: 40%;
`;

const LanguageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const LanguageLink = styled.a`
  :hover {
    cursor: pointer;
  }
  margin-right: 10px;
  color: #fff;
  font-weight: ${({ isselected }) => isselected && 700};
  font-size: ${({ isselected }) => isselected && "24px"};
  margin-top: ${({ isselected }) => !isselected && "2px"};
`;

export default HomeGuest;
