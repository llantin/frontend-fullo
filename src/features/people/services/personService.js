import api from "@/services/api";

export const getPeople = async () => {
    const { data } = await api.get("/people");
    return data.people;
};

export const getPersonUsers = async () => {
    const { data } = await api.get("/people?type=Usuario");
    return data.people;
};

export const createPerson = async (personData) => {
    const { data } = await api.post("/people", personData);
    return data;
};

export const updatePerson = async (id, updatedData) => {
    const { data } = await api.put(`/people/${id}`, updatedData);
    return data;
};

export const deletePerson = async (id) => {
    const { data } = await api.delete(`/people/${id}`);
    return data;
};