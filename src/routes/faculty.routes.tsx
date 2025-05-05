import CreateCourse from "../pages/Faculty/CreateCourse";
import FacultyDashboard from "../pages/Faculty/FacultyDashboard";

export const facultyPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <FacultyDashboard />,
  },
  {
    name: "Create course",
    path: "create-course",
    element: <CreateCourse />,
  },
];
