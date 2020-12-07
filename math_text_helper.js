//Functions that produce text for explanation


function getVectorNameHTML( Name )
{
    return "<div class='VectorName'>"+Name+"<span>&rarr;</span></div>";
}

function getFraction( Zaehler, Nenner )
{
    var str = "<div class='Fraction'>";

    str += "<div class='FractionTop'>"+Zaehler+"</div>";
    str += "<div class='SeperatorLine'></div>";
    str += "<div class='FractionBottom PaddingTop5'>"+Nenner+"</div>";
    str += "</div>";
    return str;
}

function getVectorHTML( vec, abosulteSign )
{
    var absolutecharLeft = "";
    var absolutecharRight = "";
    if ( abosulteSign !== undefined )
    {
        if ( abosulteSign != 'r' )
            absolutecharLeft = "| ";
        if ( abosulteSign != 'l' )
            absolutecharRight = " |";
    }
    return "<div class='VectorOutputBox'>"+
    
    //"("+x1+")<br>("+x2+")<br>("+x3+")"
    "<table>\n"+
    
    "   <tr>\n"+
    "   <td>"+absolutecharLeft+"(</td>\n"+
    "   <td>"+MNKS(vec.x[0],2)+"</td>\n"+
    "   <td>)"+absolutecharRight+"</td>\n"+
    "   </tr>\n"+

    "   <tr>\n"+
    "   <td>"+absolutecharLeft+"(</td>\n"+
    "   <td>"+MNKS(vec.x[1],2)+"</td>\n"+
    "   <td>)"+absolutecharRight+"</td>\n"+
    "   </tr>\n"+

    "   <tr>\n"+
    "   <td>"+absolutecharLeft+"(</td>\n"+
    "   <td>"+MNKS(vec.x[2],2)+"</td>\n"+
    "   <td>)"+absolutecharRight+"</td>\n"+
    "   </tr>\n"+

    "</table>\n</div>\n";
}

function getVectorOperationHTML( v1, operator, v2 )
{
    var resultText = "<div class='VectorOutputBox'>"+
    
    //"("+x1+")<br>("+x2+")<br>("+x3+")"
    "<table>\n";

    for (var i = 0; i < 3; i++)
    {
        var a = v1.x[i];
        var b = v2.x[i];

        if ( a == -0 ) a = 0;
        if ( b == -0 ) b = 0;

        resultText +=
        "   <tr>\n"+
        "   <td>(</td>\n"+
        "   <td>"+ ( a < 0 ? "-" : "" ) +"</td>\n"+
        "   <td>"+MNKS(Math.abs(a),2)+"</td>\n"+
        "   <td>"+operator+"</td>\n"+
        "   <td>"+ ( b < 0 ? "(-" : "" ) +"</td>\n"+
        "   <td>"+MNKS(Math.abs(b),2)+"</td>\n"+
        "   <td>"+ ( b < 0 ? ")" : "" ) +"</td>\n"+
        "   <td>)</td>\n"+
        "   </tr>\n\n";
    }
    resultText += "</table>\n</div>\n";

    return resultText;
}

function getVectorOperationVarHTML( v1, var1 = null, operator, v2, var2 = null )
{
    var resultText = "<div class='VectorOutputBox'>"+
    
    //"("+x1+")<br>("+x2+")<br>("+x3+")"
    "<table>\n";

    for (var i = 0; i < 3; i++)
    {
        var a = v1.x[i];
        var b = v2.x[i];

        if ( a == -0 ) a = 0;
        if ( b == -0 ) b = 0;

        
        resultText +="   <tr>\n";
        resultText +="   <td>(</td>\n";


        /////////////////////// Zahl Links ///////////////////////
        resultText +="   <td>"+ ( a < 0 ? "-" : "" ) +"</td>\n";

        if ( (a == 1 || a == -1) && var1 != null )
        resultText +="   <td></td>\n";
        else
        resultText +="   <td>"+MNKS(Math.abs(a),2)+"</td>\n";

        if ( var1 != null )
        resultText +="   <td>"+var1+"</td>\n";
        //////////////////////////////////////////////////////////

        resultText +="   <td>"+operator+"</td>\n";

        /////////////////////// Zahl Rechts //////////////////////
        resultText +="   <td>"+ ( b < 0 ? "(-" : "" ) +"</td>\n";
        
        if ( (b == 1 || b == -1) && var2 != null )
        resultText +="   <td></td>\n";
        else
        resultText +="   <td>"+MNKS(Math.abs(b),2)+"</td>\n";

        if ( var2 != null )
        resultText +="   <td>"+var2+"</td>\n";

        resultText +="   <td>"+ ( b < 0 ? ")" : "" ) +"</td>\n";
        //////////////////////////////////////////////////////////

        resultText +="   <td>)</td>\n";
        resultText +="   </tr>\n\n";
    }
    resultText += "</table>\n</div>\n";

    return resultText;
}