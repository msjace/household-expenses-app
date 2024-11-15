import { useMemo } from 'react'

import styles from './dashboardRangeSelector.module.css'

import type { IFromTo } from '@/common/interfaces/time'
import type { IMonthOption } from '@/services/client/analytics/analytics'

import { DatePeriod } from '@/services/client/analytics/analytics'

type UseState<T> = [T, (value: T) => void]

interface IAnalyticsRangeSelector {
  className?: string
  children?: React.ReactNode
  monthOptions: IMonthOption[]
  selectedDatePeriod: UseState<DatePeriod>
  selectedMonth: UseState<string>
  fromTo: UseState<IFromTo>
  disabledDatePeriod?: { [key in DatePeriod]?: boolean }
}

export const AnalyticsRangeSelector: React.FC<IAnalyticsRangeSelector> = (
  props
) => {
  const setFromTo = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: 'from' | 'to'
  ): void => props.fromTo[1]({ ...props.fromTo[0], [key]: e.target.value })

  const datePeriods: [DatePeriod, string][] = useMemo(
    () => [
      [DatePeriod.EVERY_MONTH, 'Every Month'],
      [DatePeriod.SPECIFIED_PERIOD, 'Specified Period'],
    ],
    []
  )

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        {props.children && (
          <div className={styles.children}>{props.children}</div>
        )}
        <div className={styles.selectContainer}>
          <label htmlFor="period" className={styles.label}>
            Period
          </label>
          <select
            id="period"
            className={styles.select}
            value={props.selectedDatePeriod[0]}
            onChange={(e): void =>
              props.selectedDatePeriod[1](e.target.value as DatePeriod)
            }
          >
            {datePeriods.map(([value, label]) => (
              <option
                key={value}
                disabled={props.disabledDatePeriod?.[value]}
                value={value}
                className={styles.option}
              >
                {label}
              </option>
            ))}
          </select>
          {props.selectedDatePeriod[0] === DatePeriod.EVERY_MONTH && (
            <>
              <label htmlFor="month" className={styles.label}>
                Month
              </label>
              <select
                id="month"
                className={`${styles.select} ${styles.marginTop}`}
                value={props.selectedMonth[0]}
                onChange={(e): void => props.selectedMonth[1](e.target.value)}
              >
                {props.monthOptions.map((option) => (
                  <option
                    key={option.key}
                    value={option.value}
                    className={styles.option}
                  >
                    {option.content}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>
      </div>
      {props.selectedDatePeriod[0] === DatePeriod.SPECIFIED_PERIOD && (
        <div className={styles.dateRangeContainer}>
          <div className={styles.dateInputContainer}>
            <label htmlFor="from" className={styles.label}>
              FROM
            </label>
            <input
              id="from"
              type="date"
              className={styles.dateInput}
              value={props.fromTo[0].from}
              onChange={(e): void => setFromTo(e, 'from')}
            />
          </div>
          <div className={styles.dateInputContainer}>
            <label htmlFor="to" className={styles.label}>
              TO
            </label>
            <input
              type="date"
              id="to"
              className={styles.dateInput}
              value={props.fromTo[0].to}
              onChange={(e): void => setFromTo(e, 'to')}
            />
          </div>
        </div>
      )}
    </div>
  )
}
