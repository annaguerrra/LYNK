export interface IDisciplineService{
     // post
        create(payload: ClassDTO, disciplineId: number, userId: number): Promise<Class>;
        assignCompetency(payload: assignCompetencyDTO, userId:number): Promise<Class>;
        // get
        findAll(): Promise<findAllDTO[]>;
        findOne(id: number): Promise<ClassDTO>;
        viewClasses(id: number): Promise<string>
        viewMaterials(classId: number): Promise<viewMaterialsDTO>
        viewCompetences(classId: number): Promise<viewCompetencesDTO>;
        downloadContent(classId: number): Promise<Buffer>
        // delete
        delete(id: number, userId: number): Promise<boolean>;
        // put
        edit(payload: ClassDTO, id: number, userId: number):  Promise<editClass>;
}