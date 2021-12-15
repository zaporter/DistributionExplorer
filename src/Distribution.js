export interface Distribution{
    name:string;
    theoreticalLowerBound:number;
    cdf:any;
    params:any;
    cdfLatex:string;
    pdfLatex:string;
    kthRawMoment:any;
    kthRawMomentLatex:string;
    isDiscrete:any;
    paramConstraints:any;
};
