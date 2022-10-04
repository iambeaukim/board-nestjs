import { ValueTransformer } from 'typeorm';
import { convert, LocalDate, nativeJs } from '@js-joda/core';

export class LocalDateTransformer implements ValueTransformer {
  to(entityValue: LocalDate): Date {
    return convert(entityValue).toDate();
  }

  from(databaseValue: Date): LocalDate {
    return LocalDate.from(nativeJs(databaseValue));
  }
}
