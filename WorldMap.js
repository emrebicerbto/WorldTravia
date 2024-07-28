import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import SvgPanZoom, { SvgPanZoomElement } from 'react-native-svg-pan-zoom';
import worldData from './worldData.json';

const WorldMap = ({ selectedCountries }) => {
  useEffect(() => {
    console.log('worldData:', worldData);
  }, []);

  const renderPaths = () => {
    return worldData.features.map((feature, index) => {
      let pathData = '';

      if (feature.geometry.type === 'LineString') {
        pathData = `M${feature.geometry.coordinates.map(point => point.join(',')).join(' L')}`;
      } else if (feature.geometry.type === 'MultiLineString') {
        pathData = feature.geometry.coordinates.map(lineString =>
          `M${lineString.map(point => point.join(',')).join(' L')}`
        ).join(' ');
      } else if (feature.geometry.type === 'Polygon') {
        pathData = feature.geometry.coordinates.map(ring =>
          `M${ring.map(point => point.join(',')).join(' L')}`
        ).join(' ');
      } else if (feature.geometry.type === 'MultiPolygon') {
        pathData = feature.geometry.coordinates.map(polygon =>
          polygon.map(ring =>
            `M${ring.map(point => point.join(',')).join(' L')}`
          ).join(' ')
        ).join(' ');
      }

      const isSelected = selectedCountries.some(
        country => country.properties.NAME === feature.properties.NAME
      );

      return (
        <Path
          key={index}
          d={pathData}
          fill={isSelected ? 'blue' : 'none'}
          stroke="black"
          strokeWidth={0.5}
        />
      );
    });
  };

  const { width, height } = Dimensions.get('window');

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <SvgPanZoom
          canvasHeight={height * 0.4} // Set to 80% of the height to avoid overlap
          canvasWidth={width}
          minScale={1}
          maxScale={10}
          initialZoom={1} // Adjust the initial zoom level
          initialX={0} // Adjust the initial X offset
          initialY={0} // Adjust the initial Y offset
          style={styles.svgPanZoom}
        >
          <SvgPanZoomElement>
            <Svg viewBox="-180 0 360 120" transform="scale(1, -1)">
              {renderPaths()}
            </Svg>
          </SvgPanZoomElement>
        </SvgPanZoom>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer: {
    width: '100%',
    height: '10%', // Adjust the height to avoid overlap with other UI elements
    backgroundColor: 'white', // Set white background for the map container
    justifyContent: 'center', // Center the map vertically
    alignItems: 'center', // Center the map horizontally
  },
  svgPanZoom: {
    flex: 1,
  },
});

export default WorldMap;
