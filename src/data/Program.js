// Imports
import { gql, useQuery } from '@apollo/client';

// Variables
let programJSON = [];

let programData = [{}];

export const QUERY_GET_BY_PROGRAM_ID = gql`
  query FindVideosByProgramID($programId: String) {
    findVideosByProgramID(programId: $programId) {
      _id
      title
      program
      videoUrl
      posterImage
      durationIndicator
      order
    }
  }
`;

export function saveDataByProgramId(programId, data) {
  programData.push({ id: programId, data: data });
}

export function getById(id) {
  return programData.filter((item) => item._id === id);
}

export function getNextOrPreviousData(actualId, programId, isNext) {
  const sortedProgram = programData.filter((e) => e.program === programId);

  let actualIndex = sortedProgram.findIndex((item) => item._id === actualId);
  console.log(actualId, actualIndex);

  if (isNext) {
    if (actualIndex++ >= sortedProgram.length - 1) return;
  } else {
    if (actualIndex-- <= 0) return;
  }

  return sortedProgram[actualIndex];
}
