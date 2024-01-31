import { Canvas, Group, Mask, Path, Rect, Skia, useTouchHandler } from '@shopify/react-native-skia';
import React, { useCallback, useRef, useState } from 'react';
import { svgPathProperties } from 'svg-path-properties';
import Scratcher from './Scratcher';
import ScratcherImage from './ScratcherImage';
import { Text } from 'react-native';

export const ScratchCard = ({
  brushSize = 30,
  image = 'https://pbs.twimg.com/media/FZ249SNUYAAxes7.jpg',
  height = 300,
  width = 300,
  percentage = 70,
}) => {
  const [paths, setPaths] = useState([]);
  const pathRef = useRef(Skia.Path.Make()).current;
  const [autoReveal, setAutoReveal] = useState(false);

  const drawingActiveRef = useRef(false);

  const onDrawingStart = useCallback(touchInfo => {
    drawingActiveRef.current = true;

    setPaths(old => {
      const { x, y } = touchInfo;
      const newPath = Skia.Path.Make();
      newPath.moveTo(x, y);
      pathRef.moveTo(x, y);
      return [...old, newPath];
    });
  }, []);

  const onDrawingActive = useCallback(touchInfo => {
    if (drawingActiveRef.current) {
      const pathSvgString = pathRef?.toSVGString();
      const pathProperties = new svgPathProperties(pathSvgString);
      const totalArea = pathProperties.getTotalLength() * brushSize;
      const currentPercentage = (totalArea / (height * width)) * 100;
      if (currentPercentage > percentage) {
        setAutoReveal(true);
        console.log('you won');
        setPaths([]);
      } else {
        setPaths(currentPaths => {
          const { x, y } = touchInfo;
          let currentPath = currentPaths[currentPaths.length - 1];

          const lastPoint = pathRef.getLastPt();
          const xMid = (lastPoint.x + x) / 2;
          const yMid = (lastPoint.y + y) / 2;
          pathRef.quadTo(lastPoint.x, lastPoint.y, xMid, yMid);
          currentPath = pathRef;
          return [...currentPaths.slice(0, currentPaths.length - 1), currentPath];
        });
      }
    }
  }, []);

  const onDrawingEnd = useCallback(() => {
    drawingActiveRef.current = false;
  }, []);

  const touchHandler = useTouchHandler(
    {
      onActive: onDrawingActive,
      onStart: onDrawingStart,
      onEnd: onDrawingEnd,
    },
    [onDrawingActive, onDrawingStart]
  );

  return (
    <Canvas style={{ height, width }} onTouch={touchHandler}>
      {!autoReveal && <Scratcher height={height} width={width} />}
      <Mask
        mode="luminance"
        mask={
          <Group>
            {!autoReveal ? (
              paths.map((path, index) => {
                return (
                  <Path
                    key={`${path.toSVGString()}-${index}`}
                    path={path}
                    color={'white'}
                    style={'stroke'}
                    strokeWidth={brushSize}
                    invertClip
                  />
                );
              })
            ) : (
              <Rect borderRadius={20} x={0} y={0} width={width} height={height} color="white" />
            )}
          </Group>
        }>
        <ScratcherImage source={image} height={height} width={width} />
      </Mask>
    </Canvas>
  );
};

export default ScratchCard;
