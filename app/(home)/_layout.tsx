import { Stack } from "expo-router";
import Header from "../components/Header";
import LoadingOverlay from "../components/Loading";

export default () => {
  return (
    <>
      <LoadingOverlay />
      <Header />
      <Stack screenOptions={{ headerShown: false, animation: "none" }}>
        <Stack.Screen name="index"/>
      </Stack>
    </>
  );
}