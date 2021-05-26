import { useCallback } from 'react';
import { StudentSearchFilterBar } from 'components';
import './StudentSearchByNameBar.css';

function StudentSearchByNameBar(props) {
    const filterStudentsByName = useCallback(
        ({ students, value: studentName }) => {
            if (!studentName) {
                return students;
            }

            return students.filter((student) => {
                const { firstName, lastName } = student;

                const isFirstNameMatched =
                    firstName
                        .toLowerCase()
                        .indexOf(studentName.toLowerCase()) !== -1;

                const isLastNameMatched =
                    lastName
                        .toLowerCase()
                        .indexOf(studentName.toLowerCase()) !== -1;

                return isFirstNameMatched || isLastNameMatched;
            });
        },
        []
    );

    return (
        <StudentSearchFilterBar
            {...props}
            studentsFilter={filterStudentsByName}
            filterName="students_by_name"
            inputPlaceholder="Search by name"
        />
    );
}

export default StudentSearchByNameBar;
