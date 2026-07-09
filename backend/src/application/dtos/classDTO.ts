export interface ClassDTO{
    name: string
    content: string
    lastUpdate?: Date
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

export interface editClass{
    name: string
    content: string
    lastUpdate?: Date
}