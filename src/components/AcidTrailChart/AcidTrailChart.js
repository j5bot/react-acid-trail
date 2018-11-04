import React, { Component } from 'react';
import { withFauxDOM } from 'react-faux-dom';
import * as d3 from 'd3';

import AcidTrail from '../../modules/acid-trail/AcidTrail';

class AcidTrailChartComponent extends Component {

  addBar ({
    colors,
    names,
    svg,
    height = 50
  }) {

    const rectWidth = 100 / colors.length;
    const data = d3.range(colors.length);
    const range =
      d3
        .scaleQuantize()
        .domain([ 0, colors.length ])
        .range(colors);
    const namesRange =
      d3
        .scaleQuantize()
        .domain([ 0, colors.length ])
        .range(names);

    svg
      .selectAll('.rects')
      .data(data)
      .enter()
      .append('rect')
      .attr('y', 0)
      .attr('x', (datum, index) => `${rectWidth * index}%`)
      .attr('height', height)
      .attr('width', `${rectWidth}%`)
      .attr('fill', (datum) => range(datum))
      .attr('stroke', 'white');

    svg
      .selectAll('.texts')
      .data(data)
      .enter()
      .append('text')
      .attr('y', 0)
      .attr('dy', '80%')
      .attr('x', (datum, index) => `${rectWidth * index}%`)
      .attr('dx', `${rectWidth * 0.1}%`)
      .attr('height', height / 3)
      .attr('width', `${rectWidth}%`)
      .attr('class', 'color-text')
      .attr('textLength', `${rectWidth * 0.8}%`)
      .attr('lengthAdjust', 'spacingAndGlyphs')
      .text((datum) => `${namesRange(datum)}`);

  }

  componentDidMount () {

    const {
      animateFauxDOM,
      connectFauxDOM,
      hash,
      showBars = {
        hash:   true,
        shades: true,
        colors: true,
        names:  true
      }
    } = this.props;

    const height = '50';

    const trail = AcidTrail.trail(hash.hashed);

    const faux = connectFauxDOM('div', 'chart');

    let svg;

    if (showBars.hash) {
      const hashcolors = trail.colors();

      svg = d3.select(faux).append('svg')
        .attr('width', '100%')
        .attr('height', height)
        .append('g');

      this.addBar({
        colors: hashcolors,
        names:  hashcolors,
        svg,
        height
      });
    }

    if (showBars.shades) {
      const shadenames = trail.hashColors.map(
        (color) => color.match.shadeName
      );
      const shades = trail.hashColors.map(
        (color) => color.match.shade.toLowerCase()
      );

      svg = d3.select(faux).append('svg')
        .attr('width', '100%')
        .attr('height', height)
        .append('g');

      this.addBar({
        colors: shades,
        names:  shadenames,
        svg,
        height
      });
    }

    if (showBars.colors || showBars.names) {
      const matchcolors = trail.matchcolors().map(
        (color) => color.toLowerCase()
      );

      if (showBars.colors) {
        svg = d3.select(faux).append('svg')
          .attr('width', '100%')
          .attr('height', height)
          .append('g');

        this.addBar({
          colors: matchcolors,
          names:  matchcolors,
          svg,
          height
        });
      }

      if (showBars.names) {
        const matchnames = trail.matchnames();

        svg = d3.select(faux).append('svg')
          .attr('width', '100%')
          .attr('height', height)
          .append('g');

        this.addBar({
          colors: matchcolors,
          names:  matchnames,
          svg,
          height
        });
      }
    }

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
