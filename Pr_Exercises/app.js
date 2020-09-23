var rect = require("./rectangle");

function solveRect(l,b) {
    rect(l,b, (err,rectangle) => {
        if (err) {
	        console.log("ERROR: ", err);
	    }
        else {
            console.log("Area " + rectangle.area());
            console.log("Perimeter " + rectangle.perimeter());
        }
    });
    console.log("This statement after the call to rect()");
};

solveRect(2,4);
solveRect(3,6);
solveRect(7,8);
solveRect(0,5);
solveRect(-6,2);