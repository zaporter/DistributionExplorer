
import 'katex/dist/katex.min.css'
import Latex from 'react-latex-next'

function ParamConstraintDisp(props){
    let constraint = props.constraint;
    let param = props.param;
    if (constraint.isSatisfied(param.value)){
        return (<div/>);
    }else{
        return (
        <div >
            <h2>Constraint not satisfied: {param.name}</h2>
        <Latex>{`$ ${constraint.constraintLatex} $`}</Latex>
            </div>
        );
    }
};
export default ParamConstraintDisp;
