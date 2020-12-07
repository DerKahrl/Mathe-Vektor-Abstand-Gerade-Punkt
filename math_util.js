function getElementFromNodesById( Nodes , nodeId )
{
    for (let i = 0; i < Nodes.length; i++) 
    {
        if ( Nodes[i].id == nodeId )
            return Nodes[i];
    }
    return false;
}

function getSubElementById( Element , subElementId )
{
    return getElementFromNodesById(Element.childNodes,subElementId);
}

function VektorEinlesen( VektorElementName )
{
    var VektorDiv = document.getElementById(VektorElementName);

    var x1 = parseFloat( getSubElementById(VektorDiv,"x1").value );
    var x2 = parseFloat( getSubElementById(VektorDiv,"x2").value );
    var x3 = parseFloat( getSubElementById(VektorDiv,"x3").value );

    return new Vector( x1, x2, x3 );
}