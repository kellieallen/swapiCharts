import React from 'react';
import PropTypes from 'prop-types';
import { VictoryChart, VictoryAxis, VictoryBar, VictoryTheme } from 'victory';
import { pink, teal } from '../../styles/global/mixins.scss';

class BarChart extends React.PureComponent {
  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.number
      })
    ),
    xKey: PropTypes.string.isRequired,
    yKey: PropTypes.string.isRequired,
    chartWidth: PropTypes.number,
    chartHeight: PropTypes.number,
    barWidth: PropTypes.number,
    strokeWidth: PropTypes.number
  };

  static defaultProps = {
    data: [],
    chartWidth: 350,
    chartHeight: 150,
    barWidth: 20,
    strokeWidth: 1
  };

  render() {
    const { data, xKey, yKey, chartWidth, chartHeight, barWidth, strokeWidth } = this.props;

    return (
    
      <VictoryChart
        width={chartWidth}
        height={chartHeight}
        padding={{ top: 8, left: 50, bottom: 50, right: 50 }}
        domainPadding={{ x: barWidth / 2 }}
        theme={VictoryTheme.material}
      
      >
        <VictoryAxis
          crossAxis
          orientation="bottom"
          tickValues={data.map(({ name }) => name)}
          style={{ tickLabels: { angle: -45, fontSize: 8, textAnchor: 'end', padding: 0 } }}
          padding={{ top: 20, bottom: 60 }}
        />
        <VictoryAxis
          crossAxis
          dependentAxis
          orientation="left"
          style={{ tickLabels: { fontSize: 8, padding: 0 } }}
        />
        <VictoryBar
          x={xKey}
          y={yKey}
          animate={{ duration: 500 }}
          data={data}
          style={{ data: { fill: pink, stroke: teal, strokeWidth, width: barWidth } }}
        />
      </VictoryChart>
      
    );
  }
}

export default BarChart;
