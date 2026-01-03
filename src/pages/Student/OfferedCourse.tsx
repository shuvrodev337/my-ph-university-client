import { Button, Col, Row } from "antd";
import { useGetMyOfferedCoursesQuery } from "../../redux/features/student/courseRelatedApi";
type TAcc = {
  [index: string]: any;
};
const OfferedCourse = () => {
  const { data: offeredCourses } = useGetMyOfferedCoursesQuery(undefined);

  const singleObject = offeredCourses?.data?.reduce((acc: TAcc, item) => {
    console.log(item);
    const key = item?.course?.title;
    acc[key] = acc[key] || { courseTitle: key, sections: [] }; // used || to to avoid replacing the object and making the sections: [] everytime loop iterates
    acc[key].sections.push({
      section: item.section,
      _id: item._id,
      days: item.days,
      startTime: item.startTime,
      endTime: item.endTime,
    });
    return acc;
  }, {});
  // console.log(singleObject);
  // console.log(Object.values(singleObject ? singleObject : {}));
  const modifiedData = Object.values(singleObject ? singleObject : {});
  return (
    <Row gutter={[0, 20]}>
      {modifiedData?.map((item) => {
        return (
          <Col span={24} style={{ border: "solid #d4d4d4 1px" }}>
            <div style={{ padding: "10px" }}>
              <h2> {item.courseTitle} </h2>
            </div>
            <div>
              {item?.sections.map((section) => {
                return (
                  <Row
                    justify={"space-between"}
                    align={"middle"}
                    style={{ border: "solid #d4d4d4 1px", padding: "10px" }}
                  >
                    <Col span={5}>Section : {section.section}</Col>
                    <Col span={5}>
                      Days:{" "}
                      {section.days.map((day) => (
                        <span> {day} </span>
                      ))}
                    </Col>
                    <Col span={5}>Start time : {section.startTime}</Col>
                    <Col span={5}>End time : {section.endTime}</Col>
                    <Button>Enroll</Button>
                  </Row>
                );
              })}
            </div>
          </Col>
        );
      })}
    </Row>
  );
};

export default OfferedCourse;

/*
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
*/
