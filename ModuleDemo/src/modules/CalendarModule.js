import React, {PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Animated,
  Easing,
} from 'react-native';
import {useBlue, devicesWidth} from 'src/util';
import {getYearData, dayArrShowFix, getOffSet} from './CalenderTools';

const dayWidth = (devicesWidth - 71) / 21;
const monthHeight = dayWidth * 7 + 30;
const monthWidth = (devicesWidth - 40) / 3;
const moduleHeight = monthHeight * 4 + 100;

class CalendarModule extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      yearData: getYearData(),
      scale: new Animated.Value(1),
      scaleOffSetX: new Animated.Value(0),
      scaleOffSetY: new Animated.Value(1),
    };
  }

  tapMonthView = monthIndex => {
    let {scale, scaleOffSetX, scaleOffSetY} = this.state;
    let toScale = devicesWidth / monthWidth;
    let {toOffSetX, toOffSetY} = getOffSet(monthIndex, monthWidth, monthHeight);
    Animated.stagger(0, [
      Animated.timing(scale, {
        toValue: toScale,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(scaleOffSetX, {
        toValue: toOffSetX,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(scaleOffSetY, {
        toValue: toOffSetY,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
  };

  renderMonthArr = monthArr => {
    return (
      <View style={styles.monthArrBack}>
        {monthArr.map((monthData, monthIndex) => {
          let {monthNum, dayArr} = monthData;
          return (
            <Pressable
              key={monthIndex}
              style={styles.monthView}
              onPress={() => this.tapMonthView(monthIndex)}>
              <Text style={styles.monthNum}>{monthNum}月</Text>
              {dayArr && dayArr?.length > 0 && this.renderDayArr(dayArr)}
            </Pressable>
          );
        })}
      </View>
    );
  };

  renderDayArr = dayArr => {
    let showDayArr = dayArrShowFix(dayArr);
    return (
      <View style={styles.dayArrBar}>
        {showDayArr.map((dayData, dayIndex) => {
          let {date, isChoose} = dayData;
          let viewAddStyle = {};
          let numAddStyle = {};
          if (isChoose) {
            viewAddStyle.borderRadius = 7.5;
            viewAddStyle.backgroundColor = 'red';
            numAddStyle.color = 'white';
          }
          return (
            <View key={dayIndex} style={[styles.dayView, viewAddStyle]}>
              {date > -1 && (
                <Text style={[styles.dayNum, numAddStyle]}>
                  {dayData?.date}
                </Text>
              )}
            </View>
          );
        })}
      </View>
    );
  };

  render() {
    let {yearData} = this.state;
    let {scaleOffSetX, scaleOffSetY, scale} = this.state;
    return (
      <View style={styles.container}>
        <Animated.View
          style={{
            flex: 1,
            transform: [
              {scale: scale},
              {translateX: scaleOffSetX},
              {translateY: scaleOffSetY},
            ],
          }}>
          <View style={styles.yearHeader}>
            <Text style={styles.yearText}>{yearData.year}年</Text>
          </View>
          {yearData?.monthArr &&
            yearData?.monthArr.length > 0 &&
            this.renderMonthArr(yearData.monthArr)}
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: devicesWidth,
    height: moduleHeight,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  yearHeader: {
    borderBottomWidth: 0.5,
    borderBottomColor: useBlue,
    marginHorizontal: 20,
  },
  yearText: {
    fontSize: 30,
    color: 'red',
    fontWeight: 'bold',
    marginVertical: 8,
  },
  monthArrBack: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingBottom: 40,
    paddingTop: 5,
    paddingHorizontal: 20,
  },
  monthView: {
    width: monthWidth,
    height: monthHeight,
    padding: 5,
  },
  monthNum: {
    fontSize: 20,
    color: useBlue,
    fontWeight: 'bold',
  },
  dayArrBar: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayView: {
    width: dayWidth,
    height: dayWidth,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  dayNum: {
    fontSize: 10,
    color: useBlue,
  },
});

export default CalendarModule;
