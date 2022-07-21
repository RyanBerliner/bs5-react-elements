// Alert is an arbitrary choice
import {Alert} from 'bootstrap';

const [maj, min] = Alert.VERSION.split('.');
export const major = parseInt(maj);
export const minor = parseInt(min);
export const majorMinor = `${major}.${minor}`;
