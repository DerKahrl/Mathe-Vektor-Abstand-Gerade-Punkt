class Vector
{
    constructor(x1, x2, x3) {
        this.x = new Array(3);
        this.x[0] = x1;
        this.x[1] = x2;
        this.x[2] = x3;
    }


    logToConsole( Name )
    {
        console.log(Name+".x1 = "+this.x[0]);
        console.log(Name+".x2 = "+this.x[1]);
        console.log(Name+".x3 = "+this.x[2]);
    }

    //= Vector . Vector = Skalar
    dot( b )
    {
        return  (this.x[0] * b.x[0]) + 
                (this.x[1] * b.x[1]) + 
                (this.x[2] * b.x[2]);
    }

    //= skalar
    length()
    {
        //sqrt( x1² + x2² + x3² )
        return Math.sqrt(
            ( this.x[0] * this.x[0] ) +
            ( this.x[1] * this.x[1] ) + 
            ( this.x[2] * this.x[2] )
        );
    }

    //= Vector distance Vector = skalar
    distance( b )
    {
        //sqrt( (b1 - x1)² + (b2 - x2)² + (b3 - x3)² )
        return Math.sqrt(
            ( Math.pow( b.x[0] - this.x[0],2) ) +
            ( Math.pow( b.x[1] - this.x[1],2) ) + 
            ( Math.pow( b.x[2] - this.x[2],2) )
        );
    }
    
    //= Vector + Vector = Vector
    add( b, boolModifyCurrent )
    {
        if (boolModifyCurrent === undefined)
        {
            return new Vector(
                this.x[0] + b.x[0],
                this.x[1] + b.x[1],
                this.x[2] + b.x[2]
            );
        }
        else
        {
            this.x[0] += b.x[0];
            this.x[1] += b.x[1];
            this.x[2] += b.x[2];
        }
    }

    //= Vector - Vector = Vector
    sub( b, boolModifyCurrent )
    {
        if (boolModifyCurrent === undefined)
        {
            return new Vector(
                this.x[0] - b.x[0],
                this.x[1] - b.x[1],
                this.x[2] - b.x[2]
            );
        }
        else
        {
            this.x[0] -= b.x[0];
            this.x[1] -= b.x[1];
            this.x[2] -= b.x[2];
        }
    }

    //= Vector * skalar = Vector
    mul( b, boolModifyCurrent )
    {
        if (boolModifyCurrent === undefined)
        {
            return new Vector(
                this.x[0] * b,
                this.x[1] * b,
                this.x[2] * b
            );
        }
        else
        {
            this.x[0] *= b;
            this.x[1] *= b;
            this.x[2] *= b;
        }
    }

    //= Vector x Vector = Vector
    cross( b, boolModifyCurrent )
    {
        /*
        ( x0 )   ( b0 )   (x1*b2 - b1*x2)
        ( x1 ) x ( b1 ) = (x0*b2 - b0*x2)
        ( x2 )   ( b2 )   (x0*b1 - b0*x1)
        */

        var x1 =  this.x[1]*b.x[2] - b.x[1]* this.x[2];
        var x2 =  this.x[0]*b.x[2] - b.x[0]* this.x[2];
        var x3 =  this.x[0]*b.x[1] - b.x[0]* this.x[1];

        if (boolModifyCurrent === undefined)
        {
            return new Vector(
                x1,
                x2,
                x3
            );
        }
        else
        {
            this.x[0] = x1;
            this.x[1] = x2;
            this.x[2] = x3;
        }
    }
}
