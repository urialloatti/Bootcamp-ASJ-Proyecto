export interface ModalRedirectInterface {
  message: string;
  path: string;
}

export interface ModalConfirmInterface {
  header: string;
  message: string;
  confirm: string;
  cancel: string;
}

export interface ModalMessageInterface {
  message: string;
  confirm: string;
}
