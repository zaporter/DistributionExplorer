import 'katex/dist/katex.min.css'
import Latex from 'react-latex-next'

function DistributionStats(props){
    let params = props.params;
    let distribution = props.distribution;
    let expectedValue = distribution.kthRawMoment(params, 1);
    let variance = distribution.kthRawMoment(params, 2)-expectedValue*expectedValue;
    let stddev = Math.sqrt(variance);
    return (
        <div>
            <p>CDF:</p>
            <Latex>{`$ ${distribution.cdfLatex} $`}</Latex>
            <p>Kth Raw Moment:</p>
            <Latex>{`$ ${distribution.kthRawMomentLatex} $`}</Latex>
            <p>Expected: </p>
            <Latex>{`$ E[X] = ${expectedValue} $`}</Latex><br/>
            <Latex>{`$ {\\sigma}^2 = ${variance} $` }</Latex><br/>
            <Latex>{`$ \\sigma = ${stddev} $`}</Latex><br/>
        </div>
    );

}
export default DistributionStats;
