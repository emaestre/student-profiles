import { useCallback, useEffect, useState } from 'react';
import './StudentSearchFilterBar.css';

function StudentSearchFilterBar(props) {
    const {
        onMergeFilterStudents: triggerMergeFilterStudents,
        studentsFilter,
        filterName,
        inputPlaceholder,
        ...restProps
    } = props;

    const [searchValue, setSearchValue] = useState(null);

    const handleChange = useCallback((event) => {
        const inputValue = event.target.value;
        setSearchValue(inputValue);
    }, []);

    useEffect(() => {
        triggerMergeFilterStudents({
            value: searchValue,
            filterStudents: studentsFilter,
            name: filterName,
        });
    }, [triggerMergeFilterStudents, searchValue, studentsFilter, filterName]);

    return (
        <div className="StudentSearchFilterBar__Container">
            <input
                className="StudentSearchFilterBar"
                placeholder={inputPlaceholder}
                onChange={handleChange}
                {...restProps}
            />
        </div>
    );
}

export default StudentSearchFilterBar;
