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
    const [filters, setFilters] = useState([]);
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

    useEffect(() => {
        const filteredStudents = filters.reduce(
            (partiallyFilteredStudents, filter) => {
                const { filterStudents, value } = filter;

                return filterStudents({
                    students: partiallyFilteredStudents,
                    value,
                });
            },
            students
        );

        setFilteredStudents(filteredStudents);
    }, [filters, students]);

    const handleMergeFilter = useCallback((filterToMerge) => {
        setFilters((filters) => {
            const { name, value, filterStudents } = filterToMerge;

            const filterInList = filters.find((filter) => filter.name === name);

            if (filterInList) {
                return filters.map((filter) => {
                    if (filter.name === name) {
                        return {
                            name,
                            value,
                            filterStudents,
                        };
                    }

                    return filter;
                });
            }

            return [
                ...filters,
                {
                    name,
                    value,
                    filterStudents,
                },
            ];
        });
    }, []);

    return (
        <div className="App__Container">
            <div className="App__Workspace">
                {isLoading ? (
                    <div className="App__LoadingSection">
                        Loading students...
                    </div>
                ) : (
                    <Fragment>
                        <StudentSearchByNameBar
                            onMergeFilterStudents={handleMergeFilter}
                        />
                        <StudentSearchByTagBar
                            onMergeFilterStudents={handleMergeFilter}
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
