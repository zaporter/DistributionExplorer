import {erf} from 'mathjs';
//https://en.wikipedia.org/wiki/Lanczos_approximation
//https://www.w3resource.com/javascript-exercises/javascript-math-exercise-49.php
function Lanczos_Gamma(num) 
{
  const p = [
    0.99999999999980993, 676.5203681218851, -1259.1392167224028,
    771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7
  ];
  let i=0;
  let g = 7;
  if (num < 0.5) return Math.PI / (Math.sin(Math.PI * num) * Lanczos_Gamma(1 - num));
  num -= 1;
  let a = p[0];
  let t = num + g + 0.5;
  for (i = 1; i < p.length; i++) {
    a += p[i] / (num + i);
  }
  return Math.sqrt(2 * Math.PI) * Math.pow(t, num + 0.5) * Math.exp(-t) * a;
};

let ZMath= {
    sqrt: (x) =>{
        return Math.sqrt(x);
    },
    pow: (x,y) =>{
        return Math.pow(x,y);
    },
    factorial: (x) =>{
        let val = 1;
        for (let i=1; i<=x; i++){
            val*=i;
        }
        return val;
    },
    gamma:(x)=>{
        return (Lanczos_Gamma(x));
    },
    erf:(x)=>{
        return erf(x);
    }
};
export default ZMath;

