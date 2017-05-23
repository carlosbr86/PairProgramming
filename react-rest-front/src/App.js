import React, { Component } from 'react';
import * as d3 from 'd3';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import $ from "jquery";
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

// import './App.css';
// import {Link} from 'react-router';
class Calendar extends React.Component {
  constructor () {
    super();
    this.state = {
      date: moment("2017-05-22")
    };
    console.log(this.state.startDate);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this);

 }

 handleChange(date) {
    this.setState({
      date: date,
    });
  }
handleSubmit(){
  this.props.submitHandler(
    this.state.date,
  )
}
  
 
 render() {
  return (
    <div>
      <DatePicker id={this.props.definingID}
        dateFormat="YYYY-MM-DD"
        selected={this.state.date}
        onChange={this.handleChange}
      />
    </div>)
  }
} 

class D3Component extends Component { 
    constructor (props){
    super (props);
    this.state = {

    }
  
    // this.handleSubmit = this.handleSubmit.bind(this);
  }
  setContext() {
    let svg=d3.select(this.refs.d3Ref).append("svg")
      .attr("width", '700px') //width + margin.left + margin.right
              .attr("height", '400px') //height + margin.top + margin.bottom
          .append("g")
              .attr("transform",
                    "translate(150,150 )"); //" + margin.left + "," + margin.top + ")"
    return svg

  }

  setLine(context) {
    
  var margin={top: 30, right: 20, bottom: 30, left: 50}, 
    width=600 - margin.left - margin.right,            //600 hardCode Data
    height=270 - margin.top - margin.bottom;           //270 hardCode Data
  var parseTime=d3.time.format("%Y-%m-%d").parse;     
  // Set the ranges
  var x=d3.time.scale().rangeRound([0, width]);         
  var y=d3.scale.linear().rangeRound([height, 0]);      
  // Define the axis
  var xAxis=d3.svg.axis().scale(x).orient("bottom").ticks(5);
  var yAxis=d3.svg.axis().scale(y).orient("left").ticks(5);
  // Define the line
  var valueline=d3.svg.line()                             
    .x(function(d) { return x(d.date); }) 
    .y(function(d) { return y(d.value); });

  // Get the data
    console.log("data xxxxxxx",this.props.data,"data xxxxxxx");
    d3.csv("data.csv", function(error, data) {  
      data.forEach(function(d) {
          d.date = parseTime(d.date);
          d.value = +d.value;
      });
      // Scale the range of the data
      x.domain(d3.extent(data, function(d) { return d.date; })); 
      y.domain( d3.extent(data, function(d) { return d.value; }));

    return context.append("path")
          .attr("class", "line")           
          .datum(data)  
          .attr("fill", "none")
          .attr("stroke", "steelblue")
          .attr("stroke-linejoin", "round")
          .attr("stroke-linecap", "round")
          .attr("stroke-width", 1.5)
          .attr("d", valueline(data));
          
        }) // Close d3.csv read DATA
  }

  setXAxis(context) {
    
  var margin={top: 30, right: 20, bottom: 30, left: 50}, 
    width=600 - margin.left - margin.right,            //600 hardCode Data
    height=270 - margin.top - margin.bottom;           //270 hardCode Data

  var parseTime = d3.time.format("%Y-%m-%d").parse;       // Changed parseDate to parseTime
  // Set the ranges
  var x=d3.time.scale().rangeRound([0, width]);         // Changed range. to rangeRound            - older code , only d3 instead d3.time
  var y=d3.scale.linear().rangeRound([height, 0]);      // Changed range. to rangeRound
  // Define the axis
  var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(5);
  var yAxis = d3.svg.axis().scale(y).orient("left").ticks(5);
  // Define the line
  var valueline= d3.svg.line()                             
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
  var parseTime = d3.time.format("%Y-%m-%d").parse;       // Changed parseDate to parseTime
  // Set the ranges
  var x=d3.time.scale().rangeRound([0, width]);         // Changed range. to rangeRound            - older code , only d3 instead d3.time
  var y=d3.scale.linear().rangeRound([height, 0]);      // Changed range. to rangeRound
  // Define the axis
  var xAxis=d3.svg.axis().scale(x).orient("bottom").ticks(5);
  var yAxis=d3.svg.axis().scale(y).orient("left").ticks(5);
  // Define the line
  var valueline=d3.svg.line()                             
  .x(function(d) { return x(d.date); }) 
  .y(function(d) { return y(d.value); });

  // Get the data

  d3.csv("data.csv", function(error, data) { 
      data.forEach(function(d) {
          d.date=parseTime(d.date);
          d.value=+d.value;
      });
      // Scale the range of the data

      x.domain(d3.extent(data, function(d) { return d.date; })); 
      y.domain( d3.extent(data, function(d) { return d.value; }));

    context.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")        // all attributes bellow are NEW 
      .attr("fill", "#000") // 
      .attr("transform", "rotate(-90)")  // 
      .attr("y", 6) // 
      .attr("dy", "0.71em") // 
      .attr("text-anchor", "end") // 
      .text("Price ($)"); 
          });
  }

  componentWillMount() {
    console.log()
  }

  componentDidMount() { // Component Did Update?
    const context = this.setContext();
    this.setLine(context);
    this.setXAxis(context);
    this.setYAxis(context);
  }

  render() {
  var margin = {top: 30, right: 20, bottom: 30, left: 50}, 
    width = 600 - margin.left - margin.right,            //600 hardCode Data
    height = 270 - margin.top - margin.bottom;           //270 hardCode Data

    return (
      <div>
        <div ref="d3Ref"></div>

      </div>
    )
  }
}

class Form extends Component {
  sendform(){

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

  }
  
  render(){
    return(
      <div>
  
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
      <button id="submitForm" onClick={this.props.handleSubmit} > Submit</button>
    </div>
    )
  }
}

class App extends Component {
  constructor (props){
    super (props);
    this.state = {
      startDate: "2017-04-30",
      finalDate: "2017-05-20",
      baseCurrency: "CAD",
      symbolCurrency: "BRL",
      data:""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }
 submitHandler(start, final){
    console.log(start, final);
  }

  handleSubmit(){
    
    let startDate = document.getElementById("datepickerStart").value;
    let finalDate = document.getElementById("datepickerFinal").value;
    let e = document.getElementById("baseCurrency");
    let baseCurrency = e.options[e.selectedIndex].value;
    let f = document.getElementById("symbolCurrency");
    let symbolCurrency = f.options[f.selectedIndex].value;
    console.log(startDate,finalDate,baseCurrency,symbolCurrency);
    axios.post("http://localhost:2222/postdata",
      {
          startDate: startDate,
          finalDate: finalDate,
          baseCurrency: baseCurrency,
          symbolCurrency: symbolCurrency
      }
    );
		this.setState({
			startDate: startDate,
      finalDate: finalDate,
      baseCurrency: baseCurrency,
      symbolCurrency: symbolCurrency
		})
  }

    componentDidUpdated() {
        d3.csv("data.csv", (error, data)=> {  
          if(data){
            this.setState({
              data:data
            })
          }
        }); 
  }
  render() {
    return (
      <div className="App">
        {/*{this.props.children} */}
        <h2>Currency Graph</h2>
        <D3Component data={this.state.data}/>
        <p>Start Date: <Calendar definingID={"datepickerStart"} date={"2017-05-01"} /> </p>
        <p> Final Date: <Calendar definingID={"datepickerFinal"} date={"2017-05-23"} /></p>
        <Form handleSubmit={this.handleSubmit} formData={this.state} />
      </div>
    );
  };
};

export default App;