import { StyleSheetTestUtils } from 'aphrodite';

const aphroditeAfterEach = () =>
  // Added to handle async style injection from Aphrodite
  // https://github.com/Khan/aphrodite/issues/62
  new Promise((resolve: any) => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    return process.nextTick(resolve);
  });

export default aphroditeAfterEach;
