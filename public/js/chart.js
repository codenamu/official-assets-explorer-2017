function getSeriesName(index){
    var series_name = '';
    switch(index%3){
        case 0:    
            series_name = "현금성 자산";
            break;
        case 1:    
            series_name = "부동산";
            break;
        case 2:    
            series_name = "주식";
            break;
    }
    return series_name;
}

function getAssetByType(data, index){
    var asset = 0;
    switch(index%3){
        case 0:    
            asset = data.tengibles;
            break;
        case 1:    
            asset = data.tengible_estates;
            break;
        case 2:    
            asset = data.financials;
            break;
    }
    return asset;
}

function getCategoryHtml(name, organization, division, totals){
    var categoryHtml='<span class="chart_official" style="color:white;">'+name+'</span><br/>'+
	'<span class="chart_official_sub" style="color:rgba(255, 255, 255, 0.7);">'+organization+'</span><br/>'+
 	'<span class="chart_official_sub" style="color:rgba(255, 255, 255, 0.7);">'+division+'</span><br/>'+getCategoryTotals(convertUnit(totals));
 
    return categoryHtml;
}

function getCategoryTotals(totals){
    var total_html = totals.toString();
    if(total_html.length <= 4){
        total_html = '<span class="chart_totals" style="color:rgba(255, 255, 255, 1);font-size:40px;">'+numberWithCommas(total_html)+'</span><span style="color:rgba(255, 255, 255, 0.5);font-size:15px;">만원</span>';        
    }else{
        total_html = '<span class="chart_totals" style="color:rgba(255, 255, 255, 1);font-size:40px;">'+numberWithCommas(total_html.substring(0, total_html.length-4))+ '</span><span style="color:rgba(255, 255, 255, 0.5);font-size:15px;">억 </span>'
            + '<span class="chart_totals_sub" style="color:rgba(255, 255, 255, 1);">'+numberWithCommas(total_html.substring(total_html.length-4))+ '</span><span style="color:rgba(255, 255, 255, 0.5);font-size:15px;">만원</span>';
    }
    return total_html;
}

function getCategoryFluctuates(number){
    var fluctuates_html = number.toString();
    var front_span = '<span class="chart_up" style="color:#ff6300;">↑</span><span class="chart_up_unit" style="color:#ff6300;">';
    var back_span ="만원</span>";
    
    if(-1 < fluctuates_html.indexOf('-')){
        front_span = '<span class="chart_down" style="color:#0075fa;">↓</span><span class="chart_down_unit" style="color:#0075fa;">';
        fluctuates_html = fluctuates_html.replace("-","");
    }
    
    if(4 <= fluctuates_html.length){
        fluctuates_html = fluctuates_html.substring(0, fluctuates_html.length-5);
        back_span ="억원</span>";
    }
    
    return front_span + numberWithCommas(fluctuates_html)+back_span;
}

function defined(obj) {
    return obj !== UNDEFINED && obj !== null;
}

var UNDEFINED,VISIBLE = 'visible';

(function (HC) {
    HC.wrap(HC.Axis.prototype, 'drawCrosshair', function (proceed, e, point) {
        var path,
        options = this.crosshair,
            animation = options.animation,
            pos,
            attribs,
            categorized;
        
        if (
        // Disabled in options
        !this.crosshair ||
        // Snap
        ((defined(point) || !HC.pick(this.crosshair.snap, true)) === false)) {
            this.hideCrosshair();
        } else {
            
            // Get the path
            if (!HC.pick(options.snap, true)) {
                pos = (this.horiz ? e.chartX - this.pos : this.len - e.chartY + this.pos);
            } else if (defined(point)) {
                pos = this.isXAxis ? point.plotX : this.len - point.plotY; // #3834
            }

            if (this.isRadial) {
                path = this.getPlotLinePath(this.isXAxis ? point.x : pick(point.stackY, point.y)) || null; // #3189
            } else {
                path = this.getPlotLinePath(null, null, null, null, pos) || null; // #3189
            }
 
            if (path === null) {
                this.hideCrosshair();
                return;
            }
            
            // Draw the cross
            if (this.cross) {    
                //overwrite path height;
                // path[5] = point.series.chart.containerHeight;
                path[1] = 0;
                path[4] = 850;
                this.cross.attr({
                    visibility: VISIBLE
                })[animation ? 'animate' : 'attr']({
                    d: path
                }, animation);
            } else {
                categorized = this.categories && !this.isRadial;
                attribs = {
                    'stroke-width': options.width || (categorized ? this.transA : 1),
                    stroke: options.color || (categorized ? 'rgba(255,255,255,0.1)' : '#fff'),
                    zIndex: options.zIndex || 2
                };
                if (options.dashStyle) {
                    attribs.dashstyle = options.dashStyle;
                }
                
                this.cross = this.chart.renderer.path(path).attr(attribs).add();
            }

        }

    });
    
})(Highcharts);

var main_options = {
    chart: {
        renderTo: 'total_chart',
        type: 'bar',
        spacingTop: 4,
        spacingBottom: 4,
        spacingLeft: 0,
        spacingRight: 0,
        backgroundColor: "#242424",
        className: 'usePointer',
    },
    credits:false,    
    exporting: { enabled: false },
    title: {
        text: null
    },
      xAxis: [{
            height: 500,
            lineWidth: 0,
            gridLineColor: 'rgba(255, 255, 255, 0.5)',
            gridLineWidth:1,
            tickWidth:1,
    		tickColor: 'rgba(255, 255, 255, 0.5)',
			tickPosition: "outside",
    		tickLength: 380,
    		shared:true,
    		crosshair: true,
        }, {
            height: 500,
            linkedTo: 0,
            useHTML: true,
            lineWidth: 0,
            tickWidth:1,
    		tickColor: 'rgba(255, 255, 255, 0.5)',
			tickPosition: "outside",
		    tickLength: 120,
            opposite: true,     
            shared:true,
            crosshair: true,
        }],
    yAxis:{
        height: 500,
        title: {
            text: null,
            align: 'high'
        },       
        shared:true,
        tickAmount:7,
        opposite:true,
        gridLineWidth:1,
        gridLineDashStyle:'dot',
        gridLineColor: 'rgba(255, 255, 255, 0.25)',
        labels: {
          style: {
            fontSize:12,
            color: 'rgba(255, 255, 255, 0.5)',
            fontFamily: 'mark-pro'
          },
          formatter: function() {
              if(100000 < this.value || this.value < -100000){
                  return numberWithCommas((this.value/100000)) + "억";    
              }else{
                  return numberWithCommas(this.value);
              }
            },
        }
    },

    tooltip: {
        shared: true,
        useHTML: true,
        formatter: function () {
            return false;
        }
        
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true,
                style:{"color": "#ffffff", "fontSize": "13px", "fontWeight":"normal","fontFamily":"mark-pro"},
                formatter: function() {
                    if(this.y != 0){
                        var label ='현금성자산 ';
                    	var asset = (this.y).toString();
                        if(this.series.columnIndex == 1){
                          	label = '부동산 ';
                        }else if(this.series.columnIndex == 2){
                          	label = '주식 ';
                        }
                        
                        var symbol = "-";
                        if(-1 < asset.indexOf(symbol)){
                            asset = asset.replace(symbol, "");
                        }else{
                            symbol="";
                        }
                        
                        if(5 < asset.length){
                            asset = numberWithCommas(asset.substr(0, asset.length-5)) + "억";
                        }else{
                            asset = numberWithCommas(asset.substr(0, asset.length-1)) + "만";
                        }
                        
        				return label + symbol + asset;        
                    }else{
                        return "";
                    }
                },
            },
            groupPadding:0.9,
            pointWidth:26,
            column: {
                states: {
                    hover: {
                        color: '#000000'                                                           
                    }
                }
            },
        },
    },
    series: []

};

var main_mobile_option = {
    chart: {
        height: 150,
        type: 'bar',
        spacingTop: 0,
        spacingBottom: 0,
        spacingLeft: 0,
        spacingRight: 0,
        backgroundColor: "#242424",
    },
    credits:false,    
    exporting: { enabled: false },
    title: {
        text: null
    },
    xAxis: [{      		
            categories:[''],
            tickWidth:0,
            lineWidth:0, 
        }, {
            categories:[''],
            linkedTo: 0,
            tickWidth:0,
            lineWidth: 0,  
            opposite: true,    
        }],
    yAxis:{    		
        title: {
            text: null,
        },
        // tickInterval: 1000000,
        tickAmount:6,
        opposite:true,
        gridLineWidth:1,
        gridLineDashStyle:'dot',
        gridLineColor: 'rgba(255, 255, 255, 0.25)',
        labels: {
          style: {
            fontSize:12,
            fontFamily:'mark-pro',
            color: 'rgba(255, 255, 255, 0.5)',
          },
          formatter: function() {
              if(100000 < this.value || this.value < -100000){
                  return numberWithCommas((this.value/100000));    
              }else{
                  return numberWithCommas(this.value);
              }
            },
        }
    },    
    tooltip: {
      enabled: false
    },
    plotOptions: {
        bar: {
            dataLabels: {
                allowOverlap: true,
                enabled: true,
                align: "right",
                style:{"color": "#ffffff", "fontSize": "13px", "fontWeight":"normal","fontFamily":"mark-pro" },
                formatter: function() {
                    if(this.y != 0){
                        var label ='현금성자산 ';
                    	var asset = (this.y).toString();
                        if(this.series.columnIndex == 1){
                          	label = '부동산 ';
                        }else if(this.series.columnIndex == 2){
                          	label = '주식 ';
                        }
                        
                        if(5 < asset.length){
                            asset = numberWithCommas(asset.substr(0, asset.length-5)) + "억";
                        }else{
                            asset = numberWithCommas(asset.substr(0, asset.length-1)) + "만";
                        }
                        
        				return label + asset;        
                    }else{
                        return "";
                    }
                },
            },
            groupPadding:0.9,
            pointWidth:26,
            point: {
                events: {
                    click: function (e) {
                        initDataByOfficer(this.officer_id, this.name);
                    }
                }
            }
        },
    },
    series: []
};

var history_options = {
    chart: {
        renderTo: 'history_chart',
        backgroundColor: "#242424",
    },
    credits:false,    
    exporting: { enabled: false },
    title: {
        text: null        
    },
    xAxis: {
	  tickInterval : 1,
      gridLineWidth:1,
      gridLineColor: '#979797',
      tickWidth:0,
      tickAmount:4,
      showFirstLabel:false,
      showLastLabel:false,
      startOnTick: true,
      endOnTick: true,
      labels:{
      	style:{ "color": "#fff", "fontSize": "15px","fontFamily":"mark-pro" },
			}
    },
    yAxis: {
        title: null,
        gridLineWidth:1,
        gridLineDashStyle:'dot',
        gridLineColor: 'rgba(151, 151, 151, 0.2)',
        min: 0,
	   // max: 200000000,
        tickWidth:0,
        // tickInterval:50000000,
        // tickAmount:5,
        labels:{
          	style:{ "color": "#fff", "fontSize": "12px","fontFamily":"mark-pro" },
            formatter: function() {
              if(100000 < this.value || this.value < -100000){
                  return (this.value/100000) + " 억";    
              }else{
                  return this.value;
              }
            },
        }
    },
    tooltip: {
        useHTML: true,
		headerFormat: null,
		borderWidth:0,
		borderRadius: 7,
    },
    plotOptions: {
        line: {
            marker: {
                radius: 5,
                lineColor: '#fff',
                lineWidth: 2
            },
        }
    },
    series: [{
        name: 'Year',
        color: '#8f8c8c',
	    lineColor: 'white',
        showInLegend: false,
        data: []
    }]
}