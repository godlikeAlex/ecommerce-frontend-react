import React, {useState, useEffect, Fragment} from "react";

const RadioBox = ({prices}) => {
    const [value, setValue] = useState(0);

    const handleChange = () => {
        return 1;
    };

    return prices.map((price, i) => (
        <div key={i}>
            <input type="radio" onChange={handleChange} value={`${price._id}`} className="mr-2 ml-4" />
            <label className="from-check-label">{price.name}</label>
        </div>
    ))
};

export default RadioBox;