
function makeNode(lBound, uBound, criterion, lNode, uNode):Node{
    return {
        'lBound':lBound,
        'uBound':uBound,
        'criterion':criterion,
        'lNode':lNode,
        'uNode':uNode,
    }
}
interface Node{
    lBound:number;
    uBound:number;
    criterion:number;
    lNode:Node;
    uNode:Node;
}
export default Node;
export default makeNode;
