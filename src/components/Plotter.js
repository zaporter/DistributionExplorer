import {VictoryChart, VictoryLine, VictoryTheme} from 'victory';

function Plotter(props) {
    let data = [];
    let dx = props.ub-props.lb;
    for(var step=0; step<props.numSteps; step++){
        let x = props.lb + dx*(step/props.numSteps);
        let y = props.evalFunction(x);
        if (y<0 || y>1){
            continue;
        }
        data.push({'x':x, 'y':y});
    }
    return (
        <div style={{width:`${props.width}em`, height:`${props.height}em`}}>
            <h3 style={{'textAlign':'center'}}>{props.title}</h3>
        <VictoryChart
          theme={VictoryTheme.material}
        >
          <VictoryLine
            style={{
              data: { stroke: "#c43a31" },
              parent: { border: "1px solid #ccc"}
            }}
            data={data}
          />
        </VictoryChart>
        </div>
    );
};
export default Plotter;
