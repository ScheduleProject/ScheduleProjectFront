import { BsSortAlphaDown, BsCalendarDate, BsStarFill } from "react-icons/bs";


function FilterBox({ value }) {
    if (value === 'asc'){
        return <BsSortAlphaDown className="logoFilter" />;
    } else if (value === 'date'){
        return <BsCalendarDate className="logoFilter" />;
    } else if (value === 'like'){
        return <BsStarFill className="logoFilter" />;
    }
}

export default FilterBox;