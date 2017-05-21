import React, { Component } from 'react';
import * as d3 from 'd3'
import './App.css';
// import {Link} from 'react-router';


class App extends Component {
  constructor (){
    super ();

  }
  render() {
    return (
      <div className="App">
        <nav>
          {/*<Link to="/todo"> ToDo Page </Link>*/}
          {/*<Link to="/about"> About Page </Link>*/}
        </nav>
        {this.props.children} 
        <h2>Currency Graph</h2>
        <script type="text/javascript" src="d3-book.js"></script>
        <D3/>
        <Info/>
      </div>
    );
  };
};

console.log('d3', d3)

export default App;


class Info extends Component {
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

class D3 extends Component {
    componentDidMount() {
    this.setContext();
  }
  setContext() {
    return d3.select("body") .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform",
                  "translate(" + margin.left + "," + margin.top + ")");
  }
  
  d3chart(){
    
   console.log();
    // Set the dimensions of the canvas / graph
    var margin = {top: 30, right: 20, bottom: 30, left: 50}, 
        width = 600 - margin.left - margin.right,            //600 hardCode Data
        height = 270 - margin.top - margin.bottom;           //270 hardCode Data
        // g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")"); older code

    // Parse the date / time
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
    // Adds the svg canvas
    var svg = d3.select("body") .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform",
                  "translate(" + margin.left + "," + margin.top + ")");
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

        // Add the valueline path.
        svg.append("path")
            .attr("class", "line")                //different
            .datum(data)             //check this after
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("d", valueline(data));
        // Add the X Axis
        svg.append("g")
            .attr("class", "x axis")             //different
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
        //  .select(".domain")
        //  .remove();


        // Add the Y Axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis).
            append("text")        // all attributes bellow are NEW 
          .attr("fill", "#000") // 
          .attr("transform", "rotate(-90)")  // 
          .attr("y", 6) // 
          .attr("dy", "0.71em") // 
          .attr("text-anchor", "end") // 
          .text("Price ($)"); //
    });
  }
  
  render (){
    return(
      <div>
        <h1> d3 </h1>
      {d3chart}       
</div>
    )
  }
}