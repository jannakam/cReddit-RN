import React from 'react'
import AppNavigator from './src/navigation/AppNavigator'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
    },
  },
})

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <AppNavigator />
      </QueryClientProvider>
    </GestureHandlerRootView>
  )
}

export default App
