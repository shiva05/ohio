
export interface alignmentSearchResultsPayload {
  //Keywords: string,
  CareerFiledIds: number[],
  // StrandIds: number[],
  // OutcomeIds: number[],
  // CompetencyIds: number[],
  // Subjects: SubjectIds[]
}
export interface SubjectIds {
  SubjectId: 1,
  Level1Ids: number[],
  Level2Ids: number[],
  Level3Ids: number[]
}
