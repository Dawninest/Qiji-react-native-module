import {Dimensions} from 'react-native';

const useBlue = 'rgb(20,68,106)';

const clone = obj => JSON.parse(JSON.stringify(obj));

const devicesWidth = Dimensions.get('window').width;

export {useBlue, clone, devicesWidth};
