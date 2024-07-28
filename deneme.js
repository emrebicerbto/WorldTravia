import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import Svg, { Path, G } from 'react-native-svg';
import SvgPanZoom, { SvgPanZoomElement } from 'react-native-svg-pan-zoom';
import worldData from './worldData.json';

const WorldMap = ({ selectedCountries }) => {
  const panZoomRef = useRef(null);
  const [zoomLevel, setZoomLevel] = useState(1);

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

      const strokeWidth = isNaN(1 / zoomLevel) ? 1 : 1 / zoomLevel;

      return (
        <Path
          key={index}
          d={pathData}
          fill={isSelected ? 'blue' : 'none'}
          stroke="black"
          strokeWidth={strokeWidth} // Safeguard stroke width
        />
      );
    });
  };

  const handleZoomChange = (event) => {
    if (event.zoomLevel) {
      setZoomLevel(event.zoomLevel);
    }
  };

  const { width, height } = Dimensions.get('window');

  return (
    <ImageBackground source={require('./background.webp')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.mapArea}>
          <SvgPanZoom
            canvasHeight={height - 200}
            canvasWidth={width}
            minScale={1.5}
            maxScale={6}
            onZoom={handleZoomChange}
          >
            <SvgPanZoomElement>
              <Svg height="100%" width="100%" viewBox="0 0 2000 1000">
                <G transform="rotate(180, 1000, 500) scale(4)">
                  {worldData && renderPaths()}
                </G>
              </Svg>
            </SvgPanZoomElement>
          </SvgPanZoom>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapArea: {
    height: '80%', // Adjust this value as needed to control the map area height
    width: '100%',
  },
});

export default WorldMap;







/*
import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, G } from 'react-native-svg';
import SvgPanZoom, { SvgPanZoomElement } from 'react-native-svg-pan-zoom';
import worldData from './worldData.json';

const WorldMap = ({ selectedCountries }) => {
  useEffect(() => {
    console.log('worldData:', "worldData");
    console.log('width', width);
    console.log('height', height);
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
      <View style={styles.maparea}>
        <SvgPanZoom
          canvasHeight={height}
          canvasWidth={width}
          minScale={1}
          maxScale={10}
          initialZoom={1}>
          <Svg viewBox="-180 0 360 180" transform="scale(1, -1)">
            {worldData && renderPaths()}
          </Svg>
        </SvgPanZoom>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  maparea: {
    backgroundColor: "red",
    width: '100%',
    height: '100%',
  },
});

export default WorldMap;
*/