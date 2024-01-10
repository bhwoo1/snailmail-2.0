import { atom } from 'recoil';
import { LetterData } from '../Type';

export const letterState = atom({
  key: 'letterState',
  default: [] as LetterData[],
});