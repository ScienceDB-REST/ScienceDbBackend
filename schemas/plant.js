module.exports = `
  type Plant  {
    experimentDbId: String  
    experimentURI: String  
    experimentId: String  
    experimentName: String  
    experimentObjective: String  
    experimentType: String  
    experimentLocation: String  
    experimentProject: String  
    experimentPlateform: String  
  
  }

  enum PlantField {
    id 
    experimentDbId  
    experimentURI  
    experimentId  
    experimentName  
    experimentObjective  
    experimentType  
    experimentLocation  
    experimentProject  
    experimentPlateform  
  }

  input searchPlantInput {
    field: PlantField
    value: typeValue
    operator: Operator
    searchArg: [searchPlantInput]
  }

  type Query {
    plants: [Plant]
    searchPlant(input: searchPlantInput): [Plant]
    readOnePlant(id: ID): Plant
  }

  type Mutation {
    addPlant( experimentDbId: String, experimentURI: String, experimentId: String, experimentName: String, experimentObjective: String, experimentType: String, experimentLocation: String, experimentProject: String, experimentPlateform: String ): Plant
    deletePlant(id: ID!): String!
    updatePlant(id: ID!, experimentDbId: String, experimentURI: String, experimentId: String, experimentName: String, experimentObjective: String, experimentType: String, experimentLocation: String, experimentProject: String, experimentPlateform: String): Plant!
    bulkAddPlantXlsx: [Plant]
    bulkAddPlantCsv: [Plant]
}
`;