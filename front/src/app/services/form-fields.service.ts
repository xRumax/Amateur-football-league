import { Injectable } from '@angular/core';
import { FormField } from '../app.component';

@Injectable({
  providedIn: 'root',
})
export class FormFieldsService {
  constructor() {}

  generateFields(config: any[]): FormField[] {
    return config.map((fieldConfig) => ({
      ...fieldConfig,
      value: '',
    }));
  }

  filterFieldsByNames(fields: FormField[], names: string[]): FormField[] {
    return fields.filter((field) => names.includes(field.name));
  }
}
