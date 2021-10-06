import React, {useState, useEffect, useRef} from 'react';

const Dropdown = ({label, options, selection, updateSelection}) => {    
    // State used to determine if dropdown is open or not
    const [open, setOpen] = useState(false);
    // Ref used to disregard clicking on the form
    const ref = useRef();
    
    useEffect(() => {
        const onBodyClick = (e) => {
            if (ref.current.contains(e.target)) {
                return;
            }
            setOpen(false);
        };

        document.body.addEventListener('click', onBodyClick, {capture: true});

        return () => {
            document.body.removeEventListener('click', onBodyClick, {capture: true});
        }
    });

    const renderedOptions = options.map((option) => {
        if (selection.id === option.id) {
            return;
        };

        return (
            <div 
                key={option.id}
                className="item"
                onClick={() => updateSelection(option)}
            >
                {option.value}
            </div>
        );
    });

    return (
        <div ref={ref} className="ui form">
            <div className="field">
                <label>{label}</label>
                <div 
                    className={`ui selection dropdown ${open ? 'active' : ''}`}
                    onClick={() => {setOpen(!open)}}
                >
                    <i className="dropdown icon"></i>
                    <div className="text">{selection.value}</div>
                    <div className={`menu ${open ? 'visible transition' : ''}`}>
                        {renderedOptions}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dropdown;