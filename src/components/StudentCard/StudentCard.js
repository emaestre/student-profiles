import { useCallback, useMemo, useState } from 'react';
import classNames from 'classnames';
import {
    StudentCardTagForm,
    StudentCardAccordionDetails,
    StudentCardTagList,
} from 'components';
import './StudentCard.css';

function StudentCard(props) {
    const {
        student,
        onAddStudentTag: handleAddStudentTag,
        ...restProps
    } = props;

    const { company, email, firstName, grades, lastName, pic, skill, tags } =
        student;

    const [isAccordionOpen, setIsAccordionOpen] = useState(false);

    const gradesAverage = useMemo(() => {
        const gradesParsedToInt = grades.map((grade) => parseInt(grade));
        const gradesSum = gradesParsedToInt.reduce(
            (partialGradesSum, grade) => partialGradesSum + grade,
            0
        );

        return gradesSum / grades.length;
    }, [grades]);

    const handleClick = useCallback(() => {
        setIsAccordionOpen((wasOpen) => !wasOpen);
    }, []);

    return (
        <div className="StudentCard" key={student} {...restProps}>
            <div className="StudentCard_AvatarGridItem">
                <img className="StudentCard__Avatar" src={pic} alt="" />
            </div>
            <div className="StudentCard_DetailsGridItem">
                <h1 className="StudentCard__Name">{`${firstName.toUpperCase()} ${lastName.toUpperCase()}`}</h1>
                <p>{`Email: ${email}`}</p>
                <p>{`Company: ${company}`}</p>
                <p>{`Skill: ${skill}`}</p>
                <p>{`Average: ${gradesAverage}%`}</p>
                <StudentCardTagList tags={tags} />
                <StudentCardTagForm
                    student={student}
                    onAddStudentTag={handleAddStudentTag}
                />
                {isAccordionOpen && (
                    <StudentCardAccordionDetails grades={grades} />
                )}
            </div>
            <div className="StudentCard_AccordionButtonGridItem">
                <button
                    className={classNames(
                        'StudentCard_AccordionButton',
                        isAccordionOpen && 'StudentCard_AccordionButtonActive'
                    )}
                    onClick={handleClick}
                />
            </div>
        </div>
    );
}

export default StudentCard;
