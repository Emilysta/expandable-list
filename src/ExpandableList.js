import { useEffect, useState } from "react";
import './ExpandableList.scss';

export default function ExpandableList(props) {
    let level = props.level;
    if (level === undefined || level === 0) {
        level = 0;
    }
    level++;
    let data = props.data;
    let labels = data.itemName;

    useEffect(() => {

    }, [])

    function onChange(e) {
        if (e.target.type === "radio") {
            e.preventDefault();
            const elements = document.getElementsByName(e.target.name);
            console.log(elements);
            elements.forEach(element => {
                element.checked = false;
            });
            e.target.checked = true;
        }
    }
    let fontSize = data.fontSize ? data.fontSize + "px" : '16px';

    if (data.children)
        return (
            <ul className={`${props.className ? props.className : ''}`}>
                <li>
                    <div className="firstLabelContainer" style={{ fontSize: fontSize }}>
                        {data.listType && <div className="inputContainer">
                            <input type={data.listType} name={`fieldset_${level}`} onChange={onChange} defaultChecked={true} />
                            <span></span>
                        </div>}
                        <p>{labels[0]}</p>
                    </div>
                    {
                        labels.slice(1)?.map((label, i) => {
                            return (<p style={{ fontSize: fontSize }}>{label}</p>)
                        })
                    }

                    <div className="nestedContainer">
                        {
                            data.children?.map((item, i) => <ExpandableList data={item} level={level + 1} className={'nestedContainerChild'} />
                            )
                        }
                    </div>
                </li>
            </ul>
        )
    else
        return (

            <div className={`li ${props.className ? props.className : ''}`}>
                <div className="firstLabelContainer">
                    {data.listType && <div className="inputContainer">
                        <input type={data.listType} name={`fieldset_${level}`} />
                        <span></span>
                    </div>}
                    <p style={{ fontSize: fontSize }}>{labels[0]}</p>
                </div>
                {
                    labels.slice(1)?.map((label, i) => {
                        return (<p style={{ fontSize: fontSize }}>{label}</p>)
                    })
                }
            </div>
        )
}
