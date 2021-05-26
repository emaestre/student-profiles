import { useCallback } from 'react';
import { StudentSearchFilterBar } from 'components';
import './StudentSearchByTagBar.css';

function StudentSearchByTagBar(props) {
    const filterStudentsByTag = useCallback(
        ({ students, value: tagToFilter }) => {
            if (!tagToFilter) {
                return students;
            }

            return students.filter((student) => {
                const { tags } = student;

                const isTagMatched = tags.some(
                    (tag) =>
                        tag.toLowerCase().indexOf(tagToFilter.toLowerCase()) !==
                        -1
                );

                return isTagMatched;
            });
        },
        []
    );

    return (
        <StudentSearchFilterBar
            {...props}
            studentsFilter={filterStudentsByTag}
            filterName="students_by_tag"
            inputPlaceholder="Search by tag"
        />
    );
}

export default StudentSearchByTagBar;
