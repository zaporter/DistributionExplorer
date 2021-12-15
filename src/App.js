import ZMath from './ZMath.js';
import DistributionMainElement from './components/DistributionMainElement.js';
import styles from './components/DistributionStyles.module.css'
function App() {
    return (
        <div className="App">
        <h1 style={{'textAlign':'center'}}>Distribution Explorer</h1>
        <div className={styles.DistributionMainElementDiv}>
            <p style={{'margin':'1em'}}>
                Welcome to my distribution explorer. I have collected a few of my favorite distributions and allow you to play with their parameters. Most importantly, I allow you to create a dataset from any of them (of most any size).
<br/>
<br/>
                This works by numerically estimating the inverse of a distributions CDF and then uniformly sampling the (0,1) space to arrive at a distribution of x values that represents the distribution. I have included an analytical solution for what you should expect the mean, variance, and standard deviation to be, and then what they actually are after generating the points.

<br/>
<br/>
        Note: This project uses a Lanczos estimator for the Gamma function and another estimator for the error function. Those estimators along with using JavaScript basic floats can incur non-trivial amounts of error in some distributions.
                
                <br/>
                <br/>
                Source code: <a href={'https://github.com/zaporter/DistributionExplorer'}>https://github.com/zaporter/DistributionExplorer</a>
            </p>
        </div>
            <hr/>
        <DistributionMainElement/>
    
    </div>
  );
}

export default App;
