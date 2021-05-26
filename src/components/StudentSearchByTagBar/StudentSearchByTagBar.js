import { useCallback } from 'react';
import './StudentSearchByTagBar.css';

function StudentSearchByTagBar(props) {
    const {
        students,
        onFilterStudents: triggerFilterStudents,
        ...restProps
    } = props;

    const handleChange = useCallback(
        (event) => {
            const studentToFilter = event.target.value;
            const filteredStudents = students.filter((student) => {
                const { tags } = student;

                const isTagMatched = tags.some(
                    (tag) =>
                        tag
                            .toLowerCase()
                            .indexOf(studentToFilter.toLowerCase()) !== -1
                );

                return isTagMatched;
            });

            triggerFilterStudents(filteredStudents);
        },
        [students, triggerFilterStudents]
    );

    return (
        <div className="StudentSearchByTagBar__Container">
            <input
                className="StudentSearchByTagBar"
                placeholder="Search by tag"
                onChange={handleChange}
                {...restProps}
            />
        </div>
    );
}

export default StudentSearchByTagBar;
