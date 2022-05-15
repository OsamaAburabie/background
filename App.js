import {View, Text, Button} from 'react-native';
import React from 'react';
import {useMMKVObject, useMMKVBoolean} from 'react-native-mmkv';
import dayjs from 'dayjs';
const App = () => {
  const [timer, setTimer] = useMMKVObject('timers');
  const [running, setRunning] = useMMKVBoolean('paused');

  let duration = dayjs(timer.now).subtract(timer.start);

  // console.log(timer.now);

  React.useEffect(() => {
    if (!timer) {
      setTimer({
        start: 0,
        now: 0,
      });
    }
  }, []);

  React.useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setTimer({
        ...timer,
        now: timer.now + 100,
      });
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [timer, running]);

  const now = new Date().getTime();

  const start = () => {
    if (!timer) {
      setTimer({
        start: now,
        now: now,
      });
    }
  };

  const toggle = () => {
    setRunning(!running);
  };

  function diff(dt2, dt1) {
    var diffHours = (dt2 - dt1) / 1000;
    diffHours /= 60 * 60;

    var diffMinutes = (dt2 - dt1) / 1000;
    diffMinutes /= 60;

    var diffSeconds = (dt2 - dt1) / 1000;

    return {
      hours: Math.floor(diffHours),
      minutes: Math.floor(diffMinutes % 60),
      seconds: Math.floor(diffSeconds % 60),
    };
  }

  return (
    <View>
      <Text>
        {diff(timer.now, timer.start).hours}:
        {diff(timer.now, timer.start).minutes}:
        {diff(timer.now, timer.start).seconds}
      </Text>
      <Button title="start" onPress={start} />
      <Button title={`${running ? 'pause' : 'resume'}`} onPress={toggle} />
    </View>
  );
};

export default App;
