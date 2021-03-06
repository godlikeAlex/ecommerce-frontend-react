import React, {useState, useEffect, Fragment} from "react";

const RadioBox = ({prices, handleFilters}) => {
    const [value, setValue] = useState(0);

    const handleChange = e => {
        handleFilters(e.target.value);
        setValue(e.target.value);
    };

    return prices.map((price, i) => (
        <div key={i}>
            <input type="radio" onChange={handleChange} name={price} value={`${price.id}`} className="mr-2 ml-4" />
            <label className="from-check-label">{price.name}</label>
        </div>
    ))
};

export default RadioBox;