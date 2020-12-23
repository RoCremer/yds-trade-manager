import axios from 'axios';
import { IHistory } from '@typings/index';

export const userAgent = () => {
  return window.navigator.userAgent.toLowerCase();
};

export const isChrome = () => {
  const ua = userAgent();
  return /chrome|crios/.test(ua) && !/edge|opr\//.test(ua);
};

export const isBrave = async () => {
  let isBrave = false;
  try {
    const response = await axios.get('https://api.duckduckgo.com/?q=useragent&format=json');
    isBrave = response.data['Answer'].includes('Brave');
  } catch {
    // Keep isBrave false
  }
  return isChrome && isBrave;
};

/**
 * Opens a new window/tab for target route if modifier key has been pressed.
 * @param clickEvent OnClick event object from react onClick method.
 * @param route Route to open a new window/tab
 * @param history React Router's browser history object
 */
export const handleCtrlClick = (clickEvent: any, route: string, history: IHistory) => {
  if (clickEvent.shiftKey || clickEvent.ctrlKey || clickEvent.metaKey) {
    return window.open(route, '_blank');
  }

  history && history.push(route);
};
