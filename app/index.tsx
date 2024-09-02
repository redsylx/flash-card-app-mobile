// app/index.tsx
import { Text, View, Button } from "react-native";
import { useRouter } from "expo-router";

export default function HomePage() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Go to Login Page" onPress={() => router.push("/login")} />
    </View>
  );
}
