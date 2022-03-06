export interface ToastConfig {
  type?: 'success' | 'error';
  message: string;
  action?: string;
  duration?: number;
}
