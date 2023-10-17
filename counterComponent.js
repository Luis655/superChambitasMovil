
// CounterComponent.js
import React from 'react';
import { View, Text, Button } from 'react-native';
import { observer } from 'mobx-react-lite';
import counterStore from './counterStore';

const CounterComponent = observer(({navigation }) => {
  return (
    <View>
      <Text>Count: {counterStore.count}</Text>
      <Button title="Increment" onPress={() => counterStore.increment()} />
      <Button title="Decrement" onPress={() => counterStore.decrement()} />
      <Button
        title="Go to Detail Screen"
        onPress={() => navigation.navigate('Detail')}
      />
    </View>
  );
});

export default CounterComponent;
