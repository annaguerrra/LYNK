// used to create a discipline
export interface createDiscipline{
    areaID: number
    name: string
}

// used to assign a competency to a discipline
export interface assignCompetencyDTO{
    disciplineId: number
    competencyId: number
}

export interface DisciplineBasic {
    id: number
    name: string
}


// response to findOne service
export interface DisciplineDTO{
    name: string;
    id: number;
    workLoad: number;
    area:{
        id: number
        name: string
        color: string
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
        id: number
        name: string
        numOfClasses: number
    }[];
}

// response to viewClasses service 
export interface viewClassesDTO{
    name: string
    classes:{
        id: number
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
    areaID: number
    lastUpdate?: Date
}