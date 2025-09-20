import { Redirect, router } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function InitScreen() {
    return (
        <Redirect href="/home" />
    );
};