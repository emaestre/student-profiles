import { Fragment } from 'react';
import './StudentCardAccordionDetails.css';

function StudentCardAccordionDetails(props) {
    const { grades, ...restProps } = props;
    const identation = '\u00A0\u00A0\u00A0\u00A0\u00A0';

    return (
        <Fragment>
            <ul className="StudentCardAccordionDetails" {...restProps}>
                {grades.map((grade, index) => (
                    <li
                        key={index}
                        className="StudentCardAccordionDetailsItem"
                    >{`Test ${index + 1}: ${identation}${grade}%`}</li>
                ))}
            </ul>
        </Fragment>
    );
}

export default StudentCardAccordionDetails;
