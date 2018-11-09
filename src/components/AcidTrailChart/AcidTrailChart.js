import React, { Component } from 'react';
import { withFauxDOM } from 'react-faux-dom';
import * as d3 from 'd3';

import './AcidTrailChart.css';

import AcidTrail from '../../modules/acid-trail/AcidTrail';

class AcidTrailChartComponent extends Component {

  rect ({
    group,
    width,
    height,
    margin
  }) {
    return group
      .append('rect')
      .attr('y', 0)
      .attr('x', (datum, index) => (index * margin) + (index * width))
      .attr('height', height)
      .attr('width', width);
  }

  ellipse ({
    group,
    width,
    height,
    margin
  }) {
    return group
      .append('ellipse')
      .attr('cy', height)
      .attr('cx', (datum, index) => (index * margin) + (index * width) + (width / 2))
      .attr('rx', width / 2)
      .attr('ry', height);
  }

  notched ({
    group,
    width,
    height,
    margin
  }) {
    return group
      .append('polygon')
      .attr('points', (datum, index) => {
        const top = 0;
        const left = (index * margin) + (index * width);
        const right = left + width;
        const bottom = height;
        const notchBottom = bottom - margin;
        const notchRight = right - margin;

        const points = [
          [ left, top ],
          [ right, top ],
          [ right, notchBottom ],
          [ notchRight, bottom ],
          [ left, bottom ],
          [ left, top ]
        ];

        return points.map(
          (point) => point.join(',')
        ).join(' ');
      });
  }

  text ({
    group,
    width,
    height,
    margin
  }) {
    return group
      .append('text')
      .attr('y', 0)
      .attr('dy', height * 0.8)
      .attr('x', (datum, index) => (index * margin) + (index * width))
      .attr('dx', width * 0.1)
      .attr('height', height / 5)
      .attr('width', width)
      .attr('class', 'color-text')
      .attr('textLength', width * 0.8)
      .attr('lengthAdjust', 'spacing');
  }

  addBar ({
    colors,
    names,
    faux,
    height = 50,
    shape = 'notched'
  }) {

    const width = 100;
    const margin = width * 0.1;

    const title = names.join(' - ');

    faux.append('div')
      .attr('class', 'trail-text-name')
      .text(title);

    const svg = faux
      .append('svg')
      .attr('viewBox', `0 0 ${width * colors.length + margin * (colors.length - 1)} ${height}`)
      .attr('preserveAspectRatio', 'none')
      .attr('width', '100%')
      .attr('height', height);

    const group = svg
      .append('g');

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

    this[shape]({
      group:
        group
          .selectAll(`.${shape}s`)
          .data(data)
          .enter(),
      width,
      height,
      margin
    })
      .attr('fill', (datum) => range(datum));

    // this.rect(
    //   {
    //     group:
    //       group
    //         .selectAll('.rects')
    //         .data(data)
    //         .enter(),
    //     width:  width,
    //     height,
    //     margin: margin
    //   })
    //   .attr('fill', (datum) => range(datum));

    this.text({
      group:
        group
          .selectAll('.texts')
          .data(data)
          .enter(),
      width,
      height,
      margin
    })
      .text((datum) => `${namesRange(datum)}`);
      // .attr('lengthAdjust', 'spacingAndGlyphs');

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
      },
      showShape
    } = this.props;

    const height = '50';

    const trail = AcidTrail.trail(hash.hashed);

    const faux = connectFauxDOM('div', 'chart');

    if (showBars.hash) {
      const hashcolors = trail.colors();

      this.addBar({
        colors: hashcolors,
        names:  hashcolors,
        faux:   d3.select(faux),
        height,
        shape:  showShape
      });
    }

    if (showBars.shades) {
      const shadenames = trail.hashColors.map(
        (color) => color.match.shadeName
      );
      const shades = trail.hashColors.map(
        (color) => color.match.shade.toLowerCase()
      );

      this.addBar({
        colors: shades,
        names:  shadenames,
        faux:   d3.select(faux),
        height,
        shape:  showShape
      });
    }

    if (showBars.colors || showBars.names) {
      const matchcolors = trail.matchcolors().map(
        (color) => color.toLowerCase()
      );

      if (showBars.colors) {

        this.addBar({
          colors: matchcolors,
          names:  matchcolors,
          faux:   d3.select(faux),
          height,
          shape:  showShape
        });
      }

      if (showBars.names) {
        const matchnames = trail.matchnames();

        this.addBar({
          colors: matchcolors,
          names:  matchnames,
          faux:   d3.select(faux),
          height,
          shape:  showShape
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
