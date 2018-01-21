
(function() {
        Snap.plugin( function( Snap, Element, Paper, global ) {

		Element.prototype.drawAtPath = function( path, timer, options) {

			var myObject = this, bbox = this.getBBox(1);
			var point, movePoint = {}, len = path.getTotalLength(), from = 0, to = len, drawpath = 0, easing = mina.linear, callback;
			var startingTransform = ''; 

			if( options ) {
				easing = options.easing || easing;
				if( options.reverse  ) { from = len; to = 0; };
				if( options.drawpath ) {
					drawpath = 1;
					path.attr({    
						fill: "none",
                                                strokeDasharray: len + " " + len,
                                                strokeDashoffset: this.len
	                                });

				};
				if( options.startingTransform ) {
					startingTransform = options.startingTransform;
				};
				callback = options.callback || function() {};
			};

			Snap.animate(from, to , function( val ) {
		        	point = path.getPointAtLength( val );
    				movePoint.x = point.x - bbox.cx; movePoint.y = point.y - bbox.cy;
    				myObject.transform( startingTransform + 't' + movePoint.x + ',' + movePoint.y + 'r' + point.alpha );
    				// var xx = 0;
    				// if(dir==1) {xx = (myObject.getBBox().cx + 10);}
    				// myObject.transform( startingTransform + 't' + (myObject.getBBox().cx + 1) + ',0' +  + 'r' + point.alpha + 's.15');

				if( drawpath ) {
					path.attr({ "stroke-dashoffset": len - val });
				};
  			}, timer, easing, callback ); 
		};
	});

})();



window.onload = function() {

	var f = Snap('#svg2');
	var pathCar = f.select('#roadpath');
	var car1 = f.select('#car1');
	var car2 = f.select('#car2');
	car2.transform('t530,-530');
	var car3 = f.select('#car3');
	car3.transform('t540,-512');

	function drawRect( el , x, timer, t, path) {
		el.drawAtPath( path, timer, { callback: drawRect.bind(null, el, timer, x, t, path) , reverse: x, startingTransform: t} );
		x=0;
	};

	drawRect( car1 , 10000, true, 't-650,400', pathCar);
	setTimeout(function() {
		car2Draw(); 
	}, 4000);
	
	function car2Draw(){
		drawRect( car2 , 10000, true, 't-230,230', pathCar);
		setTimeout(function() {
			car3Draw(); 
		}, 4000);
	}

	function car3Draw(){
		drawRect( car3 , 10000, true, 't-340,-12', pathCar);
	}

	var wave1 = f.select('#wave1'), wave1_path = f.select('#wave1_path');
	var wave2 = f.select('#wave2'), wave2_path = f.select('#wave2_path');
	var wave3 = f.select('#wave3'), wave3_path = f.select('#wave3_path');
	var wave4 = f.select('#wave4'), wave4_path = f.select('#wave4_path');
	var wave5 = f.select('#wave5'), wave5_path = f.select('#wave5_path');



	drawRect(wave1, 8000, false, 't-450,-800', wave1_path);		
	drawRect(wave2, 8000, false, 't-450,-700', wave2_path);
	drawRect(wave3, 8000, false, 't-450,-800', wave3_path);
	drawRect(wave4, 8000, false, 't-450,-700', wave4_path);	
	drawRect(wave5, 8000, false, 't-450,-800', wave5_path);
	
	
	

	function animOn(){
	  if( true ) {
	    wave1.animate({
	      d: "m 0,0 c 2.758,4.181 6.072,6.238 9.928,1.664 1.217,-1.443 3.093,-2.493 5.054,-2.149 2.11,0.369 3.463,1.692 4.858,3.238 1.305,1.447 2.221,2.787 4.53,0.994 0.97,-0.752 0.688,-2.656 1.205,-3.68 1.958,-3.876 6.133,-2.333 7.509,1.106 0.781,1.952 2.528,5.342 4.985,2.939 1.008,-0.985 1.61,-2.622 2.322,-3.825 0.969,-1.639 2.299,-2.851 4.198,-3.195 1.575,-0.285 2.249,2.123 0.664,2.411 C 40.265,0.407 41.249,9.216 34.582,7.016 31.924,6.139 31.477,3.537 30.394,1.296 28.735,-2.133 26.946,4.468 26.832,4.663 26.255,5.649 25.22,6.27 24.25,6.801 18.565,9.917 16.039,-3.264 10.959,4.595 6.989,10.735 0.543,5.358 -2.158,1.262 -3.049,-0.088 -0.883,-1.339 0,0"
	    }, 100, mina.elastic, animOut);
	  };
	}

	function animOut() {
	  wave1.animate({
	      d: "m 0,0 c 2.8892788,1.074069 6.4584108,0.01049294 10.033932,2.0744873 1.42025,0.386252 3.791528,2.3106949 5.74256,3.2005763 1.740673,0.8999073 0.699415,1.052464 3.21605,1.0134237 2.565599,-0.023699 3.484069,-0.6992922 5.48339,-2.131 0.97,-0.752 1.327133,-1.9485684 2.366034,-2.3317032 C 28.576,1.1862918 28.959067,-0.27997662 32.372399,2.2216753 33.153399,4.1736753 35.612,6.515 38.069,4.112 c 1.008,-0.985 1.61,-2.622 2.322,-3.825 0.969,-1.639 2.299,-2.851 4.198,-3.195 1.575,-0.285 2.249,2.123 0.664,2.411 C 40.265,0.407 41.249,9.216 34.582,7.016 31.924,6.139 32.287515,4.6956782 29.869662,4.1049517 28.077092,3.6669935 28.427042,3.3791033 26.832,4.663 25.903901,5.4100547 25.22,6.27 24.25,6.801 18.535828,10.374023 15.313008,8.1098672 10.959,4.595 6.3855,3.5935829 0.34415928,3.0050515 -2.158,1.262 -3.049,-0.088 -0.883,-1.339 0,0"
	   }, 100, mina.elastic, animOn);
	};

	// animOn();

	// drawRect( car1 , true, 't-650,400');
	// drawRect( car2 , true, 't-230,230');
	// drawRect( car3 , true, 't-340,-12');

	document.addEventListener('keydown', function(event) {
		// x=0;
	    if(event.keyCode == 37) {
	        // alert('Left was pressed');
	        x = 1;
	        console.log(x);
	    }
	    else if(event.keyCode == 39) {
	        // alert('Right was pressed');
	        x = 2;
	        console.log(x);
	    }
	    else if(event.keyCode == 38) {
	        // alert('Right was pressed');
	        console.log(x);
	    }
	    else if(event.keyCode == 40) {
	        // alert('Right was pressed');
	        console.log(x);
	    }
	});

}