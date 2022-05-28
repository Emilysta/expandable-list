import './ExpandableList.scss';

export default function ExpandableList(props) {
    let level = props.level;
    if (level === undefined || level === 0) {
        level = 0;
    }
    level++;
    let data = props.data;
    let labels = data.itemName;

    let fontSize = data.fontSize ? data.fontSize + "px" : '16px';
    let isEven = props.isEven;

    if (data.children)
        return (<>
            <ul className={`${props.className ? props.className : ''}`}>
                <li style={{ fontSize: fontSize }}>
                    <input type={data.listType} name={`fieldset_${level}`} />
                    <div className={`labelContainer ${level === 1 ? 'level0' : ''}`} >
                        {data.listType && <div className="inputContainer">
                            <span></span>
                            <p>{labels[0]}</p>
                        </div>}
                        <div className="paddingLabels">
                            {labels.slice(1).map((label, i) => {
                                return (
                                    <p key={i}>
                                        {label}
                                    </p>)
                            })
                            }
                        </div>
                    </div>


                    <div className={`nestedContainer`} >
                        {
                            data.children?.map((item, i) =>
                                <ExpandableList data={item} level={level + 1} className={'nestedContainerChild'} key={i} isEven={i % 2 === 0} />
                            )
                        }
                    </div>

                </li>
            </ul >
        </>
        )
    else
        return (
            <div className={`li ${props.className ? props.className : ''}`}>
                <div className={`labelContainer  ${isEven ? 'isEven' : ''}`} style={{ fontSize: fontSize }}>
                    {
                        labels?.map((label, i) => {
                            return (<p key={i}>{label}</p>)
                        })
                    }
                </div>
            </div>
        )
}
