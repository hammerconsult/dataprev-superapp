import React from 'react';
import { View, Platform } from 'react-native';
import { WebView } from 'react-native-webview';

const WebViewScreen = ({ route }) => {
  const { url } = route.params;

  if (Platform.OS === 'web') {
    return (
      <View style={{ flex: 1 }}>
        <iframe
          src={url}
          width="100%"
          height="100%"
          style={{ border: 'none' }}
          title="WebView"
        />
      </View>
    );
  }

  return <WebView source={{ uri: url }} style={{ flex: 1 }} />;
};

export default WebViewScreen;
