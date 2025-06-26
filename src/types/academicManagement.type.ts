export type TAcademicSemester = {
  _id: string;
  name: string;
  year: string;
  code: string;
  startMonth: string;
  endMonth: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
};
export type TAcademicFaculty = {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
};
export type TAcademicDepartment = {
  _id: string;
  name: string;
  academicFaculty: string | TAcademicFaculty;
  createdAt: string;
  updatedAt: string;
};
/*
export type TCreateAcademicSemester = {
  name: string;
  year: string;
  code: string;
  startMonth: string;
  endMonth: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
*/
