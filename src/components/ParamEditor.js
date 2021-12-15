import React from 'react';

function ParamEditor(props){
    const patterns = {
        natural: /^[0-9]+$/,
        integer: /^[-]?[0-9]+$/,
        real: /^[-]?[0-9]+[.]?[0-9]*$/,
    };
  
    let param = props.param;
    const [currentText, setCurrentText] = React.useState(param.value+"");
    const isValidInput = (inputText) => {
        return inputText.match(patterns[param.type]);
    }
    const refreshCaller = (text) => {
        let val = parseFloat(text);
        props.onChange(param.name, val);  
    }
    const handleChange = (event) => {
        var text=event.target.value;
        setCurrentText(text);
        if(isValidInput(text)){
            refreshCaller(text);
        }
    };
    return (
        <div>
            <p>{param.name} = {param.value}</p>
            <input style={{'backgroundColor':isValidInput(currentText)?'':'red'}} type="text" pattern="[0-9]*" onChange={handleChange} value={currentText}/>
        </div>
    );
};
export default ParamEditor;
