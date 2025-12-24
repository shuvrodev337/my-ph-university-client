import { useParams } from 'react-router-dom';

const StudentDetails = () => {
    const {studentId} = useParams() 
    return (
        <div>
            This is student details page of id {studentId}
        </div>
    );
};

export default StudentDetails;