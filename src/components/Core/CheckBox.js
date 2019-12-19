import React, {useState, useEffect} from "react";

const CheckBox = ({categories}) => {
    return categories.map((category, i) => (
        <li key={i} className="list-unstyled">
            <input type="checkbox" className="from-check-input" />
            <label className="from-check-label">{category.name}</label>
        </li>
    ))
};

export default CheckBox;