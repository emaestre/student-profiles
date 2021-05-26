import { useCallback } from 'react';
import './StudentSearchByNameBar.css';

function StudentSearchByNameBar(props) {
    const {
        students,
        onFilterStudents: triggerFilterStudents,
        ...restProps
    } = props;

    const handleChange = useCallback(
        (event) => {
            const studentToFilter = event.target.value;
            const filteredStudents = students.filter((student) => {
                const { firstName, lastName } = student;

                const isFirstNameMatched =
                    firstName
                        .toLowerCase()
                        .indexOf(studentToFilter.toLowerCase()) !== -1;

                const isLastNameMatched =
                    lastName
                        .toLowerCase()
                        .indexOf(studentToFilter.toLowerCase()) !== -1;

                return isFirstNameMatched || isLastNameMatched;
            });

            triggerFilterStudents(filteredStudents);
        },
        [students, triggerFilterStudents]
    );

    return (
        <div className="StudentSearchByNameBar__Container">
            <input
                className="StudentSearchByNameBar"
                placeholder="Search by name"
                onChange={handleChange}
                {...restProps}
            />
        </div>
    );
}

export default StudentSearchByNameBar;
