export interface ListTemplateInterface {
    section: string,
    label: string,
    listFields: ListField[]
}

interface ListField {
    field: string,
    key: string
}

