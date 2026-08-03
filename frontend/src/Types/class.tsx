import type { CompetenceDTO } from "./competence"
import type { DisciplineBasic } from "./discipline"
import type { MaterialDTO } from "./material"

// used to get class
export interface ClassDTO{
    id: number
    name: string
    content: string
    discipline: DisciplineBasic
    competences: CompetenceDTO[]
    materials: MaterialDTO[]
    lastUpdate?: Date
}

export interface ClassDisciplineDTO {
    id:  number
    name: string
    discipline: DisciplineBasic
}

// used to create class
export interface CreateClassDTO{
    name: string
    content: string
    disciplineId: number
}

// response to createClass
export interface ClassResponse{
    id: number
    name: string
    content: string
    disciplineId: number
    createdAt?: Date
}

// used to assign a competency to a class
export interface assignCompetencyDTO{
    id: number
    competencyId: number
}

// used to remove a competency
export interface removeCompetencyDTO{
    id: number
    competencyId: number
}

// response to findAll service
export interface ClassesDTO {
    id: number
    name: string;
    content: string;
    createdAt: Date;
    discipline: {
        id: number;
        name: string;
    };
    competences: {
        id: number;
        name: string;
    }[];
    materials: {
        id: number;
        name: string;
    }[];
}

// response to viewCompentences service 
export interface viewCompetencesDTO{
    competences: {
        name: string;
        numOfClasses: number;
    }[];
}


// used for pdf service
export interface getContentDTO{
    name: string
    content: string
}

// response to editClass service
export interface editClass{
    name: string
    content: string
}

export interface ClassItem {
    id: number
    name: string
}

