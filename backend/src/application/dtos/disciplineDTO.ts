// used to create a discipline
export interface DisciplineDTO{
    name: string
    workload: number
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
    name: string
    area:{
        name: string;
    } | null,
    competences: {
        name: string
    }[];
    lastUpdate: Date | null;
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
    name: string;
    materials: {
        name: string;
    }[];
}

// response to viewCompentences service 
export interface viewCompetencesDTO{
    name: string;
    competences:{
        name: string
        numOfClasses: number
    }[];
}

// response to viewClasses service 
export interface viewClassesDTO{
    name: string
    classes:{
        name: string
    }[];
}

export interface viewExamsDTO {
    name: string
    exams: {
        name: string
    }[];
}

// response to editDiscipline service 
export interface editDisciplineDTO{
    name: string
    workload: number
    lastUpdate?: Date
}