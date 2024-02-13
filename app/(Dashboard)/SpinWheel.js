import { Button, TopNavigation } from '@ui-kitten/components';
import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated, Easing } from 'react-native';
import Svg, { Path, G, Text as SvgText, Image } from 'react-native-svg';
import NavigationAction from '../../components/Generic/NavigationAction';
import Container from '../../components/Generic/Container';
import { useRouter } from 'expo-router';

const SpinWheel = () => {
  const spinValue = useRef(new Animated.Value(0)).current;
  const router = useRouter();
  const [angle, setAngle] = useState(0);

  const interpolateInverseSpinning = spinValue.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '-360deg'], // inverse rotation direction
  });

  const spinWheel = () => {
    spinValue.setValue(0);
    const randomSpin = Math.floor(Math.random() * 5) * (360 / 5) + 1440; // 1440 is 4 full rotations

    Animated.timing(spinValue, {
      toValue: randomSpin,
      duration: 4000,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      // Calculate the winning segment here based on the angle
      const winningSegment = Math.floor((randomSpin % 360) / (360 / 5)) + 1;
      // console.log(`Landed on number: ${winningSegment}`);
      setAngle(randomSpin);
    });
  };

  const interpolateSpinning = spinValue.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  const wheelPieces = [
    { name: 'first', number: 1 },
    { name: 'second', number: 2 },
    { name: 'third', number: 3 },
    { name: 'fourth', number: 4 },
    { name: 'fifth', number: 5 },
  ].map(v => {
    const startAngle = (v.number * 360) / 5;
    const endAngle = startAngle + 360 / 5;
    const midAngle = startAngle + (endAngle - startAngle) / 2;
    const { x, y } = polarToCartesian(150, 150, 100, midAngle); // Adjust radius for text placement
    return {
      path: describeArc(150, 150, 150, startAngle, endAngle),
      color: `hsl(${v.number * 72}, 70%, 50%)`,
      number: v.number + 1,
      textX: x,
      textY: y,
      name: v.name,
    };
  });

  return (
    <Container style={styles.container}>
      <TopNavigation
        style={{ width: '100%' }}
        alignment="center"
        title={<Text>Wheel of fortune</Text>}
        accessoryLeft={
          <NavigationAction
            marginHorizontal={6}
            height={16}
            width={20}
            icon="back"
            onPress={() => {
              router.back();
            }}
          />
        }
      />
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
        <View style={{ position: 'absolute' }}>
          <Svg height="300" width="300" viewBox="0 0 300 300">
            <G
              rotation={0}
              origin="150, 150" // This should be the center of the image where the rotation is applied around
            >
              <Image
                x="136" // Adjust the position according to your arrow's size
                y="103" // Adjust the position according to your arrow's size
                width="30" // Adjust the size as needed
                height="30" // Adjust the size as needed
                href={require('./../../assets/images/knob.png')}
              />
            </G>
          </Svg>
        </View>
        <Button onPress={spinWheel} style={styles.button}>
          Spin
        </Button>
      </View>
    </Container>
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
