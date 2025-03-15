export interface UiNotification {
  info(message: React.ReactNode): void;
  error(message: React.ReactNode): void;
}
