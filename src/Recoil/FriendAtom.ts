
import { atom } from 'recoil';
import { User } from '../Type';

export const friendState = atom({
  key: 'friendState',
  default: [] as User[],
});

export const friendLengthState = atom({
  key: 'friendLengthState',
  default: 0,
});


