import { useGetAcademicSemestersQuery } from "../../../redux/features/academicSemester/academicSemesterApi";

const AcademicSemester = () => {
  const { data } = useGetAcademicSemestersQuery(undefined);
  console.log(data);
  return <h1>this is academic semester</h1>;
};

export default AcademicSemester;
