
// CounterComponent.js
import React from 'react';
import { View, Text, Button } from 'react-native';
import { observer } from 'mobx-react-lite';
import counterStore from '../viewModels/counterStore';

const CounterComponent = observer(({ navigation }) => {
  return (
    <View>
      <Text>Count: {counterStore.count}</Text>
      <Button title="Increment" onPress={() => counterStore.increment()} />
      <Button title="Decrement" onPress={() => counterStore.decrement()} />
      <Button
        title="Go to Detail Screen"
        onPress={() => navigation.navigate('Detail')}
      />
      <Button
        title="Go to worker screen"
        onPress={() => navigation.navigate('WorkerLogin')}
      />

<Button
        title="Go to worker screen"
        onPress={() => navigation.navigate('WorkerRegister')}
      />
    </View>
  );
});

export default CounterComponent;
