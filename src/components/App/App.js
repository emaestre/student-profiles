import { Fragment, useCallback, useEffect, useState } from 'react';
import {
    StudentCard,
    StudentSearchByNameBar,
    StudentSearchByTagBar,
} from 'components';
import './App.css';

function App() {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState(students);
    const [isLoading, setIsLoading] = useState(false);

    const fetchStudents = useCallback(async () => {
        const response = await fetch(
            'https://api.hatchways.io/assessment/students'
        );

        const fetchStudents = await response.json();
        const initializeStudentsWithTags = fetchStudents.students.map(
            (student) => {
                student.tags = [];
                return student;
            }
        );

        setStudents(initializeStudentsWithTags);
        setFilteredStudents(initializeStudentsWithTags);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        setIsLoading(true);
        fetchStudents();
    }, [fetchStudents]);

    const handleAddStudentTag = useCallback(({ studentId, tag }) => {
        setStudents((currentStudents) => {
            const studentIndexToAddTag = currentStudents.findIndex(
                (student) => student.id === studentId
            );

            currentStudents[studentIndexToAddTag].tags.push(tag);
            return [...currentStudents];
        });
    }, []);

    return (
        <div className="App__Container">
            <div className="App__Workspace">
                {isLoading ? (
                    <Fragment>Loading students...</Fragment>
                ) : (
                    <Fragment>
                        <StudentSearchByNameBar
                            students={students}
                            onFilterStudents={setFilteredStudents}
                        />
                        <StudentSearchByTagBar
                            students={students}
                            onFilterStudents={setFilteredStudents}
                        />
                        {filteredStudents.map((student, index) => (
                            <Fragment key={index}>
                                <StudentCard
                                    student={student}
                                    onAddStudentTag={handleAddStudentTag}
                                />
                                <hr className="App__StudentCardDivider" />
                            </Fragment>
                        ))}
                    </Fragment>
                )}
            </div>
        </div>
    );
}

export default App;
