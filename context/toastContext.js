import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ToastContext } from './../constants/data';
import { View, Text, Dimensions, Animated } from 'react-native'; // Import Animated module

export default function ToastProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [counter, setCounter] = useState(5);
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initialize fade animation value

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 0.9,
      duration: 500, // Adjust duration as needed
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500, // Adjust duration as needed
      useNativeDriver: true,
    }).start(() => setIsOpen(false));
  };

  const openDialog = useCallback(({ title }) => {
    setTitle(title);
    setCounter(5);
    setIsOpen(true);
    fadeIn(); // Trigger fade-in animation
    setTimeout(() => {
      fadeOut(); // Trigger fade-out animation after the appropriate interval
    }, 3500);
  }, []);

  const closeDialog = () => {
    fadeOut(); // Trigger fade-out animation when closing dialog
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((counter) => {
        if (counter < 2) {
          clearInterval(interval);
          closeDialog(); // Close dialog when counter reaches 1
        }
        return counter - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [title]);

  return (
    <ToastContext.Provider value={{ openDialog, closeDialog }}>
      <View style={{ flex: 1 }}>
        {isOpen && (
          <Animated.View
            style={{
              width: Dimensions.get("window").width,
              position: "absolute",
              zIndex: 1000000000000000000000000,
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              top: Dimensions.get("window").height - 70,
              opacity: fadeAnim, // Set opacity based on animated value
            }}
          >
            <View
              style={{
                flex: 0.5,
                paddingHorizontal: 30,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
                width: "70%",
                height: 40,
                backgroundColor: "#272829",
              }}
            >
              <Text style={{ color: "#ffffff" }}>{title}</Text>
            </View>
          </Animated.View>
        )}

        {children}
      </View>
    </ToastContext.Provider>
  );
}
