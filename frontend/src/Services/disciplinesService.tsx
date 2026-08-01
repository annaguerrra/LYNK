import api from "./api";
import type { 
    createDiscipline, 
    DisciplineDTO, 
    viewExamsDTO, 
    viewClassesDTO, 
    viewMaterialsDTO, 
    viewCompetencesDTO, 
    editDisciplineDTO, 
    assignCompetencyDTO 
} from "../Types/discipline";

// Create a new discipline
export async function createDisciplineService(data: createDiscipline) {
    const response = await api.post("/discipline/create", data);
    return response.data;
}

// Duplicate an existing discipline
export async function duplicateDiscipline(id: number) {
    const response = await api.post(`/discipline/${id}/duplicate`);
    return response.data;
}

// Get all disciplines
export async function getDisciplines(): Promise<DisciplineDTO[]> {
    const response = await api.get("/disciplines");
    return response.data.response;
}

// Get a discipline by ID
export async function getDisciplineById(id: number): Promise<DisciplineDTO> {
    const response = await api.get(`/discipline/${id}`);
    return response.data.response;
}

// Get discipline exams
export async function getDisciplineExams(id: number): Promise<viewExamsDTO> {
    const response = await api.get(`/disciplines/${id}/exams`);
    return response.data;
}

// Get discipline classes
export async function getDisciplineClasses(id: number): Promise<viewClassesDTO> {
    const response = await api.get(`/discipline/${id}/classes`);
    return response.data.response;
}

// Get discipline materials
export async function getDisciplineMaterials(id: number): Promise<viewMaterialsDTO> {
    const response = await api.get(`/discipline/${id}/materials`);
    return response.data;
}

// Get discipline competences
export async function getDisciplineCompetences(id: number): Promise<viewCompetencesDTO> {
    const response = await api.get(`/discipline/${id}/competences`);
    return response.data.response;
}

// Update a discipline
export async function updateDiscipline(id: number, data: editDisciplineDTO) {
    const response = await api.put(`/discipline/edit/${id}`, data);
    return response.data;
}

// Assign a competence to a discipline
export async function assignDisciplineCompetence(data: assignCompetencyDTO) {
    console.log(data)
    const response = await api.put("/discipline/assigncompetence", data);
    return response.data;
}

// Delete a discipline
export async function deleteDiscipline(id: number) {
    const response = await api.delete(`/discipline/delete/${id}`);
    return response.data;
}
