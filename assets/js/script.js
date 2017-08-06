window.onload = function () {
 var chart = new CanvasJS.Chart("chartContainer", {
    theme: "theme2",
	title:{
		text: "Brand Value of Beverages (2016)"
	},
	axisY: {
		maximum: 4.2,
		title: "Brand Value (in USD)",
		prefix: "$",
		suffix: "B"
	},
	axisX: {
		title: "Brands"
	},
	toolTip: {
		fontColor: "black",
		borderColor: "black",
		content: "{label}: ${y} billion"
	},
	data: [{
		type: "column",
		color: "transparent",
		dataPoints: [
			{ label: "Lipton", y: 4.1 },
			{ label: "Sprite",  y: 3.7 },
			{ label: "Fanta",  y: 3.3 },
			{ label: "Mountain Dew", y: 2.7 }
	]
	}
	]
  });
  chart.render();
  
  var images = [];
  var beverages= [];
  
  images.push({url: "https://canvasjs.com/wp-content/uploads/images/gallery/gallery-overview/lipton.png"});
  images.push({url: "https://canvasjs.com/wp-content/uploads/images/gallery/gallery-overview/sprite.png"});
  images.push({url: "https://canvasjs.com/wp-content/uploads/images/gallery/gallery-overview/fanta.png"});
  images.push({url: "https://canvasjs.com/wp-content/uploads/images/gallery/gallery-overview/mountain-dew.png"});

  addImages(chart);

  function addImages(chart){
    for(var i = 0; i < chart.data[0].dataPoints.length; i++){
      var label = chart.data[0].dataPoints[i].label;
      
      if(label){
        beverages.push( $("<img>").attr("src", images[i].url)
                    .attr("class", label)
                    .css("display", "none")
                    .appendTo($("#chartContainer>.canvasjs-chart-container"))
                   );        
      }
      
      positionImage(beverages[i], i);
    }    
  }
  
  function positionImage(beverage, index){ 
    var imageBottom = chart.axisX[0].bounds.y1;     
    var imageCenter = chart.axisX[0].convertValueToPixel(chart.data[0].dataPoints[index].x);
    var yInPixels = chart.axisY[0].convertValueToPixel(chart.data[0].dataPoints[index].y);
    
    beverage.height(imageBottom - yInPixels);
    beverage.width(beverage.height() * .275);
    
    beverage.css({"position": "absolute", 
               "display": "block",
               "top": imageBottom  - beverage.height(),
               "left": imageCenter - beverage.width()/2
              });
    chart.render();
  }

  
  $(window ).resize(function() {
    for(var i = 0; i < chart.data[0].dataPoints.length; i++){
    	positionImage(beverages[i], i);
    }
  }); 

}
  
  