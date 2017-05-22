import React, { Component } from 'react';
import * as d3 from 'd3'
// import './App.css';
// import {Link} from 'react-router';


class ProgressArc extends Component {
  



  componentDidMount() {
    const context = this.setContext();
    this.setLine(context);
    this.setXAxis(context);
    this.setYAxis(context);
  }
  setContext() {
    let svg = d3.select(this.refs.arc) .append("svg")
        .attr("width", '700px') //width + margin.left + margin.right
        .attr("height", '400px') //height + margin.top + margin.bottom
    .append("g")
        .attr("transform",
              "translate(150,150 )"); //" + margin.left + "," + margin.top + ")"
    return svg

  }

  setLine(context) {
    
    var margin = {top: 30, right: 20, bottom: 30, left: 50}, 
    width = 600 - margin.left - margin.right,            //600 hardCode Data
    height = 270 - margin.top - margin.bottom;           //270 hardCode Data
    console.log("d3=>",d3);
  var parseTime = d3.time.format("%Y-%m-%d").parse;       // Changed parseDate to parseTime
  // Set the ranges
  var x = d3.time.scale().rangeRound([0, width]);         // Changed range. to rangeRound            - older code , only d3 instead d3.time
  var y = d3.scale.linear().rangeRound([height, 0]);      // Changed range. to rangeRound
  // Define the axis
  var xAxis = d3.svg.axis().scale(x) .orient("bottom").ticks(5);
  var yAxis = d3.svg.axis().scale(y) .orient("left").ticks(5);
  // Define the line
  var valueline = d3.svg.line()                             
  .x(function(d) { return x(d.date); }) 
  .y(function(d) { return y(d.value); });

  // Get the data
  d3.csv("data.csv", function(error, data) { 
      data.forEach(function(d) {
          d.date = parseTime(d.date);
          d.value = +d.value;
      });
      // Scale the range of the data

      x.domain(d3.extent(data, function(d) { return d.date; })); 
      // y.domain([0, d3.max(data, function(d) { return d.value; })]); // without Y axis scale
      y.domain( d3.extent(data, function(d) { return d.value; }));

    return context.append("path")
          .attr("class", "line")                //different
          .datum(data)             //check this after
          .attr("fill", "none")
          .attr("stroke", "steelblue")
          .attr("stroke-linejoin", "round")
          .attr("stroke-linecap", "round")
          .attr("stroke-width", 1.5)
          .attr("d", valueline(data));
          });
  }

setXAxis(context) {
    
    var margin = {top: 30, right: 20, bottom: 30, left: 50}, 
    width = 600 - margin.left - margin.right,            //600 hardCode Data
    height = 270 - margin.top - margin.bottom;           //270 hardCode Data
    console.log("d3=>",d3);
  var parseTime = d3.time.format("%Y-%m-%d").parse;       // Changed parseDate to parseTime
  // Set the ranges
  var x = d3.time.scale().rangeRound([0, width]);         // Changed range. to rangeRound            - older code , only d3 instead d3.time
  var y = d3.scale.linear().rangeRound([height, 0]);      // Changed range. to rangeRound
  // Define the axis
  var xAxis = d3.svg.axis().scale(x) .orient("bottom").ticks(5);
  var yAxis = d3.svg.axis().scale(y) .orient("left").ticks(5);
  // Define the line
  var valueline = d3.svg.line()                             
  .x(function(d) { return x(d.date); }) 
  .y(function(d) { return y(d.value); });

  // Get the data
  d3.csv("data.csv", function(error, data) { 
      data.forEach(function(d) {
          d.date = parseTime(d.date);
          d.value = +d.value;
      });
      // Scale the range of the data

      x.domain(d3.extent(data, function(d) { return d.date; })); 
      // y.domain([0, d3.max(data, function(d) { return d.value; })]); // without Y axis scale
      y.domain( d3.extent(data, function(d) { return d.value; }));

    context.append("g")
        .attr("class", "x axis")             //different
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
          });
  }

setYAxis(context) {
    
    var margin = {top: 30, right: 20, bottom: 30, left: 50}, 
    width = 600 - margin.left - margin.right,            //600 hardCode Data
    height = 270 - margin.top - margin.bottom;           //270 hardCode Data
    console.log("d3=>",d3);
  var parseTime = d3.time.format("%Y-%m-%d").parse;       // Changed parseDate to parseTime
  // Set the ranges
  var x = d3.time.scale().rangeRound([0, width]);         // Changed range. to rangeRound            - older code , only d3 instead d3.time
  var y = d3.scale.linear().rangeRound([height, 0]);      // Changed range. to rangeRound
  // Define the axis
  var xAxis = d3.svg.axis().scale(x) .orient("bottom").ticks(5);
  var yAxis = d3.svg.axis().scale(y) .orient("left").ticks(5);
  // Define the line
  var valueline = d3.svg.line()                             
  .x(function(d) { return x(d.date); }) 
  .y(function(d) { return y(d.value); });

  // Get the data
  d3.csv("data.csv", function(error, data) { 
      data.forEach(function(d) {
          d.date = parseTime(d.date);
          d.value = +d.value;
      });
      // Scale the range of the data

      x.domain(d3.extent(data, function(d) { return d.date; })); 
      // y.domain([0, d3.max(data, function(d) { return d.value; })]); // without Y axis scale
      y.domain( d3.extent(data, function(d) { return d.value; }));

    context.append("g")
        .attr("class", "y axis")
        .call(yAxis).
        append("text")        // all attributes bellow are NEW 
      .attr("fill", "#000") // 
      .attr("transform", "rotate(-90)")  // 
      .attr("y", 6) // 
      .attr("dy", "0.71em") // 
      .attr("text-anchor", "end") // 
      .text("Price ($)"); 
          });
  }

  render() {
var margin = {top: 30, right: 20, bottom: 30, left: 50}, 
    width = 600 - margin.left - margin.right,            //600 hardCode Data
    height = 270 - margin.top - margin.bottom;           //270 hardCode Data

    return (
      <div>
        <h2> ARC </h2>
        <div ref="arc"></div>

      </div>
    )
  }
}


/*               LINE CHART EXAMPLE
const Line = React.createClass({

  propTypes: {
    path:         React.PropTypes.string.isRequired,
    stroke:       React.PropTypes.string,
    fill:         React.PropTypes.string,
    strokeWidth:  React.PropTypes.number
  },

  getDefaultProps() {
    return {
      stroke:       'blue',
      fill:         'none',
      strokeWidth:  3
    };
  },

  render() {
    let { path, stroke, fill, strokeWidth } = this.props;
    return (
      <path d={path} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
    );
  }

});



const DataSeries = React.createClass({

  propTypes: {
    colors:             React.PropTypes.func,
    data:               React.PropTypes.object,
    interpolationType:  React.PropTypes.string,
    xScale:             React.PropTypes.func,
    yScale:             React.PropTypes.func
  },

  getDefaultProps() {
    return {
      data:               [],
      interpolationType:  'cardinal',
      // colors:             d3.scale.category10()
    };
  },

  render() {
    let { data, colors, xScale, yScale, interpolationType } = this.props;

    let line = d3.svg.line()
      .interpolate(interpolationType)
      .x((d) => { return xScale(d.x); })
      .y((d) => { return yScale(d.y); });

    let lines = data.points.map((series, id) => {
      return (
        <Line
          path={line(series)}
          stroke={colors(id)}
          key={id}
          />
      );
    });

    return (
      <g>
        <g>{lines}</g>
      </g>
    );
  }

});

const LineChart = React.createClass({

  propTypes: {
    width:  React.PropTypes.number,
    height: React.PropTypes.number,
    data:   React.PropTypes.object.isRequired
  },

  getDefaultProps(){
    return {
      width:  600,
      height: 300
    }
  },

  render() {
    let { width, height, data } = this.props;

   let xScale =0 ;    // d3.scale.ordinal()
    //                .domain(data.xValues)
    //                .rangePoints([0, width]);

       let yScale =0 // d3.scale.linear()
    //                .range([height, 10])
    //                .domain([data.yMin, data.yMax]);

    return (
      <svg width={width} height={height}>
          <DataSeries
            xScale={xScale}
            yScale={yScale}
            data={data}
            width={width}
            height={height}
            />
      </svg>
    );
  }

});

*/
//################################################### APP ####################################################

class App extends Component {
  constructor (){
    super ();

  }
  render() {
    let data = {
    points: [
      [ { x: 0, y: 20 }, { x: 1, y: 30 }, { x: 2, y: 10 }, { x: 3, y: 5 },
        { x: 4, y: 8 }, { x: 5, y: 15 }, { x: 6, y: 10 } ]
      ,
      [ { x: 0, y: 8 }, { x: 1, y: 5 }, { x: 2, y: 20 }, { x: 3, y: 12 },
        { x: 4, y: 4 }, { x: 5, y: 6 }, { x: 6, y: 2 } ]
      ,
      [ { x: 0, y: 0 }, { x: 1, y: 5 }, { x: 2, y: 8 }, { x: 3, y: 2 },
        { x: 4, y: 6 }, { x: 5, y: 4 }, { x: 6, y: 2 } ]
      ],
    xValues: [0,1,2,3,4,5,6],
    yMin: 0,
    yMax: 30
  };


    return (
      <div className="App">
        {/*{this.props.children} */}
        <h2>Currency Graph</h2>
        {/*<D3/>*/}
        <ProgressArc height={300} width={300} innerRadius={100} outerRadius={110} id="d3-arc" backgroundColor="#e6e6e6" foregroundColor="#00ff00"
            percentComplete={0.3} />
        {/*<LineChart data={data} width={600} height={300} />,*/}


        <Form/>
      </div>
    );
  };
};

console.log('d3', d3)

export default App;
//################################################### APP ####################################################

class Form extends Component {
  sendform(){
  //   console.log("Front End")
  //       let startDate = '';
  //       let finalDate = ''
  //       $(document).ready(function () {
  //           $(function () {
  //               $("#datepickerStart").datepicker({
  //                   dateFormat: "yy-mm-dd"
  //               });
  //           });
  //           $(function () {
  //               $("#datepickerFinal").datepicker({
  //                   dateFormat: "yy-mm-dd"
  //               });
  //           });
  //           $('#submitForm').click(function () {
  //               startDate = $("input[id = 'datepickerStart']").val();
  //               finalDate = $("input[id = 'datepickerFinal']").val();
  //               baseCurrency = $("select[id = 'baseCurrency']").val();
  //               symbolCurrency = $("select[id = 'symbolCurrency']").val();
  //               console.log(startDate, finalDate, baseCurrency, symbolCurrency)
  //               axios.post("http://localhost:2222/postdata",
  //                   {
  //                       startDate: startDate,
  //                       finalDate: finalDate,
  //                       baseCurrency: baseCurrency,
  //                       symbolCurrency: symbolCurrency
  //                   }
  //               );
  //               setTimeout(() => { location.reload(true); }, 100);
  //           })
  //       })
  }
  
  render(){
    return(
      <div>
        <p>Start Date: <input type="text" id="datepickerStart" value="2017-04-30"/></p>
        <p> Final Date: <input type="text" id="datepickerFinal" value="2017-05-20"/></p>
        <p> Base Currency:</p>
        <select id ="baseCurrency" name="baseCurrency">
            <option value="AUD"> AUD - Australian Dollar </option>
            <option value="BGN">BGN - Bulgarian Lev </option>
            <option value="BRL">BRL - Brazlian Real </option>
            <option value="CAD">CAD - Canadian Dollar </option>  
            <option value="CHF">CHF - Swiss Franc </option>
            <option value="CNY">CNY - Chinese Yuan </option>
            <option value="CZK">CZK - Czech Republic Koruna</option>
            <option value="DNK">DNK - Danish Krone </option>
            <option value="GBP">GBP - British Pound </option>
            <option value="HKD">HKD - Hong Kong Dollar </option>
            <option value="HRK">HRK - Croatian Kuna </option>
            <option value="HUF">HUF - Hungarian Forint </option>
            <option value="IDR">IDR - Indonesian Rupiah </option>
            <option value="ILS">ILS - Isralei New Sheket </option>
            <option value="INR">INR - Indian Rupee </option>
            <option value="JPY">JPY - Japanese Yen </option>
            <option value="KRW">KRW - South Korean Won </option>
            <option value="MXN">MXN - Mexican Peso </option>
            <option value="MYR">MYR - Malaysian Ringgit </option>
            <option value="NOK">NOK - Norwegian Krone </option>
            <option value="NZD">NZD - New Zealand Dollar </option>
            <option value="PHP">PHP - Philippine Peso </option>
            <option value="PLN">PLN - Polish Zloty </option>
            <option value="RON">RON - Romanian Leu </option>
            <option value="RUB">RUB - Russian Ruble </option>
            <option value="SEK">SEK - Swedish Krona </option>
            <option value="SGD">SGD - Singapore Dollar </option>
            <option value="THB">THB- Thai Baht </option>
            <option value="TRY">TRY -Turkish Lira </option>
            <option selected="selected" value="USD">USD - United States Dollar </option>
            <option value="ZAR">ZAR - South African Rand </option>
    </select>
        <p> Symbol Currency:</p>
        <select id ="symbolCurrency" name="symbolCurrency">
            <option value="AUD">AUD - Australian Dollar </option>
            <option value="BGN">BGN - Bulgarian Lev </option>
            <option selected="selected" value="BRL">BRL - Brazlian Real </option>
            <option value="CAD">CAD - Canadian Dollar </option>  
            <option value="CHF">CHF - Swiss Franc </option>
            <option value="CNY">CNY - Chinese Yuan </option>
            <option value="CZK">CZK - Czech Republic Koruna</option>
            <option value="DNK">DNK - Danish Krone </option>
            <option value="GBP">GBP - British Pound </option>
            <option value="HKD">HKD - Hong Kong Dollar </option>
            <option value="HRK">HRK - Croatian Kuna </option>
            <option value="HUF">HUF - Hungarian Forint </option>
            <option value="IDR">IDR - Indonesian Rupiah </option>
            <option value="ILS">ILS - Isralei New Sheket </option>
            <option value="INR">INR - Indian Rupee </option>
            <option value="JPY">JPY - Japanese Yen </option>
            <option value="KRW">KRW - South Korean Won </option>
            <option value="MXN">MXN - Mexican Peso </option>
            <option value="MYR">MYR - Malaysian Ringgit </option>
            <option value="NOK">NOK - Norwegian Krone </option>
            <option value="NZD">NZD - New Zealand Dollar </option>
            <option value="PHP">PHP - Philippine Peso </option>
            <option value="PLN">PLN - Polish Zloty </option>
            <option value="RON">RON - Romanian Leu </option>
            <option value="RUB">RUB - Russian Ruble </option>
            <option value="SEK">SEK - Swedish Krona </option>
            <option value="SGD">SGD - Singapore Dollar </option>
            <option value="THB">THB- Thai Baht </option>
            <option value="TRY">TRY -Turkish Lira </option>
            <option value="USD">USD - United States Dollar </option>
            <option value="ZAR">ZAR - South African Rand </option>
    </select>
    <p></p>
      <button id="submitForm"> Submit</button>
    </div>
    )
  }
}