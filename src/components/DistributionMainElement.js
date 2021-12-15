import DistributionDisplay from './DistributionDisplay.js';
import DistributionData from '../DistributionData.js';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import React from 'react';
import styles from './DistributionStyles.module.css';

function DistributionMainElement(props){
    const distributionNames = DistributionData.map((dist) => (dist.name));
    const options = distributionNames.reduce((total,dist,id) => (total.concat({value:dist, label:(`${id+1}/${distributionNames.length}: ${dist}`)})),[]);
    const [currentDist, setCurrentDist] = React.useState(options[0]);
    const [enabled, setEnabled] = React.useState(true);
    const onDropdownChange=(event)=>{
        setEnabled(false);
        setCurrentDist(event);
        setEnabled(true);
    };
    const getDistFromName = (current)=>{
        for (var dist in options){
            if(distributionNames[dist]==current.value){
                return {...DistributionData[dist]};
            }
        }
    };
    const getDistIDFromName = (current)=>{
        for (var dist in options){
            if(distributionNames[dist]==current.value){
                return dist;
            }
        }
    };
    
    return (
        <div className={styles.DistributionMainElementDiv}>
            <div style={{margin:'4em', 'marginBottom':'4em', bottom:'4em'}}>
            <Dropdown options={options} onChange={onDropdownChange} value={currentDist}/>
            <DistributionDisplay key={getDistIDFromName(currentDist)} distribution={getDistFromName(currentDist)} />
            </div>
            </div>
    );    

};

export default DistributionMainElement;
