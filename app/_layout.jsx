import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="(home)" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen name="Leaderboard" options={{ headerShown: false }} />
      <Stack.Screen name="GameScreen" options={{ headerShown: false }} />
      <Stack.Screen name="logout" options={{ headerShown: false }} />
    </Stack>
  );
}
