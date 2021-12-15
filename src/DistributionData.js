import ZMath from './ZMath.js';
import Constants from './Constants.js';
let DistributionData=[
{
            name:"Gaussian (Normal)",
            cdf:((x,params) => {
                let mu = params.mu.value;
                let sigma = params.sigma.value;
                return 0.5*(1+ZMath.erf((x-mu)/(sigma*Math.sqrt(2))));
            } ),
            theoreticalLowerBound:-1*Constants.infinity,
            params:{
                'mu':{
                    name:'mu',
                    value:0,
                    type:'real',
                },
                'sigma':{
                    name:'sigma',
                    value:1,
                    type:'real',
                },
            },
            cdfLatex:'\\frac{1}{2} (1+\\textrm{erf}(\\frac{x-\\mu}{\\sigma \\sqrt{2}}))',
            isDiscrete:false,
            paramConstraints:{
                'mu':{
                    isSatisfied: ((val) => (true)),
                    constraintLatex: "\\theta \\in \\R",
                },
                'sigma':{
                    isSatisfied: ((val) => (val!==0)),
                    constraintLatex: "\\sigma \\in \\R | \\sigma!=0 ",
                },
            },
            kthRawMoment: ((params,k) => {
                let mu = params.mu.value;
                let sigma = params.sigma.value;
                if (k==1){
                    return mu;
                }else if (k==2){
                    return mu*mu+sigma*sigma;
                }else{
                    return NaN;
                }
            }),
    kthRawMomentLatex: 'E[X^{k+1}] = \\mu E[X^{k}]+k*{\\sigma}^2 E[X^{k-1}]'
},
{
            name:"Burr",
            cdf:((x,params) => {
                let alpha = params.alpha.value;
                let theta = params.theta.value;
                let gamma = params.gamma.value;
                let u = 1/(1+Math.pow(x/theta,gamma));
                return 1-Math.pow(u,alpha);
            } ),
            theoreticalLowerBound:0,
            params:{
                'alpha':{
                    name:'alpha',
                    value:1.0,
                    type:'real',
                },
                'theta':{
                    name:'theta',
                    value:1.0,
                    type:'real',
                },
                'gamma':{
                    name:'gamma',
                    value:4.0,
                    type:'real',
                },
            },
            cdfLatex:'1-(\\frac{1}{1+(x/{\\theta})^{\\gamma}})^{\\alpha}',
            isDiscrete:false,
            paramConstraints:{
                'alpha':{
                    isSatisfied: ((val) => (val>0)),
                    constraintLatex: "\\alpha \\in \\R|\\alpha>0 ",
                },
                'theta':{
                    isSatisfied: ((val) => (val>0)),
                    constraintLatex: "\\theta \\in \\R|\\theta>0 ",
                },
                'gamma':{
                    isSatisfied: ((val) => (val!==0)),
                    constraintLatex: "\\gamma \\in \\R\\setminus \\{0\\} ",
                },
            },
            kthRawMoment: ((params,k) => {
                let theta = params.theta.value;
                let alpha = params.alpha.value;
                let gamma = params.gamma.value;
                if (-gamma>k || k>(alpha*gamma)){
                    return NaN;
                }
                let top = Math.pow(theta,k);
                top*=ZMath.gamma(1+k/gamma);
                top*=ZMath.gamma(alpha-k/gamma);
                let bottom = ZMath.gamma(alpha);
                
                return top/bottom;
            }),
    kthRawMomentLatex: 'E[X^k] = \\frac{{\\theta}^k \\Gamma(1+k/{\\gamma}) \\Gamma(\\alpha - k/{\\gamma})}{\\Gamma(\\alpha)}, -\\gamma<k<{\\alpha \\gamma}'
},
{
            name:"Inverse Burr",
            cdf:((x,params) => {
                let alpha = params.alpha.value;
                let theta = params.theta.value;
                let gamma = params.gamma.value;
                let utop=Math.pow(x/theta, gamma);
                let ubottom=1+Math.pow(x/theta,gamma);
                let u=utop/ubottom;
                return Math.pow(u,alpha);
            } ),
            theoreticalLowerBound:0,
            params:{
                'alpha':{
                    name:'alpha',
                    value:1.0,
                    type:'real',
                },
                'theta':{
                    name:'theta',
                    value:1.0,
                    type:'real',
                },
                'gamma':{
                    name:'gamma',
                    value:4.0,
                    type:'real',
                },
            },
            cdfLatex:'(\\frac{(x/{\\theta})^{\\gamma}}{1+(x/{\\theta})^{\\gamma}})^{\\alpha}',
            isDiscrete:false,
            paramConstraints:{
                'alpha':{
                    isSatisfied: ((val) => (val>0)),
                    constraintLatex: "\\alpha \\in \\R|\\alpha>0 ",
                },
                'theta':{
                    isSatisfied: ((val) => (val>0)),
                    constraintLatex: "\\theta \\in \\R|\\theta>0 ",
                },
                'gamma':{
                    isSatisfied: ((val) => (val!==0)),
                    constraintLatex: "\\gamma \\in \\R\\setminus \\{0\\} ",
                },
            },
            kthRawMoment: ((params,k) => {
                let theta = params.theta.value;
                let alpha = params.alpha.value;
                let gamma = params.gamma.value;
                if (-gamma>k || k>(alpha*gamma)){
                    return NaN;
                }
                let top = Math.pow(theta,k);
                top*=ZMath.gamma(alpha+k/gamma);
                top*=ZMath.gamma(1-k/gamma);
                let bottom = ZMath.gamma(alpha);
                
                return top/bottom;
            }),
    kthRawMomentLatex: 'E[X^k] = \\frac{{\\theta}^k \\Gamma(\\alpha+k/{\\gamma}) \\Gamma(1 - k/{\\gamma})}{\\Gamma(\\alpha)}, -{\\gamma \\alpha}<k<{ \\gamma}'
},
{
            name:"Pareto",
            cdf:((x,params) => (1.0-Math.pow((params.theta.value / (x+params.theta.value)),params.alpha.value)) ),
            theoreticalLowerBound:0,
            params:{
                'theta':{
                    name:'theta',
                    value:1.0,
                    type:'real',
                },
                'alpha':{
                    name:'alpha',
                    value:3.0,
                    type:'real',
                }
            },
            cdfLatex:'1-(\\frac{\\theta}{x+\\theta})^{\\alpha}',
            isDiscrete:false,
            paramConstraints:{
                'alpha':{
                    isSatisfied: ((val) => (val>0)),
                    constraintLatex: '\\alpha\\in\\R|\\alpha\\geq0',
                },
                'theta':{
                    isSatisfied: ((val) => (val>0)),
                    constraintLatex: "\\theta\\in\\R|\\theta>0",
                }
            },
            kthRawMoment: ((params,k) => {
                let t = params.theta.value;
                let a = params.alpha.value;
                let top = Math.pow(t,k)*ZMath.factorial(k);
                let bottom = 1;
                for (let i=1; i<=k; i++){
                    bottom *= (a-i);
                }
                return top/bottom;
            }),
            kthRawMomentLatex: 'E[X^k] = \\frac{{\\theta}^k k!}{\\prod_{i=1}^{k} (\\alpha-i)}'
},
{
            name:"Loglogistic (Fisk)",
            cdf:((x,params) => {
                let theta = params.theta.value;
                let gamma = params.gamma.value;
                let top = Math.pow(x/theta,gamma);
                let bottom = 1+Math.pow(x/theta,gamma);
                return top/bottom;
            } ),
            theoreticalLowerBound:0,
            params:{
                'theta':{
                    name:'theta',
                    value:0.1,
                    type:'real',
                },
                'gamma':{
                    name:'gamma',
                    value:2.5,
                    type:'real',
                },
            },
            cdfLatex:'\\frac{(x/{\\theta})^{\\gamma}}{1+(x/{\\theta})^{\\gamma}}',
            isDiscrete:false,
            paramConstraints:{
                'theta':{
                    isSatisfied: ((val) => (val>0)),
                    constraintLatex: "\\theta \\in \\R|\\theta>0 ",
                },
                'gamma':{
                    isSatisfied: ((val) => (val>0)),
                    constraintLatex: "\\gamma \\in \\R | \\gamma>0 ",
                },
            },
            kthRawMoment: ((params,k) => {
                let theta = params.theta.value;
                let gamma = params.gamma.value;
                if (-gamma > k || k> gamma){
                    return NaN;
                }
                let moment = Math.pow(theta,k);
                moment*=ZMath.gamma(1+k/gamma);
                moment*=ZMath.gamma(1-k/gamma);
                return moment;
            }),
    kthRawMomentLatex: 'E[X^k] = {\\theta}^k \\Gamma(1+k/{\\gamma}) \\Gamma(1-k/{\\gamma}), -\\gamma < k < \\gamma'
},
{
            name:"Generalized Pareto",
            cdf:((x,params) => {
                let xi = params.xi.value;
                let mu = params.mu.value;
                let sigma = params.sigma.value;
                let z = (x-mu)/sigma;
                if (xi==0){
                    return (1-Math.exp(-z));
                }else{
                    let power = -1/xi;
                    return (1-Math.pow(1+xi*z, power));
                }
            } ),
            theoreticalLowerBound:0,
            params:{
                'mu':{
                    name:'mu',
                    value:1.0,
                    type:'real',
                },
                'xi':{
                    name:'xi',
                    value:0.2,
                    type:'real',
                },
                'sigma':{
                    name:'sigma',
                    value:1.0,
                    type:'real',
                },
            },
            cdfLatex:'1-(1+\\xi (\\frac{x-\\mu}{\\sigma}))^{-1/{\\xi}}',
            isDiscrete:false,
            paramConstraints:{
                'sigma':{
                    isSatisfied: ((val) => (val>0)),
                    constraintLatex: "\\sigma \\in \\R | \\sigma >0",
                },
                'mu':{
                    isSatisfied: ((val) => (true)),
                    constraintLatex: "\\mu \\in \\R ",
                },
                'xi':{
                    isSatisfied: ((val) => (val>0)),
                    constraintLatex: "\\xi \\in \\R | \\xi >0 ",
                },
            },
            kthRawMoment: ((params,k) => {
                return NaN;
            }),
    kthRawMomentLatex: 'E[X^k] = Hard :('
},
{
            name:"Weibull",
            cdf:((x,params) => {
                let theta = params.theta.value;
                let tau = params.tau.value;
                return (1.0-Math.exp(-Math.pow(x/theta,tau)));
            } ),
            theoreticalLowerBound:0,
            params:{
                'theta':{
                    name:'theta',
                    value:5,
                    type:'real',
                },
                'tau':{
                    name:'tau',
                    value:1,
                    type:'real',
                },
            },
            cdfLatex:'1-e^{-(x/{\\theta})^{\\tau}}',
            isDiscrete:false,
            paramConstraints:{
                'theta':{
                    isSatisfied: ((val) => (val>0)),
                    constraintLatex: "\\theta \\in \\R|\\theta>0 ",
                },
                'tau':{
                    isSatisfied: ((val) => (val>0)),
                    constraintLatex: "\\tau \\in \\R | \\tau>0 ",
                },
            },
            kthRawMoment: ((params,k) => {
                let theta = params.theta.value;
                let tau = params.tau.value;
                if (k<(-tau)){
                    return NaN;
                }
                let moment = Math.pow(theta,k);
                moment*=ZMath.gamma(1+k/tau);
                return moment;
            }),
    kthRawMomentLatex: 'E[X^k] = {\\theta}^k \\Gamma(1+k/{\\tau}), k>-\\tau'
},
/*{
            name:"Lognormal",
            cdf:((x,params) => {
                let mu = params.mu.value;
                let sigma = params.sigma.value;
                let z = (Math.log(x)-mu)/sigma;
                return 0.5*(1+ZMath.erf((z-mu)/(sigma*Math.sqrt(2))));
            } ),
            theoreticalLowerBound:-1*Constants.infinity,
            params:{
                'mu':{
                    name:'mu',
                    value:0,
                    type:'real',
                },
                'sigma':{
                    name:'sigma',
                    value:1,
                    type:'real',
                },
            },
            cdfLatex:'\\Phi(\\frac{ln(x)-\\mu}{\\sigma})',
            paramConstraints:{
                'mu':{
                    isSatisfied: ((val) => (true)),
                    constraintLatex: "\\theta \\in \\R",
                },
                'sigma':{
                    isSatisfied: ((val) => (val!==0)),
                    constraintLatex: "\\sigma \\in \\R | \\sigma!=0 ",
                },
            },
            kthRawMoment: ((params,k) => {
                let mu = params.mu.value;
                let sigma = params.sigma.value;
                return Math.exp(k*mu+0.5*k*k*sigma*sigma);
            }),
    kthRawMomentLatex: 'E[X^k]=e^{k \\mu + 0.5 k^2 {\\sigma}^2}'
},*/

{
            name:"Exponential",
            cdf:((x,params) => {
                let theta = params.theta.value;
                return 1.0-Math.exp(-1*x/theta);
            } ),
            theoreticalLowerBound:0,
            params:{
                'theta':{
                    name:'theta',
                    value:5,
                    type:'real',
                },
            },
            cdfLatex:'1-e^{-x/{\\theta}}',
            isDiscrete:false,
            paramConstraints:{
                'theta':{
                    isSatisfied: ((val) => (val>0)),
                    constraintLatex: "\\theta \\in \\R | \\theta>0 ",
                },
            },
            kthRawMoment: ((params,k) => {
                let theta = params.theta.value;
                return Math.pow(theta,k)*ZMath.factorial(k)
            }),
    kthRawMomentLatex: 'E[X^{k}] = {\\theta}^k k!'
},
{
            name:"Poisson",
            cdf:((x,params) => {
                let lambda = params.lambda.value;
                let fk = Math.floor(x);
                let sum =0;
                for (let i=0; i<=fk; i++){
                    sum+=(Math.pow(lambda,i)/ZMath.factorial(i));
                }
                return Math.exp(-lambda)*sum;
            } ),
            theoreticalLowerBound:0,
            params:{
                'lambda':{
                    name:'lambda',
                    value:10,
                    type:'real',
                },
            },
            cdfLatex:'e^{-\\lambda} \\sum_{i=0}^{\\lfloor x \\rfloor} \\frac{{\\lambda}^i}{i!}',
            paramConstraints:{
                'lambda':{
                    isSatisfied: ((val) => (val>0)),
                    constraintLatex: "\\lambda \\in \\R | \\lambda>0 ",
                },
            },
            isDiscrete:true,
            kthRawMoment: ((params,k) => {
                let lambda = params.lambda.value;
                if (k==1){
                    return lambda;
                }else{
                    return lambda*lambda+lambda;
                }
            }),
    kthRawMomentLatex: 'E[X^{k}] = e^{-\\lambda} \\sum_{i=0}^{\\infty} \\frac{{\\lambda}^i}{i!}'
},
];

export default DistributionData;
