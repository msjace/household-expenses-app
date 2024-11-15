import dayjs from 'dayjs'
import { Timestamp } from 'firebase/firestore'

export class Time {
  public static nowTimestamp(): Timestamp {
    return Timestamp.now()
  }

  public static dateFormat(timestamp: Timestamp, format = 'YYYY/M/D'): string {
    return dayjs.unix(timestamp.seconds).format(format)
  }

  public static DatetimeLocalFormat(): string {
    return dayjs().format('YYYY-MM-DD')
  }
}
