import { MaterialAttachment } from "#infrastructure/prisma/generated/prisma/client.js"

// used to create and edit a class
export interface ClassDTO{
    name: string
    content: string
    disciplineId: number
    // lastUpdate?: Date
}

// used to assign a competency to a class
export interface assignCompetencyDTO{
    id: number
    competencyId: number
}

// response to findAll service
export interface findAllDTO {
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

export interface findOneDTO {
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

export interface viewMaterialsDTO{
    materials: {
        id: number
        name: string
        attachments: MaterialAttachment[]
    }[];
}

// response to viewCompentences service 
export interface viewCompetencesDTO{
    competences: {
        id: number
        name: string;
        numOfClasses: number;
    }[];
}

// response to view content service
export interface viewContentDTO{
    name: string
    content: string
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
    lastUpdate?: Date
}

