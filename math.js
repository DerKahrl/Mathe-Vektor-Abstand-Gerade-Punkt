function onBodyLoad() { }

//MNKS => Max Nach-Komma Stellen
function MNKS( number, stellen )
{
    return parseFloat( number.toFixed(stellen) );
}

function Rechnen_Variante1()
{
    //Einlesen der Vektoren:
    var OrtsVektor = VektorEinlesen("OrtsVektor");

    var RichtungsVektor = VektorEinlesen("RichtungsVektor");

    var PunktP = VektorEinlesen("PunktP");

    //In der Javascript Konsole ausgeben: ( zum testen )
    //OrtsVektor.logToConsole("OrtsVektor");
    //RichtungsVektor.logToConsole("RichtungsVektor");
    //PunktP.logToConsole("PunktP");


    ///////////////////// eigentliche Rechnung /////////////////////
    //       →    →
    //  PV = 0V - 0P
    var PV = OrtsVektor.sub( PunktP );

    //              →    →
    //  RV_dot_PV = RV · PV
    var RV_dot_PV = RichtungsVektor.dot( PV );
    
    //              →    →
    //  RV_dot_RV = RV · RV
    var RV_dot_RV = RichtungsVektor.dot( RichtungsVektor );

    //            →    →       →    →
    //  Skalar = (RV · PV) / -(RV · RV)
    var Skalar = RV_dot_PV / -RV_dot_RV;

    //  PL = PV + ( RV * Skalar )
    var PL = PV.add( RichtungsVektor.mul(Skalar) );
    ////////////////////////////////////////////////////////////////

    //Ausgabe des Rechenweges:
    var Ausgabe = "";

    /****************************** A *******************************/
    Ausgabe += "<b>(a)</b> "+getVectorNameHTML("0L")+" berechnen (Ortsvektor Lotfußpunkt L)<br>\n";

    Ausgabe += "L liegt auf g, somit gilt:<br>\n<br>\n";
    
    //      (0V.x1)       (RV.x1)
    // 0L = (0V.x2) + s · (RV.x2)
    //      (0V.x3)       (RV.x3)
    Ausgabe += getVectorNameHTML("0L")+"="+ getVectorHTML( OrtsVektor )+" + s · "+getVectorHTML( RichtungsVektor )+"\n<br>\n";
    Ausgabe += "<br>";

    //      (0V.x1 + RV.x1 *s)
    // 0L = (0V.x2 + RV.x2 *s)
    //      (0V.x3 + RV.x3 *s)
    Ausgabe += getVectorNameHTML("0L")+"="+ getVectorOperationVarHTML( OrtsVektor, null, '+', RichtungsVektor, 's' )+"\n<br>\n";
    Ausgabe += "<br>";
    Ausgabe += "<br>";

    /****************************** B *******************************/
    Ausgabe += "<b>(b)</b> "+getVectorNameHTML("PL")+" aufstellen ("+getVectorNameHTML("PL")+"="+getVectorNameHTML("0L")+" - "+getVectorNameHTML("0P")+")<br>\n";
    Ausgabe += "<br>";
    
    //      (0V.x1 + RV.x1 *s)   (0P.x1)
    // 0L = (0V.x2 + RV.x2 *s) - (0P.x2)
    //      (0V.x3 + RV.x3 *s)   (0P.x3)
    Ausgabe += getVectorNameHTML("PL")+"="+ getVectorOperationVarHTML( OrtsVektor, null, '+', RichtungsVektor, 's' )+" - "+getVectorHTML( PunktP )+"\n<br>\n";
    Ausgabe += "<br>";

    //      (PV.x1 + RV.x1 *s)
    // 0L = (PV.x2 + RV.x2 *s)
    //      (PV.x3 + RV.x3 *s)
    Ausgabe += getVectorNameHTML("PL")+"="+ getVectorOperationVarHTML( PV, null, '+', RichtungsVektor, 's' )+"\n<br>\n";
    Ausgabe += "<br>";

    /****************************** C *******************************/
    Ausgabe += "<b>(c)</b> Skalar s konkret berechnen<br>\n";
    Ausgabe += "Skalarprodukt != 0 ; Richtungsvektor · "+getVectorNameHTML("PL")+" != 0<br>\n";
    Ausgabe += "<br>";
    Ausgabe += getVectorNameHTML("RV")+" · "+getVectorNameHTML("PL")+" = 0";
    Ausgabe += "<br>";

    // (RV.x1)   (PV.x1 + RV.x1 *s)
    // (RV.x2) · (PV.x2 + RV.x2 *s) = 0
    // (RV.x3)   (PV.x3 + RV.x3 *s)
    Ausgabe += getVectorHTML(RichtungsVektor)+" · "+getVectorOperationVarHTML( PV, null, '+', RichtungsVektor, 's' ) + " = 0";
    Ausgabe += "<br>";
    Ausgabe += "<br>";

    //Ausgeben:
    //RV.x1*(PV.x1+RV.x1*s) + RV.x2*(PV.x2+RV.x2*s) + RV.x3*(PV.x3+RV.x3*s) = 0
    for( var i= 0; i < 3; i++ )
    {
        var text_p = RichtungsVektor.x[i];
        if ( text_p == 1 )
             text_p = "";
        else
        if ( text_p == -1 )
            text_p = "-";

        var textop2 = "+"+text_p+"s";

        //If its times zero we can just remove it from the equation 
        if ( RichtungsVektor.x[i] == 0 )
            textop2 = "";

        if ( i  > 0 )
            Ausgabe += " + ";
        
        Ausgabe += ""+RichtungsVektor.x[i]+"*("+PV.x[i]+textop2+")";
    }
    Ausgabe += " = 0"
    Ausgabe += "<br>";
    Ausgabe += "<br>";

    //Ausgeben:
    //<RV.x1*PV.x1> + <RV.x1*RV.x1>*s + <RV.x2*PV.x2> + <RV.x2*RV.x2>*s + <RV.x3*PV.x3> + <RV.x3*RV.x3>*s = 0 
    for( var i= 0; i < 3; i++ )
    {
        if ( i  > 0 )
            Ausgabe += " + ";

        var wert = RichtungsVektor.x[i]*PV.x[i];
        if ( wert == -0 ) wert = 0;

        if ( wert < 0 )
            wert = "("+MNKS(wert,2)+")";
        Ausgabe += ""+wert;

        
        wert = RichtungsVektor.x[i]*RichtungsVektor.x[i];
        if ( wert == -0 ) wert = 0;

        if ( wert != 0 )
        {
            if ( wert == 1 )
            {
                wert = "s";
            }
            else
            if ( wert < 0 )
                wert = "("+MNKS(wert,2)+"s)";
            else
                wert = ""+MNKS(wert,2)+"s";

            Ausgabe += "+"+wert;
        }
    }
    Ausgabe += " = 0"
    Ausgabe += "<br>";
    Ausgabe += "<br>";

    //Ausgeben
    //RV_dot_PV + RV_dot_RV*s = 0 | -RV_dot_RV*s
    Ausgabe += ""+RV_dot_PV+" + "+RV_dot_RV+"s = 0  | -("+RV_dot_RV+")s";
    Ausgabe += "<br>";
    Ausgabe += "<br>";

    //Ausgeben
    //RV_dot_PV + RV_dot_RV*s = 0
    Ausgabe += ""+RV_dot_PV+" = "+(-RV_dot_RV)+"s  | : ("+(-RV_dot_RV)+")";
    Ausgabe += "<br>";
    Ausgabe += "<br>";

    //Ausgeben
    //RV_dot_PV / (-RV_dot_RV) = s
    Ausgabe += ""+RV_dot_PV+" / "+(-RV_dot_RV)+" = s";
    Ausgabe += "<br>";
    Ausgabe += "<br>";

    //Ausgeben
    //Skalar = s
    Ausgabe += ""+Skalar.toFixed(4)+" = s";
    Ausgabe += "<br>";
    Ausgabe += "<br>";

    /****************************** D *******************************/
    Ausgabe += "<b>(d)</b> "+getVectorNameHTML("PL")+" konkret berechnen ( skalar in (b) einsetzen ) <br>\n";
    Ausgabe += "<br>";
    Ausgabe += "<br>";

    //Eingesetzt:
    //      (PV.x1 + RV.x1 *s)
    // PL = (PV.x2 + RV.x2 *s)
    //      (PV.x3 + RV.x3 *s)
    Ausgabe += getVectorNameHTML("PL")+"="+ getVectorOperationVarHTML( PV, null, '+', RichtungsVektor, "*("+Skalar.toFixed(2)+")" )+"\n<br>\n";
    Ausgabe += "<br>";

    //In <> ausgerechnet:
    //      (PV.x1 + <RV.x1 * Skalar>)
    // PL = (PV.x2 + <RV.x2 * Skalar>)
    //      (PV.x3 + <RV.x3 * Skalar>)
    Ausgabe += getVectorNameHTML("PL")+"="+ getVectorOperationVarHTML( PV, null, '+', RichtungsVektor.mul(Skalar),null)+"\n<br>\n";
    Ausgabe += "<br>";

    //      (PL.x1)
    // PL = (PL.x2)
    //      (PL.x3)
    Ausgabe += getVectorNameHTML("PL")+"="+ getVectorHTML( PL )+"<br>\n";
    Ausgabe += "<br>";
    Ausgabe += "<br>";

    /****************************** E *******************************/
    Ausgabe += "<b>(e)</b> |"+getVectorNameHTML("PL")+"| konkret berechnen<br>\n";
    Ausgabe += "<br>";
    Ausgabe += "<br>";

    //        | (PL.x1) |
    // |PL| = | (PL.x2) |
    //        | (PL.x3) |
    Ausgabe += "|"+getVectorNameHTML("PL")+"| = " +getVectorHTML( PL, true )+"<br>\n";
    Ausgabe += "<br>";
    Ausgabe += "<br>";


    // |PL| = √( (PL.x1)² + (PL.x2)² + (PL.x3)² )
    Ausgabe += "|"+getVectorNameHTML("PL")+"| = √( ";
    for (var i = 0; i < 3; i++) {
        if ( i > 0 )
            Ausgabe += " + ";
        Ausgabe += "("+MNKS(PL.x[i],2)+")&sup2;";
    }
    Ausgabe += " )<br>\n";
    Ausgabe += "<br>";
    Ausgabe += "<br>";

    // |PL| = √( < PL · PL > )
    Ausgabe += "|"+getVectorNameHTML("PL")+"| = √( " + MNKS(PL.dot(PL),2) + " )<br>\n";
    Ausgabe += "<br>";
    Ausgabe += "<br>";

     // |PL| = <PL.length()>
    Ausgabe += "|"+getVectorNameHTML("PL")+"| = "+PL.length()+"<br>\n";
    Ausgabe += "<br>";
    Ausgabe += "<br>";

    //Update:
    document.getElementById("ResultBox").innerHTML=Ausgabe;
}

function Rechnen_Variante2()
{
    //Einlesen der Vektoren:

    var OrtsVektor = VektorEinlesen("OrtsVektor");

    var RichtungsVektor = VektorEinlesen("RichtungsVektor");

    var PunktP = VektorEinlesen("PunktP");

    //In der Javascript Konsole ausgeben: ( zum testen )
    //OrtsVektor.logToConsole("OrtsVektor");
    //RichtungsVektor.logToConsole("RichtungsVektor");
    //PunktP.logToConsole("PunktP");


    ///////////////////// eigentliche Rechnung /////////////////////
    //       →    →
    //  VP = 0P - 0V
    var VP = PunktP.sub( OrtsVektor );
    //VP.logToConsole("VP");

    //                →    →
    //  VP_cross_RV = VP x RV
    var VP_cross_RV = VP.cross( RichtungsVektor );
    //VP_cross_RV.logToConsole("VP_cross_RV");

    //  VP_cross_RV_Length = √( x1² + x2² + x3² )
    var VP_cross_RV_Length = VP_cross_RV.length( );

    //  RichtungsVektorLength = √( x1² + x2² + x3² )
    var RichtungsVektorLength = RichtungsVektor.length( );

    
    var distance = VP_cross_RV_Length / RichtungsVektorLength;
    ////////////////////////////////////////////////////////////////
    
    
    //Ausgabe des Rechenweges:
    var Ausgabe = "";
    
    /////////////////////////////////////////////////////////////////////////////////
    /*     | (0P - 0V) x RV |
    |PL| = -------------------
                  | RV |
    */
    Ausgabe += "|"+getVectorNameHTML("PL")+"| = "+getFraction( 
        "| ("+getVectorNameHTML("0P")+" - "+getVectorNameHTML("0V")+") x "+getVectorNameHTML("RV")+" |",
        "| "+getVectorNameHTML("RV")+" |"
    ) + "<br>\n";
    Ausgabe += "<br>\n";


    /////////////////////////////////////////////////////////////////////////////////
    /*
    VP = 0P - 0V
    */
    Ausgabe += getVectorNameHTML("VP") + " = " + getVectorNameHTML("0P") + " - "+getVectorNameHTML("0V") + "<br>\n";
    Ausgabe += "<br>\n";
    
    /////////////////////////////////////////////////////////////////////////////////
    /*   (0V.x1)   (0P.x1)
    VP = (0V.x2) - (0P.x2)
         (0V.x3)   (0P.x3)
    */
    Ausgabe += getVectorNameHTML("VP") + " = " + getVectorHTML(OrtsVektor) + " - "+getVectorHTML(PunktP) + "<br>\n";
    Ausgabe += "<br>\n";

    /////////////////////////////////////////////////////////////////////////////////
    /*   (VP.x1)
    VP = (VP.x2)
         (VP.x3)
    */
   Ausgabe += getVectorNameHTML("VP") + " = " + getVectorHTML(VP) + "<br>\n";
   Ausgabe += "<br>\n";

    /////////////////////////////////////////////////////////////////////////////////
    /*     | VP x RV |
    |PL| = -----------
            | RV |
    */
    Ausgabe += "|"+getVectorNameHTML("PL")+"| = "+getFraction( 
        "| "+getVectorNameHTML("VP")+" x "+getVectorNameHTML("RV")+" |",
        "| "+getVectorNameHTML("RV")+" |"
        ) + "<br>\n";
    Ausgabe += "<br>\n";


    /////////////////////////////////////////////////////////////////////////////////
    /*
           | ( VP.x1 x RV.x1 ) |
           | ( VP.x2 x RV.x2 ) |
           | ( VP.x3 x RV.x3 ) |
    |PL| = ---------------------
                  | RV |
    */
    Ausgabe += "|"+getVectorNameHTML("PL")+"| = "+getFraction( 
            getVectorHTML(VP,'l')+" x "+getVectorHTML(RichtungsVektor,'r'),
            "| "+getVectorNameHTML("RV")+" |"
    ) + "<br>\n";
    Ausgabe += "<br>\n";

    /////////////////////////////////////////////////////////////////////////////////
    /*
           | ( VP.x2*RV.x3 - VP.x3*RV.x2 ) |
           | ( VP.x1*RV.x3 - VP.x3*RV.x1 ) |
           | ( VP.x1*RV.x2 - VP.x2*RV.x1 ) |
    |PL| = ---------------------------------
                         | RV |
    */
    Ausgabe += "|"+getVectorNameHTML("PL")+"| = "+getFraction( 
        "| ("+VP.x[1]+"*"+RichtungsVektor.x[2]+" - "+ VP.x[2]+"*"+RichtungsVektor.x[1]+") |<br>\n"+
        "| ("+VP.x[0]+"*"+RichtungsVektor.x[2]+" - "+ VP.x[2]+"*"+RichtungsVektor.x[0]+") |<br>\n"+
        "| ("+VP.x[0]+"*"+RichtungsVektor.x[1]+" - "+ VP.x[1]+"*"+RichtungsVektor.x[0]+") |\n"
        ,
        "| "+getVectorNameHTML("RV")+" |"
    ) + "<br>\n";
    Ausgabe += "<br>\n";

    /////////////////////////////////////////////////////////////////////////////////
    /*
           | ( V1 - W1 ) |
           | ( V2 - W2 ) |
           | ( V3 - W3 ) |
    |PL| = ---------------
               | RV |
    */
    Ausgabe += "|"+getVectorNameHTML("PL")+"| = "+getFraction( 
        "| ("+MNKS(VP.x[1]*RichtungsVektor.x[2],2)+" - "+ MNKS(VP.x[2]*RichtungsVektor.x[1],2)+") |<br>\n"+
        "| ("+MNKS(VP.x[0]*RichtungsVektor.x[2],2)+" - "+ MNKS(VP.x[2]*RichtungsVektor.x[0],2)+") |<br>\n"+
        "| ("+MNKS(VP.x[0]*RichtungsVektor.x[1],2)+" - "+ MNKS(VP.x[1]*RichtungsVektor.x[0],2)+") |\n"
        ,
        "| "+getVectorNameHTML("RV")+" |"
    ) + "<br>\n";
    Ausgabe += "<br>\n";

    /////////////////////////////////////////////////////////////////////////////////
    /*
           | ( C1 ) |
           | ( C2 ) |
           | ( C3 ) |
    |PL| = -----------
             | RV |
    */
    Ausgabe += "|"+getVectorNameHTML("PL")+"| = "+getFraction(
        ""+getVectorHTML(VP_cross_RV,true),
        "| "+getVectorNameHTML("RV")+" |"
    ) + "<br>\n";

    /////////////////////////////////////////////////////////////////////////////////
    /*
           √( C1² + C2² + C3³ )
    |PL| = --------------------
                  | RV |
    */
    var SquareRootStr = "";
    SquareRootStr += "√( ";
    for (var i = 0; i < 3; i++) {
        if ( i > 0 )
        SquareRootStr += " + ";
        SquareRootStr += "("+MNKS(VP_cross_RV.x[i],2)+")&sup2;";
    }
    SquareRootStr += " )";

    Ausgabe += "<br>\n";
    Ausgabe += "|"+getVectorNameHTML("PL")+"| = "+getFraction(
        SquareRootStr,
        "| "+getVectorNameHTML("RV")+" |"
    ) + "<br>\n";

    SquareRootStr = "√( " + MNKS(VP_cross_RV.dot(VP_cross_RV),4) + " )";

    Ausgabe += "<br>\n";
    Ausgabe += "|"+getVectorNameHTML("PL")+"| = "+getFraction(
        SquareRootStr,
        getVectorHTML(RichtungsVektor,true)
    ) + "<br>\n";

    /////////////////////////////////////////////////////////////////////////////////
    /*
           √( CT )
    |PL| = -------
            | RV |
    */
    var SquareRootStr2 = "";
    SquareRootStr2 += "√( ";
    for (var i = 0; i < 3; i++) {
        if ( i > 0 )
        SquareRootStr2 += " + ";
        SquareRootStr2 += "("+MNKS(RichtungsVektor.x[i],2)+")&sup2;";
    }
    SquareRootStr2 += " )";

    Ausgabe += "<br>\n";
    Ausgabe += "|"+getVectorNameHTML("PL")+"| = "+getFraction(
        SquareRootStr,
        SquareRootStr2
    ) + "<br>\n";

    /////////////////////////////////////////////////////////////////////////////////
    /*
                         √( CT )
    |PL| = ------------------------------------
            √( (RV.x1)² + (RV.x2)² + (RV.x3)³ )
    */
    SquareRootStr2 = "√( " + MNKS(RichtungsVektor.dot(RichtungsVektor),4) + " )";

    Ausgabe += "<br>\n";
    Ausgabe += "|"+getVectorNameHTML("PL")+"| = "+getFraction(
        SquareRootStr,
        SquareRootStr2
    ) + "<br>\n";

    /////////////////////////////////////////////////////////////////////////////////
    /*
           √( CT )
    |PL| = -------
           √( RT )
    */
    Ausgabe += "<br>\n";
    Ausgabe += "|"+getVectorNameHTML("PL")+"| = "+getFraction(
        ""+MNKS(VP_cross_RV.length(),4),
        ""+MNKS(RichtungsVektor.length(),4)
    ) + "<br>\n";
    Ausgabe += "<br>\n";

    /////////////////////////////////////////////////////////////////////////////////
    /*
    |PL| = distance
    */
    Ausgabe += "|"+getVectorNameHTML("PL")+"| = "+distance + "<br>\n";

    document.getElementById("ResultBox").innerHTML=Ausgabe;
}