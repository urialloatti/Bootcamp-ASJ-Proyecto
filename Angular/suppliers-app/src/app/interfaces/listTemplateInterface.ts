export interface ListTemplateInterface {
  section: string;
  label: string;
  listFields: ListField[];
}

interface ListField {
  field: string;
  keys: keyValue[];
}

export interface keyValue {
  key: string;
  extras?: PipeExtra;
  isNumeric: boolean;
}

export type PipeExtra =
  | 'contactMails'
  | 'contactName'
  | 'contactPhone'
  | 'CUIT'
  | 'Currency'
  | 'FullDate'
  | 'Date'
  | 'PurchaseOrder'
  | 'phone';
