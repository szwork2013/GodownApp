'use strict';
app.factory('Convertor', function () {


    var ones = new Array(
        '',
        ' one',
        ' two',
        ' three',
        ' four',
        ' five',
        ' six',
        ' seven',
        ' eight',
        ' nine',
        ' ten',
        ' eleven',
        ' twelve',
        ' thirteen',
        ' fourteen',
        ' fifteen',
        ' sixteen',
        ' seventeen',
        ' eighteen',
        ' nineteen'
    );

    var tens = new Array(
        '',
        '',
        ' twenty',
        ' thirty',
        ' forty',
        ' fifty',
        ' sixty',
        ' seventy',
        ' eighty',
        ' ninety'
    );

    var triplets = new Array(
        '',
        ' thousand',
        ' million',
        ' billion',
        ' trillion',
        ' quadrillion',
        ' quintillion',
        ' sextillion',
        ' septillion',
        ' octillion',
        ' nonillion'
    );

    function convertTri(num, tri) {
        var str = '', comma = '',
            r = Math.round( ( num / 1000 ) - 0.5 ),
            x = Math.round( ( num / 100 ) - 0.5 ) % 10,
            y = Math.round( ( num % 100 ) - 0.5 );
        if(x > 0) { // hundreds
            str = ones[x] + ' hundred';
        }
        if(y < 20) { // ones and tens
            str += ones[y];
        } else {
            str += tens[Math.round( (y / 10) - 0.5 )] + ones[y % 10];
        }
        if(str) { // thousands
            str += triplets[tri];
        }
        if(r > 0) { // continue recursing?
            /* if(str) {
             var f = document.forms.f;
             comma += f.comma.checked ? ',' : '';
             comma += f.wrapx.checked ? '&lt;br /&gt;' : '';
             }*/
            return convertTri( r, tri + 1 ) + comma + str;
        }
        return str;
    }
    var serviceFactory = {
        convert :function(num){

            return convertTri(num, 0);
        }

    };
    return serviceFactory;
});