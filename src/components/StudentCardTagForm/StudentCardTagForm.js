import { useCallback, useState } from 'react';
import './StudentCardTagForm.css';

function StudentCardTagForm(props) {
    const {
        student,
        onAddStudentTag: triggerAddStudentTag,
        ...restProps
    } = props;

    const [tag, setTag] = useState('');

    const handleSubmit = useCallback(
        (event) => {
            event.preventDefault();
            event.stopPropagation();
            triggerAddStudentTag({ studentId: student.id, tag });
            setTag('');
        },
        [triggerAddStudentTag, student, tag]
    );

    const handleChange = useCallback((event) => {
        const {
            target: { value: studentTag },
        } = event;

        setTag(studentTag);
    }, []);

    return (
        <div className="StudentCardTagForm__Container">
            <form onSubmit={handleSubmit}>
                <input
                    className="StudentCardTagFormInput"
                    placeholder="Add a tag"
                    onChange={handleChange}
                    value={tag}
                    {...restProps}
                />
            </form>
        </div>
    );
}

export default StudentCardTagForm;
