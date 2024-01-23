import { View, Text, TouchableOpacity, Image, Animated, Dimensions } from "react-native";
import React, { useEffect, useRef } from "react";
import { FONTS } from "../constants/theme";
import Loading from "../svg/Loading";

export default function Button({ title, containerStyle, onPress, disabled = false, isLoading, }) {

    const width = Dimensions.get("window").width

    return (
        <View style={{ width, paddingHorizontal: 20, alignItems: 'center' }}>
            <TouchableOpacity
                style={disabled ? {
                    height: 56,
                    backgroundColor: '#3D195B',
                    borderRadius: 16,
                    justifyContent: "center",
                    alignItems: "center",
                    ...containerStyle,
                } :
                    {
                        height: 56,
                        backgroundColor: "#3D195B",
                        borderRadius: 16,
                        justifyContent: "center",
                        alignItems: "center",
                        ...containerStyle,
                    }
                }
                disabled={disabled}
                onPress={onPress}
            >
                <Text
                    style={{
                        color: "#fff",
                        fontSize: 18,
                        ...FONTS['700'],
                        textTransform: "capitalize",
                    }}
                >
                    {isLoading ? <Loading /> : title}
                </Text>
            </TouchableOpacity>
        </View>
    );
}
