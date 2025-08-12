export interface PopupProps {
  open: boolean;
  title: string;
  message: string;
  onClose: () => void;
  success?: boolean;
  loading?: boolean;
}