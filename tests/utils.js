// Alert is an arbitrary choice
import {Alert} from 'bootstrap';

export const [major, minor] = Alert.VERSION.split('.');
export const majorMinor = `${major}.${minor}`;
