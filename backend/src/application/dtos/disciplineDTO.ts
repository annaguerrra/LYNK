import { Class, Exam, ExamAttachment, MaterialAttachment } from "#infrastructure/prisma/generated/prisma/client.js"

// used to create a discipline
export interface DisciplineDTO{
    name: string
    areaID: number
    userID: number
}

// used to assign a competency to a discipline
export interface assignCompetencyDTO{
    disciplineID: number
    competencyID: number
}

// response to findAll service
export interface findAllDTO{
    id: number
    name: string
    workLoad: number
    area:{
        name: string;
    } | null,
    competences: {
        name: string
    }[];
}

// response to findOne service
export interface findOneDTO{
    name: string;
    id: number;
    workLoad: number;
    area:{
        name: string
    };
    competences: {
        name: string
    }[];
    lastUpdate?: Date;
}

// response to viewMaterials service 
export interface viewMaterialsDTO{
    materials: {
        id: number
        name: string
        attachments: MaterialAttachment[]
    }[]
}

// response to viewCompentences service 
export interface viewCompetencesDTO{
    competences:{
        id: number
        name: string
        numOfClasses: number
        exams: Exam[],
        classes: Class[]
    }[]
}

// response to viewClasses service 
export interface viewClassesDTO{
    classes: {
        id: number
        name: string,
    }[]
}

export interface viewExamsDTO {
    exams: {
        id: number
        name: string
        attachments: ExamAttachment[]
    }[];
}

// response to editDiscipline service 
export interface editDisciplineDTO{
    name: string
    workload: number
    lastUpdate?: Date
}