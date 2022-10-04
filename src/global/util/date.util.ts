import { DateTimeFormatter, LocalDateTime } from '@js-joda/core';

export class DateUtil {
  private static DATE_FORMATTER = DateTimeFormatter.ofPattern('yyyy-MM-dd');
  private static DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern('yyyy-MM-dd HH:mm:ss');

  static toLocalDateTimeBy(strDate: string): LocalDateTime {
    if (!strDate) {
      return null;
    }

    return LocalDateTime.parse(strDate, DateUtil.DATE_TIME_FORMATTER);
  }
}
