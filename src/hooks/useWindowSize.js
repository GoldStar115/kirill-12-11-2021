import {useWindowDimensions} from 'react-native';
const SAFEAREA_TOP = 44;
const SAFEAREA_BOTTOM = 34;
const TOP_HEIGHT = 50;
const BOTTOM_HEIGHT = 50;
const OTHER_HEIGHT = 30;
const ROW_HEIGHT = 25;

export const useWindowSize = () => {
  const dimension = useWindowDimensions();
  const deviceHeight = dimension.height - SAFEAREA_TOP - SAFEAREA_BOTTOM;
  const chartHeight =
    (deviceHeight - OTHER_HEIGHT * 2 - TOP_HEIGHT - BOTTOM_HEIGHT) / 2;
  const numberOfDisplay = chartHeight / ROW_HEIGHT;
  return {
    numberOfDisplay,
    chartHeight,
    rowHeight: ROW_HEIGHT,
  };
};
