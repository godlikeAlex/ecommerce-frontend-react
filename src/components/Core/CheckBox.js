import React, {useState} from "react";

const CheckBox = ({categories, handleFilters}) => {
    const [checked, setChecked] = useState([]);

    const handleChange = category => () => {
        const currentCategory = checked.indexOf(category);
        const newCheckedCategory = [...checked];

        if(currentCategory === -1) {
            newCheckedCategory.push(category);
        } else {
            newCheckedCategory.splice(currentCategory, 1);
        }
        setChecked(newCheckedCategory);
        handleFilters(newCheckedCategory);

    };

    return categories.map((category, i) => (
        <li key={i} className="list-unstyled">
            <input type="checkbox" onChange={handleChange(category._id)} value={checked.indexOf(category._id === -1)} className="from-check-input" />
            <label className="from-check-label">{category.name}</label>
        </li>
    ))
};

export default CheckBox;