import 'katex/dist/katex.min.css'
import Latex from 'react-latex-next'
function DataAnalysis(props){
    let points = props.points;
    function getExpectedValue(){
        let sum =0;
        for (let i=0; i<points.length; i++){
            sum+=points[i];
        }
        return sum/points.length;
    }
    function getVariance(){
        let ex = getExpectedValue();
        let sum =0;
        let divisor = points.length;
        for (let i=0; i<points.length; i++){
            sum+=((points[i]-ex)*(points[i]-ex));
        }
        return sum/divisor;
    }
    function getStddev(){
        return Math.sqrt(getVariance());   
    }
    if (points.length ==0){
        return (<div/>);
    }
    let expected = `$ E[x] = ${points.length>0?getExpectedValue():""} $`
    let variance = `$ {\\sigma}^2 = ${points.length>1?getVariance():""} $`
    let stddev = `$ \\sigma = ${points.length>1?getStddev():""} $`
    return (<div>
        <h4>Data Analysis:</h4>
        <Latex>{expected}</Latex><br/>
        <Latex>{variance}</Latex><br/>
        <Latex>{stddev}</Latex><br/>
        </div>);
}
export default DataAnalysis;
