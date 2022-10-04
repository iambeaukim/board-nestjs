import { convert, LocalDateTime, nativeJs } from '@js-joda/core';
import { ValueTransformer } from 'typeorm';

export class LocalDateTimeTransformer implements ValueTransformer {
  to(entityValue: LocalDateTime): Date {
    return convert(entityValue).toDate();
  }

  from(databaseValue: Date): LocalDateTime {
    return LocalDateTime.from(nativeJs(databaseValue));
  }
}
