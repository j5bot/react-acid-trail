import React, { Component } from 'react';
import {withFauxDOM} from 'react-faux-dom';
import * as d3 from 'd3';

class AcidTrailChartComponent extends Component {

  componentDidMount () {

    const { animateFauxDOM, connectFauxDOM, data } = this.props;

    const faux = connectFauxDOM('div', 'chart');

    let margin = { top: 20, right: 20, bottom: 30, left: 40 },
        width = this.props.width - margin.left - margin.right,
        height = this.props.height - margin.top - margin.bottom;

    let x = d3.scaleBand()
      .rangeRound([ 0, width ]);

    let y = d3.scaleLinear()
      .range([ height, 0 ]);

    let xAxis = d3.axisBottom()
      .scale(x);

    let yAxis = d3.axisLeft()
      .scale(y)
      .ticks(10, '%');

    // Pass it to d3.select and proceed as normal
    let svg = d3.select(faux).append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    x.domain(data.map((d) => d.letter));
    y.domain([ 0, d3.max(data, (d) => d.frequency) ]);

    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis);

    svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis)
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('Frequency');

    svg.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => x(d.letter))
      .attr('width', 20)
      .attr('y', (d) => y(d.frequency))
      .attr('height', (d) => { return height - y(d.frequency); });

    animateFauxDOM(800);
  }

  render () {
    return (
      <div>
        {this.props.chart}
      </div>
    );
  }
}

export const AcidTrailChart = withFauxDOM(AcidTrailChartComponent);

export default AcidTrailChart;