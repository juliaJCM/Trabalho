import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

const DrawerContent = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        {/* Custom Header */}
        <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Drawer Header</Text>
        </View>

        {/* Drawer Items */}
        <DrawerItemList {...props} />

        {/* Custom Footer */}
        <View style={{ padding: 16, borderTopWidth: 1, borderTopColor: '#ccc' }}>
          <TouchableOpacity onPress={() => console.log('Custom action pressed')}>
            <Text style={{ fontSize: 16, color: '#6052b7' }}>Custom Action</Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default DrawerContent;
