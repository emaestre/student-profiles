import { Fragment } from 'react';
import './StudentCardTagList.css';

function StudentCardTagList(props) {
    const { tags, ...restProps } = props;

    return (
        <Fragment>
            <ul className="StudentCardTagList" {...restProps}>
                {tags.map((tag, index) => (
                    <li key={index} className="StudentCardTagListItem">
                        {tag}
                    </li>
                ))}
            </ul>
        </Fragment>
    );
}

export default StudentCardTagList;
