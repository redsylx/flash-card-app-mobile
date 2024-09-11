import { router, Stack } from "expo-router";
import Header from "../components/Header";
import LoadingOverlay from "../components/Loading";
import { useAccount } from "@/store";
import { useEffect } from "react";

export default () => {
  return (
    <>
    <LoadingOverlay/>
    <Header/>
    <Stack screenOptions={{ headerShown: false, animation: "none" }}/>
    </>
  );
}