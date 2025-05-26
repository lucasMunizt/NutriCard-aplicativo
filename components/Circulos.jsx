import { Text, View, Keyboard } from "react-native";
import { useState, useEffect } from "react";
import { Image, StyleSheet, TextInput, Pressable } from "react-native";
export default function Circulos({valorCirculo, textoCirulo}) {
    return(
        
            <Text
                style={{
                    width: 105,
                    height: 105,
                    textAlign: "center",
                    color: "black",
                    padding: 10,
                    borderRadius: 110,
                    backgroundColor: "rgba(255, 255, 255, 0.6)",
                    textAlignVertical: "center",
                    marginTop: 30,
                    fontWeight: 500,
                    borderWidth: 2,
                    borderColor: "#05cdff",
                }}
                >{valorCirculo}{"\n"}{textoCirulo}
            </Text>
        
    )
}