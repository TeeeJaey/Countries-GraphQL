import React from "react";
import { IListPropsType, IList } from "../../utils/Interfaces";
import "./List.css";

/**
 * Function Component to display given List as boxes
 * @param list | list of items having code, name and native
 * @returns JSX
 */
export default function List({ list }: IListPropsType) {
    return (
        <div className="list-container" data-testid="list-container">
            {list.map((item: IList) => {
                return (
                    <span key={item.code} className="list-item" data-testid="list-item">
                        <span>{item.name + " "}</span>
                        <span className="list-item-native">{item.native}</span>
                    </span>
                );
            })}
        </div>
    );
}
