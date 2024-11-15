import { useMemo } from 'react'

import dayjs from 'dayjs'
import {
  parseAsString,
  parseAsStringEnum,
  parseAsStringLiteral,
  useQueryStates,
} from 'nuqs'

import type { IExpense } from '@/common/interfaces/expense'
import type { IFromTo } from '@/common/interfaces/time'
import type { Dayjs } from 'dayjs'

export enum DatePeriod {
  EVERY_MONTH = 'EVERY_MONTH',
  SPECIFIED_PERIOD = 'SPECIFIED_PERIOD',
}

export interface IMonthOption {
  key: string
  value: string
  content: string
}

export interface Duration {
  start: Dayjs
  end: Dayjs
}

const getOldestAndNewestDate = (
  dates: string[]
): {
  oldest: string
  newest: string
} => {
  if (dates.length === 0) return { oldest: '', newest: '' }

  let oldestDate = new Date(dates[0])
  let newestDate = new Date(dates[0])

  for (const item of dates) {
    const currentDate = new Date(item)
    if (currentDate < oldestDate) {
      oldestDate = currentDate
    }
    if (currentDate > newestDate) {
      newestDate = currentDate
    }
  }

  return {
    oldest: oldestDate.toISOString().split('T')[0],
    newest: newestDate.toISOString().split('T')[0],
  }
}

interface IMonthSelectOption {
  selectableMonths: string[]
  monthOptionsInfo: IMonthOption[]
  selectedMonth: string
}

const getMonthSelectOptions = (
  firstDate: string | null,
  lastDate: string | null
): IMonthSelectOption => {
  if (firstDate === null || lastDate === null) {
    return {
      selectableMonths: [],
      monthOptionsInfo: [],
      selectedMonth: '',
    }
  }
  const options: { [year: number]: number[] } = {}

  const monthCount =
    (new Date(lastDate).getFullYear() - new Date(firstDate).getFullYear()) *
      12 +
    new Date(lastDate).getMonth() -
    new Date(firstDate).getMonth() +
    1

  for (let i = 0; i < monthCount; i++) {
    const date = new Date(
      new Date(firstDate).getFullYear(),
      new Date(firstDate).getMonth() + i
    )
    const year = date.getFullYear()
    const month = date.getMonth() + 1

    if (!(year in options)) {
      options[year] = []
    }
    options[year].push(month)
  }

  const getOptionId = (year: number, month: number): string =>
    `${year}-${month.toString().padStart(2, '0')}-01`

  const lastValue = (() => {
    const lastYear = new Date(lastDate).getFullYear()
    const lastMonth = new Date(firstDate).getMonth() + 1
    return getOptionId(lastYear, lastMonth)
  })()

  const availableYears = Object.keys(options).map(Number)
  const availableMonths = availableYears.flatMap((year) =>
    options[year].map((month) => getOptionId(year, month))
  )

  const monthOptionsInfo = availableYears
    .map((year) => {
      const monthOptions = options[year].map((month) => ({
        key: getOptionId(year, month),
        value: getOptionId(year, month),
        content: `${year}/${month.toString().padStart(2, '0')}`,
      }))
      return monthOptions
    })
    .flat()

  return {
    selectableMonths: availableMonths,
    monthOptionsInfo,
    selectedMonth: lastValue,
  }
}

interface IAnalyticsRangeWithSearchParams {
  monthSelectOption: IMonthSelectOption
  datePeriod: DatePeriod
  month: string
  fromTo: IFromTo
  setDatePeriod: (value: DatePeriod) => void
  setMonth: (value: string) => void
  setFromTo: (value: IFromTo) => void
  rangeQuery: string
}

const useAnalyticsRange = (
  monthSelectOption: IMonthSelectOption
): IAnalyticsRangeWithSearchParams => {
  const { selectableMonths, selectedMonth } = monthSelectOption

  const defaultDateInfo = useMemo(() => {
    const initFromTo = { from: '', to: '' }
    return {
      datePeriod: DatePeriod.EVERY_MONTH,
      month: selectedMonth,
      from: initFromTo.from,
      to: initFromTo.to,
    }
  }, [selectedMonth])

  const [params, setParams] = useQueryStates(
    {
      datePeriod: parseAsStringEnum<DatePeriod>(
        Object.values(DatePeriod)
      ).withDefault(defaultDateInfo.datePeriod),
      month: parseAsStringLiteral(selectableMonths).withDefault(
        defaultDateInfo.month
      ),
      from: parseAsString.withDefault(defaultDateInfo.from),
      to: parseAsString.withDefault(defaultDateInfo.to),
    },
    {
      clearOnDefault: true,
    }
  )

  const setDatePeriod = (value: DatePeriod): void => {
    setParams({
      datePeriod: value,
      month: defaultDateInfo.month,
      from: defaultDateInfo.from,
      to: defaultDateInfo.to,
    })
  }

  const setMonth = (value: string): void => {
    setParams({ month: value })
  }

  const setFromTo = (value: IFromTo): void => {
    setParams({ from: value.from, to: value.to })
  }

  const rangeQuery = useMemo(() => {
    const searchParams = new URLSearchParams()

    if (params.datePeriod !== defaultDateInfo.datePeriod) {
      searchParams.set('datePeriod', params.datePeriod)
    }
    if (params.datePeriod === DatePeriod.EVERY_MONTH) {
      searchParams.set('month', params.month)
    }
    if (params.from) searchParams.set('from', params.from)
    if (params.to) searchParams.set('to', params.to)

    return searchParams.toString()
  }, [params, defaultDateInfo.datePeriod])

  return {
    monthSelectOption,
    datePeriod: params.datePeriod,
    month: params.month,
    fromTo: {
      from: params.from,
      to: params.to,
    },
    setDatePeriod,
    setMonth,
    setFromTo,
    rangeQuery,
  }
}

export const useAnalyticsRangeSearchParams = (
  expenses: IExpense[]
): IAnalyticsRangeWithSearchParams => {
  const dates = expenses.map((expense) => expense.date)
  const result = getOldestAndNewestDate(dates)
  const monthSelectOption = getMonthSelectOptions(result.oldest, result.newest)
  return useAnalyticsRange(monthSelectOption)
}

export const getDatePeriodDuration = (
  datePeriodType: DatePeriod,
  target: {
    date: string
    fromTo: IFromTo
  }
): Duration | null => {
  if (datePeriodType === DatePeriod.EVERY_MONTH) {
    if (target.date === '') {
      return null
    }
    return {
      start: dayjs(target.date).startOf('month'),
      end: dayjs(target.date).endOf('month'),
    }
  }

  if (target.fromTo.from === '' || target.fromTo.to === '') {
    return null
  }
  return {
    start: dayjs(target.fromTo.from),
    end: dayjs(target.fromTo.to).endOf('day'),
  }
}

const generateRandomHexColor = (): string => {
  const hex = Math.floor(Math.random() * 0xffffff).toString(16)
  return `#${hex.padStart(6, '0')}`
}

export const generateRandomColorArray = (length: number): string[] => {
  return Array.from({ length }, generateRandomHexColor)
}
