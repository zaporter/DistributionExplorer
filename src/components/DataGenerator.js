import React from 'react';
import Constants from '../Constants.js';
import ParamEditor from './ParamEditor.js';
import DataAnalysis from './DataAnalysis.js';
import styles from './DistributionStyles.module.css';
//const random = require('random');
//const seedrandom=require('seedrandom');

function DataGenerator(props){
    
    function cdfINV(y, tree){
        let currentNode=tree;
        while(currentNode.ub-currentNode.lb > Constants.convergenceCrit){
            if (y==currentNode.crit){
                break;
            }
            let delta=(currentNode.ub-currentNode.lb)/2.0;
            if (y<currentNode.crit){
                if(currentNode.lnode===null){
                    currentNode.lnode = genNode(currentNode.lb, currentNode.lb+delta);  
                }
                currentNode=currentNode.lnode;
            }else{
                if (currentNode.unode===null){
                    currentNode.unode = genNode(currentNode.lb+delta, currentNode.ub);
                }
                currentNode=currentNode.unode;
            }
        }
        return currentNode.x;
    }
    function genNode( lb, ub){
        let x = lb+((ub-lb)/2.0);
        return {
            'lb':lb,
            'ub':ub,
            'x':x,
            'crit':distribution.cdf(x,params),
            'lnode':null,
            'unode':null,
        };
    }

    function generatePoints(numToGen){
        let tree = genNode( distribution.theoreticalLowerBound, Constants.infinity);
        let data=[];
        for (var i =0; i<numToGen;i++){
            let y = Math.random();
            let x = cdfINV(y,tree);
            data.push(x);
        }
        return data;
    }
    let distribution = props.distribution;
    let params = props.params;
    const numPointsParam = {
        name:'Num Points',
        value:10000,
           
    }; 
    let seedParam = {
        name:'Random Seed',
        value:6,
           
    }; 
    const [points, setPoints] = React.useState([]);
    const [numPoints, setNumPoints] = React.useState({name:'Num Points', value:10000, type:'natural'});
    const [seed,setSeed] = React.useState(seedParam);
    const onPointsChange = (name, val)=>{
        let numPointsCpy = {name:numPoints.name,type:numPoints.type, value:val};
        setNumPoints(numPointsCpy);
    }
    const onSeedChange = (name, val)=>{
        setSeed(val);
    }
    const generateButtonPressed = () =>{
        setPoints(generatePoints(numPoints.value));
    }

    if (distribution.isDiscrete){
        return (
        <div className={styles.DataGenerator}>
            <h3>Data Generator</h3>

            <p>Data generation is not supported for discrete distributions yet</p>
        </div>
            );
    }
    return (
        <div className={styles.DataGenerator}>
            <h3>Data Generator</h3>
            
            <ParamEditor param={numPoints} onChange={onPointsChange} />
            {
                //<ParamEditor param={seed} onChange={onSeedChange} />
            }
            <button
                onClick={generateButtonPressed}
            >Generate!</button>
            <br/>
            <textarea style={{width:'100%',height:'5em'}}readOnly value={points.reduce((all, point,index) => (all + (index>0?", ":"")+point),"")}/>
            <DataAnalysis points={points}/>
        </div>
    )

}
export default DataGenerator;
