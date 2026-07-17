export interface DisciplineDTO{
    name: string
    workload: number
    areaID: number
    userID: number
}

export interface assignCompetencyDTO{
    disciplineID: number
    competencyID: number
}

export interface findAllDTO{
    name: string
    area:{
        areaID: number;
        name: number;
    }
    competences:{
        competencyID: number;
        name: string;
    }[];
    classes:{
        classID: number;
        name: string;
    }[];
    materials:{
        materialID: number;
        name: string;
    }[];
    exams:{
        examID: number;
        name: string
    }
}

export interface viewMaterialsDTO{
    materialID: number
}

export interface viewCompetencesDTO{
    competences:{
        name: string
        numOfClasses: number
    }[];
}

export interface editDisciplineDTO{
    name: string
    numOfClasses: string
    lastUpdate?: Date
}