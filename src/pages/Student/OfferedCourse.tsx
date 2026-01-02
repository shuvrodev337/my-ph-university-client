import { useGetMyOfferedCoursesQuery } from "../../redux/features/student/courseRelatedApi";

const OfferedCourse = () => {
  const { data: offeredCourses } = useGetMyOfferedCoursesQuery(undefined);

  const singleObject = offeredCourses?.data?.reduce((acc, item) => {
    console.log(item);
    const key = item?.course?.title;
    acc[key] = acc[key] || { courseTitle: key, sections: [] }; // used || to to avoid replacing the object and making the sections: [] everytime loop iterates
    acc[key].sections.push({
      section: item.section,
      _id: item._id,
    });
    return acc;
  }, {});
  console.log(singleObject);
  // console.log(Object.values(singleObject ? singleObject : {}));
  return (
    <div>
      <h1>This is student offered course</h1>
    </div>
  );
};

export default OfferedCourse;

// *****getting data in this format****** =>
const exampleData1 = [
  { _id: "sdcsdsdsd", course: { title: "Civil" }, section: 1 },
  { _id: "rrfrgrbbr", course: { title: "Civil" }, section: 2 },
  { _id: "uikiliolt", course: { title: "React" }, section: 1 },
];

// *****Use reduce method to 1st modify data in this object of objects format as the return of reduce method =>
const singleObjectExample = {
  Civil: {
    courseTitle: "Civil",
    sections: [
      { section: 1, _id: "sdcsdsdsd" },
      { section: 2, _id: "rrfrgrbbr" },
    ],
  },
  React: {
    courseTitle: "React",
    sections: [{ section: 1, _id: "uikiliolt" }],
  },
};

// then use Object.values method to get the values of every property of that object.in this format format =>
const exampleData2 = [
  {
    courseTitle: "Civil",
    sections: [
      { section: 1, _id: "sdcsdsdsd" },
      { section: 2, _id: "rrfrgrbbr" },
    ],
  },
  {
    courseTitle: "React",
    sections: [{ section: 1, _id: "uikiliolt" }],
  },
];

// console.log(exampleData1, exampleData2);
