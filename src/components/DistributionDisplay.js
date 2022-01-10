import Distribution from '../Distribution.js';
import Plotter from './Plotter.js';
import ParamEditor from './ParamEditor.js';
import ParamChecker from './ParamChecker.js';
import ParamConstraintDisp from './ParamConstraintDisp.js';
import React from 'react';
import DistributionStats from './DistributionStats.js';
import DataGenerator from './DataGenerator.js';
import 'katex/dist/katex.min.css'
import Latex from 'react-latex-next'
import styles from './DistributionStyles.module.css';


function DistributionDisplay(props) {
    let distribution : Distribution = props.distribution; 
    let [params, setParams] = React.useState(distribution.params);
    const paramCallback = (paramName, value)=>{
        let tParams = JSON.parse(JSON.stringify(params));
        tParams[paramName].value=value;
        setParams(tParams);
    }
    let expectedValue = distribution.kthRawMoment(params, 1);
    let variance = distribution.kthRawMoment(params, 2)-expectedValue*expectedValue;
    let stddev = Math.sqrt(variance);
    let plotlb = 0;
    let plotub = 20;
    if (Number.isFinite(stddev)){
        plotlb = expectedValue-2*stddev;
        plotlb = plotlb<distribution.theoreticalLowerBound?0:plotlb;
        plotub = expectedValue+2*stddev;
    }
    let shouldSplitVerically = window.innerWidth>500;
    return (
        <div className={shouldSplitVerically?styles.DistributionDisplayMain:''}>
        <div className={shouldSplitVerically?styles.DistributionDisplayLeft:''}>
            <p>{distribution.name}</p>
            {Object.entries(params).map( (entry) =>
                <ParamEditor key={entry[0]} param={entry[1]} onChange={paramCallback}/>
            )}
            <DistributionStats params={params} distribution={distribution} />
        </div>
        <div className={shouldSplitVerically?styles.DistributionDisplayLeft:''}>
            <ParamChecker params={params} paramConstraints={distribution.paramConstraints}>
                <Plotter title={`CDF of ${distribution.name} distribution`} lb={plotlb} ub={plotub} numSteps={50} evalFunction={(x)=>distribution.cdf(x,params)} width={20} height={20}/>
                <br/><br/><DataGenerator params={params} distribution={distribution}/>
            </ParamChecker>
        </div>
        <div style={{'clear':'both'}}></div>
    </div>
    );
}

export default DistributionDisplay;
