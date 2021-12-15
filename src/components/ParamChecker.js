import ParamConstraintDisp from './ParamConstraintDisp.js';
import React from 'react';
function ParamChecker(props){
    let params = props.params;
    let constraints = props.paramConstraints;
    let satisfied=true;
    Object.values(params).map((param)=>{
        satisfied=satisfied?constraints[param.name].isSatisfied(param.value):false;
    });
    return (
        <div>
        {Object.values(params).map( (param) =>
            <ParamConstraintDisp key={param.name} param={param} constraint={constraints[param.name]}/>
        )}

        {satisfied&&props.children}
        </div>
    );
};

export default ParamChecker;
