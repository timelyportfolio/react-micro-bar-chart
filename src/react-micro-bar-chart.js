(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.MicroBarChart = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Generated by CoffeeScript 1.10.0
module.exports = React.createClass({displayName: "exports",
  getDefaultProps: function() {
    return {
      width: 100,
      height: 16,
      xAxis: false,
      fillColor: 'black',
      data: [7, 1, 5, 5, 4, 3, 5, 2, 3, 5, 6],
      tooltip: false,
      tipOffset: [0, 0],
      tipTemplate: function(d, i) {
        return "Value: " + d + ", index: " + i;
      }
    };
  },
  componentDidMount: function() {
    return this.renderBarChart();
  },
  componentWillUnmount: function() {
    if (this.tooltip != null) {
      return this.tooltip.remove();
    }
  },
  render: function() {
    return React.createElement("svg", null);
  },
  renderBarChart: function() {
    var bar, barWidth, chart, height, self, tooltip, values, xAxis, y;
    self = this;
    if (this.props.hoverColor == null) {
      this.props.hoverColor = this.props.fillColor;
    }
    values = this.props.data.slice();
    y = d3.scale.linear().range([this.props.height, 0]);
    y.domain([0, Math.max.apply(null, values)]);
    if (this.props.xAxis) {
      height = this.props.height + 1;
    } else {
      height = this.props.height;
    }
    chart = d3.select(ReactDOM.findDOMNode(this)).attr("width", this.props.width).attr("height", height);
    barWidth = this.props.width / values.length;
    bar = chart.selectAll("g").data(values).enter().append("g").attr("transform", function(d, i) {
      return "translate(" + i * barWidth + ",0)";
    });
    if (self.props.tooltip) {
      this.tooltip = tooltip = d3.select("body").append("div").attr("class", "barchart-tooltip").style("opacity", 1e-6).style("position", "absolute");
    }
    bar.append("rect").attr("y", function(d) {
      return y(d);
    }).attr("height", (function(_this) {
      return function(d) {
        return _this.props.height - y(d);
      };
    })(this)).attr("width", barWidth - 1).attr("fill", this.props.fillColor).on("mouseover", function(d, i) {
      var box, coords, fadingIn, matrix, point, scrollLeft, scrollTop, tipHeight, tipWidth;
      d3.select(this).attr("fill", self.props.hoverColor);
      if (self.props.tooltip) {
        point = chart[0][0].createSVGPoint();
        matrix = this.getScreenCTM();
        box = this.getBBox();
        point.x = box.x;
        point.y = box.y;
        coords = point.matrixTransform(matrix);
        tooltip.html(self.props.tipTemplate(d, i, values));
        tipWidth = tooltip[0][0].offsetWidth;
        tipHeight = tooltip[0][0].offsetHeight;
        if (tooltip[0][0].style.opacity < 0.5) {
          fadingIn = true;
        }
        scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
        if (fadingIn) {
          return tooltip.style("visibility", "visible").style("left", coords.x + scrollLeft - tipWidth / 2 + barWidth / 2 - self.props.tipOffset[0] + "px").style("top", coords.y + scrollTop - tipHeight - self.props.tipOffset[1] + "px").transition().duration(100).style("opacity", 1);
        } else {
          return tooltip.style("visibility", "visible").transition().duration(100).style("opacity", 1).style("left", coords.x + scrollLeft - tipWidth / 2 + barWidth / 2 - self.props.tipOffset[0] + "px").style("top", coords.y + scrollTop - tipHeight - self.props.tipOffset[1] + "px");
        }
      }
    }).on("mouseout", function(d) {
      d3.select(this).attr("fill", self.props.fillColor);
      if (self.props.tooltip) {
        return tooltip.transition().duration(250).style("opacity", 1 / 1e6).each("end", function() {
          return tooltip.style("visibility", "hidden");
        });
      }
    });
    if (this.props.onClick) {
      bar.on("click", (function(_this) {
        return function(d, i) {
          return _this.props.onClick(d, i);
        };
      })(this));
    }
    if (this.props.xAxis) {
      xAxis = d3.svg.axis().scale(d3.scale.linear().range([this.props.width - 1, 0])).orient("bottom");
      return chart.append("g").attr("class", "x axis").attr("fill", this.props.fillColor).attr("transform", "translate(0," + this.props.height + ")").call(xAxis);
    }
  }
});

},{}]},{},[1])(1)
});