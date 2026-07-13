import { Competence } from "#infrastructure/prisma/generated/prisma/client.js"

export interface ClassDTO{
    name: string
    content: string
    lastUpdate?: Date
}

export interface assignCompetencyDTO{
    classId: number
    competencyId: number
}

export interface findAllDTO {
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

export interface viewCompetencesDTO{
    competences: {
        name: string;
        numOfClasses: number;
    }[];
}

export interface viewContentDTO{
    name: string
    content: string
}

export interface editClass{
    name: string
    content: string
    lastUpdate?: Date
}

