export interface ListTemplateInterface {
  section: string;
  label: string;
  listFields: ListField[];
}

interface ListField {
  field: string;
  keys: keyValue[];
}

interface keyValue {
  key: string;
  extras?: PipeExtra;
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
