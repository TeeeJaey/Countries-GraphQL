import React from "react";
import { IListPropsType, IList } from "../../utils/Interfaces";
import "./List.css";

export default function List({ list }: IListPropsType) {
    return (
        <div className="list-container">
            {list.map((item: IList) => {
                return (
                    <span key={item.code} className="list-item">
                        <span>{item.name + " "}</span>
                        <span className="list-item-native">({item.native})</span>
                    </span>
                );
            })}
        </div>
    );
}
