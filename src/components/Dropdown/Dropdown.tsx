import React, { useEffect } from "react";
import { IDropdownPropsType, IItem } from "../../utils/Interfaces";
import "./Dropdown.css";

export default function Dropdown({ list, selected, onSelect }: IDropdownPropsType) {
    return (
        <div className="dropdown-container" data-testid="dropdown">
            <div className="dropdown">
                <button className="dropbtn"> {selected.name} </button>
                <div className="dropdown-content">
                    {list.map((item: IItem) => (
                        <a key={item.code} onClick={() => onSelect(item)} data-testid="dropdown-items">
                            {item.name}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
