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
        name: string;
    } | null,
    competence: {
        name: string
    }[];
    lastUpdate: Date | null;
}

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

export interface viewMaterialsDTO{
    materialID: number
}

export interface viewCompetencesDTO{
    competences:{
        name: string
        numOfClasses: number
    }[];
}

export interface viewClassesDTO{
    name: string
    classes:{
        name: string
    }[];
}

export interface editDisciplineDTO{
    name: string
    numOfClasses: string
    lastUpdate?: Date
}