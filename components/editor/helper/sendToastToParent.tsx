export type ToastType = 'success' | 'error' | 'info' | 'warning';

export const sendToastToParent = (
  message: string,
  type: ToastType = 'success'
) => {
  if (typeof window !== 'undefined') {
    window.parent.postMessage(
      {
        action: 'notificationToster',
        message,
        type,
      },
      '*'
    );
  }
};
