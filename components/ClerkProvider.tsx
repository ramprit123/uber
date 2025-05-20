import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import React from 'react';

export function withClerkProvider(AppComponent: React.ComponentType<any>) {
  return function ClerkWrappedApp(props: any) {
    return (
      <ClerkProvider tokenCache={tokenCache}>
        <AppComponent {...props} />
      </ClerkProvider>
    );
  };
}
