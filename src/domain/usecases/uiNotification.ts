export interface UiNotification {
  info(message: React.ReactNode): void;
  success(message: React.ReactNode): void;
  error(message: React.ReactNode): void;
  warning(message: React.ReactNode): void;
}
