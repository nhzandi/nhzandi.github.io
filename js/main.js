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


	var paper = Snap("#svg1");
	Snap.load("./svg/Road-map-in-flat-design/37597-O19AQV.svg", function(f) {
        paper.append(f);
    

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
	
	
	});


}

