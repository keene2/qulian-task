import * as React from 'react';
import Svg, { G, Defs, LinearGradient, Stop, Path } from 'react-native-svg';

interface LineChartProps {
  data: {
    x: number;
    y: number;
  }[];
  width?: number;
  height?: number;
}

function LineChartView({ data, width = 600, height = 200 }: LineChartProps) {
  function getMaxX() {
    const onlyX = data.map(obj => obj.x);
    const maxX = Math.max.apply(null, onlyX);
    return maxX;
  }
  function getMaxY() {
    const onlyY = data.map(obj => obj.y);
    const maxY = Math.max.apply(null, onlyY);
    return maxY;
  }
  function getSvgX(x: number) {
    return (x / getMaxX()) * width;
  }
  function getSvgY(y: number) {
    return height - (y / getMaxY()) * height;
  }

  function makePathD() {
    let pathD = ` M  ${getSvgX(data[0].x)} ${getSvgY(data[0].y)} `;
    pathD += data.map(point => {
      return `L ${getSvgX(point.x)} ${getSvgY(point.y)}  `;
    });
    return pathD;
  }

  return (
    <Svg viewBox={`0 0 ${width} ${height}`}>
      <Defs>
        <LinearGradient id="text-fill-grad" x1="0%" y1="100%" x2="0%" y2="20%">
          <Stop offset="0%" stopColor="#fff" stopOpacity="0" />
          <Stop offset="100%" stopColor="rgb(231,224,250)" stopOpacity="0.8" />
        </LinearGradient>
      </Defs>
      <G>
        <Path d={`${makePathD()}V${height}H0Z`} fill="url(#text-fill-grad)" />
        <Path
          d={makePathD()}
          fill="none"
          stroke="rgb(103,73,229)"
          strokeWidth={10}
        />
      </G>
    </Svg>
  );
}

export default LineChartView;
