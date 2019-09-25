import { combineReducers } from 'redux';
import socialProducer from './socialProducer';

export default combineReducers({
    socials: socialProducer
});