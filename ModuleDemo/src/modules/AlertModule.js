import React, {PureComponent} from 'react';
import {
  DeviceEventEmitter,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Image,
  Pressable,
} from 'react-native';
import {Animated, Easing} from 'react-native';
import {useBlue} from 'src/util';

// type: 0: 普通alert 1:从下升起选择式 2:从下升起自定义式  3:cover loading

const defaultOptions = {
  type: -1,
};

class AlertModule extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      options: defaultOptions,
      backOpacity: new Animated.Value(0),
      popOffsetY: new Animated.Value(0),
    };
    this.loadingRef = React.createRef();
    this.alertRef = React.createRef();
    this.basePopRef = React.createRef();
    DeviceEventEmitter.addListener('alertShow', options => {
      this.setState({isShow: true});
      setTimeout(() => this.setState({isShow: true, options}), 0);
    });
    DeviceEventEmitter.addListener('alertHidden', this.hiddenAlert);
  }

  static show = (options = defaultOptions) => {
    DeviceEventEmitter.emit('alertShow', options);
  };

  static hidden = (options = defaultOptions) => {
    DeviceEventEmitter.emit('alertHidden', options);
  };

  hiddenAlert = () => {
    let {options} = this.state;
    switch (options.type) {
      case 0:
        return this.loadingRef.current.hidden(this.reset);
      case 1:
        return this.alertRef.current.hidden(this.reset);
      case 2:
        return this.basePopRef.current.hidden(this.reset);
      default:
        return null;
    }
  };

  reset = () => {
    this.setState({isShow: false, options: defaultOptions});
  };

  render() {
    let {isShow, backOpacity, options} = this.state;
    if (!isShow) {
      return null;
    }
    switch (options.type) {
      case 0:
        return <Loading ref={this.loadingRef} options={options} />;
      case 1:
        return <BaseAlert ref={this.alertRef} options={options} />;
      case 2:
        return <BasePop ref={this.basePopRef} options={options} />;
      default:
        return null;
    }
  }
}

class Loading extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      backOpacity: new Animated.Value(0),
    };
  }

  componentDidMount() {
    let {backOpacity} = this.state;
    Animated.timing(backOpacity, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }

  hidden = callBack => {
    let {backOpacity} = this.state;
    Animated.timing(backOpacity, {
      toValue: 0,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(callBack);
  };

  closeAlert = () => {
    AlertModule.hidden();
  };

  render() {
    let {backOpacity} = this.state;
    let {title, allowClose} = this.props.options;
    return (
      <View style={[styles.baseBack, styles.loadingBack]}>
        <Animated.View style={[styles.loadingView, {opacity: backOpacity}]}>
          <ActivityIndicator size={'large'} color={'white'} />
          {title && <Text style={styles.loadingText}>{title}</Text>}
          {allowClose && (
            <Pressable style={styles.cbBack} onPress={this.closeAlert}>
              <Image
                style={styles.cbImg}
                source={require('src/image/close_g.png')}
              />
            </Pressable>
          )}
        </Animated.View>
      </View>
    );
  }
}

class BaseAlert extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      backOpacity: new Animated.Value(0),
      popOffsetY: new Animated.Value(0),
    };
  }

  componentDidMount() {
    let {backOpacity, popOffsetY} = this.state;
    Animated.stagger(0, [
      Animated.timing(backOpacity, {
        toValue: 1,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(popOffsetY, {
        toValue: -20,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
  }

  hidden = callBack => {
    let {backOpacity, popOffsetY} = this.state;
    Animated.stagger(0, [
      Animated.timing(backOpacity, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(popOffsetY, {
        toValue: 0,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start(callBack);
  };

  renderButtons = buttons => {
    if (buttons?.length === 0) {
      return null;
    }
    return (
      <View style={styles.alertBtnArrBack}>
        {buttons.map((button, index) => {
          let {type, text, onPress} = button;
          let viewAddStyle = {};
          let textAddStyle = {};
          if (buttons.length === 1) {
            viewAddStyle.width = '100%';
          }
          if (buttons.length === 2) {
            if (index === 0) {
              viewAddStyle.borderRightColor = useBlue;
              viewAddStyle.borderRightWidth = 0.5;
            }
          }
          if (buttons.length > 2) {
            viewAddStyle.width = '100%';
            if (index < buttons.length - 1) {
              viewAddStyle.borderBottomColor = useBlue;
              viewAddStyle.borderBottomWidth = 0.5;
            }
          }
          if (type === 'cancel') {
            textAddStyle.color = 'red';
          }
          return (
            <Pressable
              key={index}
              style={[styles.alertBtnView, viewAddStyle]}
              onPress={() => {
                if (type === 'cancel') {
                  AlertModule.hidden();
                }
                onPress && onPress();
              }}>
              <Text style={[styles.alertBtnText, textAddStyle]}>{text}</Text>
            </Pressable>
          );
        })}
      </View>
    );
  };

  render() {
    let {backOpacity, popOffsetY} = this.state;
    let {title, detail, buttons} = this.props.options;
    return (
      <Animated.View
        style={[styles.baseBack, styles.alertBack, {opacity: backOpacity}]}>
        <Animated.View
          style={[styles.alertView, {transform: [{translateY: popOffsetY}]}]}>
          <View style={styles.alertTitleView}>
            <Text style={styles.alertTitleText}>{title}</Text>
          </View>
          <View style={styles.alertDetailView}>
            <Text style={styles.alertDetailText}>{detail}</Text>
          </View>
          {this.renderButtons(buttons)}
        </Animated.View>
      </Animated.View>
    );
  }
}

class BasePop extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      backOpacity: new Animated.Value(0),
      popOffsetY: new Animated.Value(0),
    };
    this.offSetY = 0;
  }

  componentDidMount() {
    let {backOpacity} = this.state;
    Animated.timing(backOpacity, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      this.setState({showPopView: true});
    });
  }

  setOffSetY = param => {
    let {nativeEvent} = param;
    let {popOffsetY} = this.state;
    if (this.offSetY !== 0) {
      return;
    }
    this.offSetY = nativeEvent?.layout?.height;
    setTimeout(() => {
      Animated.stagger(50, [
        Animated.timing(popOffsetY, {
          toValue: this.offSetY,
          duration: 0,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(popOffsetY, {
          toValue: 0,
          duration: 100,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]).start();
    }, 0);
  };

  hidden = callBack => {
    let {backOpacity, popOffsetY} = this.state;
    Animated.stagger(0, [
      Animated.timing(popOffsetY, {
        toValue: this.offSetY,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(backOpacity, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start(callBack);
  };

  renderComponent = () => {
    let {diyComponent} = this.props.options;
    if (diyComponent) {
      return diyComponent;
    } else {
      return this.renderPopChoose();
    }
  };

  renderPopChoose = () => {
    let {buttons} = this.props.options;
    return (
      <View style={styles.popBtnBack}>
        {buttons.map((button, index) => {
          let {type, text, onPress} = button;
          let viewAddStyle = {};
          let textAddStyle = {};
          if (type === 'cancel') {
            viewAddStyle.marginTop = 10;
            viewAddStyle.borderRadius = 10;
            textAddStyle.color = 'red';
          } else {
            if (index === 0) {
              viewAddStyle.borderTopRightRadius = 10;
              viewAddStyle.borderTopLeftRadius = 10;
            }
            if (index === buttons.length - 2) {
              viewAddStyle.borderBottomRightRadius = 10;
              viewAddStyle.borderBottomLeftRadius = 10;
            }
            if (index < buttons.length - 2) {
              viewAddStyle.borderBottomWidth = 0.5;
              viewAddStyle.borderBottomColor = useBlue;
            }
          }
          return (
            <Pressable
              key={index}
              style={[styles.popBtnView, viewAddStyle]}
              onPress={() => {
                if (type === 'cancel') {
                  AlertModule.hidden();
                }
                onPress && onPress();
              }}>
              <Text style={[styles.popBtnText, textAddStyle]}>{text}</Text>
            </Pressable>
          );
        })}
      </View>
    );
  };

  render() {
    let {backOpacity, popOffsetY} = this.state;
    return (
      <Animated.View
        style={[
          styles.baseBack,
          styles.alertBack,
          {
            justifyContent: 'flex-end',
            opacity: backOpacity,
          },
        ]}>
        <Pressable
          style={styles.popBack}
          onPress={() => AlertModule.hidden()}
        />
        <Animated.View
          onLayout={this.setOffSetY}
          style={[styles.popView, {transform: [{translateY: popOffsetY}]}]}>
          {this.renderComponent()}
        </Animated.View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  baseBack: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  /* ——————— loading ——————— */
  loadingBack: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingView: {
    width: 120,
    height: 120,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.618)',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: 'white',
  },
  cbBack: {
    position: 'absolute',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    right: -5,
    top: -5,
  },
  cbImg: {
    width: 15,
    height: 15,
    tintColor: 'white',
  },
  /* ——————— alert ——————— */
  alertBack: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertView: {
    width: '70%',
    borderRadius: 10,
    backgroundColor: 'white',
  },
  alertTitleView: {
    width: '100%',
    borderBottomWidth: 0.5,
    borderBottomColor: useBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertTitleText: {
    fontSize: 18,
    color: useBlue,
    margin: 10,
  },
  alertDetailView: {
    width: '100%',
    borderBottomWidth: 0.5,
    borderBottomColor: useBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertDetailText: {
    fontSize: 14,
    color: useBlue,
    margin: 10,
  },
  alertBtnArrBack: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  alertBtnView: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertBtnText: {
    fontSize: 16,
    color: useBlue,
    margin: 10,
  },
  /* ——————— basePop ——————— */
  popBack: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  popView: {
    width: '100%',
    justifyContent: 'flex-end',
  },
  popBtnBack: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  popBtnView: {
    width: '96%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  popBtnText: {
    fontSize: 18,
    color: useBlue,
    margin: 12,
  },
});

export default AlertModule;
