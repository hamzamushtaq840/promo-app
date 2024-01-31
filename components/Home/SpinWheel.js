import { Button, TopNavigation } from '@ui-kitten/components';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import Svg, { G, Image, Path, Text as SvgText } from 'react-native-svg';
import Container from '../Generic/Container';
import NavigationAction from '../Generic/NavigationAction';

const WinningSegment = ({ winningSegment }) => (
  <View style={styles.winningSegment}>
    <Text style={styles.winningSegmentText}>Winning Segment: {winningSegment}</Text>
  </View>
);

const SpinWheel = () => {
  const spinValue = useRef(new Animated.Value(0)).current;
  const router = useRouter();
  const [angle, setAngle] = useState(0);
  const [winningSegment, setWinningSegment] = useState(null);

  const interpolateInverseSpinning = spinValue.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '-360deg'],
  });

  const spinWheel = () => {
    spinValue.setValue(0);
    const randomSpin = Math.floor(Math.random() * 5) * (360 / 5) + 1440;

    Animated.timing(spinValue, {
      toValue: randomSpin,
      duration: 4000,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      const winningSegment = Math.floor((randomSpin % 360) / (360 / 5)) + 1;
      console.log(`Landed on number: ${winningSegment}`);
      setAngle(randomSpin);
      setWinningSegment(winningSegment);
    });
  };

  const interpolateSpinning = spinValue.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  const wheelPieces = [0, 1, 2, 3, 4].map(index => {
    const startAngle = (index * 360) / 5;
    const endAngle = startAngle + 360 / 5;
    const midAngle = startAngle + (endAngle - startAngle) / 2;
    const { x, y } = polarToCartesian(150, 150, 100, midAngle); // Adjust radius for text placement
    return {
      path: describeArc(150, 150, 150, startAngle, endAngle),
      color: `hsl(${index * 72}, 70%, 50%)`,
      number: index + 1,
      textX: x,
      textY: y,
    };
  });

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <Animated.View style={{ transform: [{ rotate: interpolateSpinning }] }}>
        <Svg height="300" width="300" viewBox="0 0 300 300">
          <G x="0" y="0">
            {wheelPieces.map((piece, index) => (
              <Path key={index} d={piece.path} fill={piece.color} />
            ))}
            {wheelPieces.map((piece, index) => {
              // Calculate the angle for the rotation of the text
              // The angle is adjusted by -90 degrees because SVG rotation is relative to the 3 o'clock position
              const textRotation =
                -1 * (piece.startAngle + (piece.endAngle - piece.startAngle) / 2 - 90);
              return (
                <G
                  key={`number_group_${index}`}
                  rotation={textRotation}
                  origin={`${piece.textX}, ${piece.textY}`}>
                  <SvgText
                    key={`number_${index}`}
                    x={piece.textX}
                    y={piece.textY}
                    fill="white"
                    fontSize="20"
                    fontWeight="bold"
                    textAnchor="middle"
                    alignmentBaseline="middle">
                    {piece.number}
                  </SvgText>
                </G>
              );
            })}
          </G>
          {/* <ArrowSvg x="135" y="10" width="30" height="30" /> */}
        </Svg>
      </Animated.View>
      <WinningSegment winningSegment={winningSegment} />
      <View style={{ position: 'absolute' }}>
        <Svg height="300" width="300" viewBox="0 0 300 300">
          <G
            rotation={angle} // Update rotation direction to match the wheel
            origin="150, 150">
            <Image
              x="136"
              y="103"
              width="30"
              height="30"
              href={require('./../../assets/images/knob.png')}
            />
          </G>
        </Svg>
      </View>
      <Button onPress={spinWheel} style={styles.button}>
        Spin
      </Button>
    </View>
  );
};

// Helper function to describe an SVG arc for the wheel
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describeArc(x, y, radius, startAngle, endAngle) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  const d = [
    'M',
    start.x,
    start.y,
    'A',
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
    'L',
    x,
    y,
    'L',
    start.x,
    start.y,
  ].join(' ');
  return d;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  wheel: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 2,
    borderColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    position: 'absolute',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#444',
    textAnchor: 'middle', // SVG-specific style to center text
    // Adjust these offsets to position the number correctly
    x: '150',
    y: '40',
  },
  button: {
    marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
  },
});

export default SpinWheel;
