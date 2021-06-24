import api from "./base.service";

export const fetchMuseums = () => {
    return api().get("/museums");
};