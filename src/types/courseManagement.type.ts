import { TAcademicSemester } from "./academicManagement.type";
import { TFaculty } from "./userManagement.type";

export type TRegisteredSemester = {
  _id: string;
  academicSemester: TAcademicSemester;
  status: string;
  startDate: string;
  endDate: string;
  minCredit: number;
  maxCredit: number;
  createdAt: string;
  updatedAt: string;
};

export type TCourse = {
  _id: string;
  prefix: string;
  code: number;
  title: string;
  credits: number;
  isDeleted: boolean;
  prereQuisiteCourses: TPrereQuisiteCourse[];
  createdAt: string;
  updatedAt: string;
};

export type TPrereQuisiteCourse = {
  course: TCourse;
  isDeleted: boolean;
};
export type TFacultiesOfCourse = {
  _id: string;
  __v: number;
  course: string;
  faculties: TFaculty[];
};
