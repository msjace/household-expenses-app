import dayjs from 'dayjs'

import type { ICategory } from '@/common/interfaces/category'
import type { IExpense } from '@/common/interfaces/expense'
import type { IFromTo } from '@/common/interfaces/time'
import type { Duration } from '@/services/client/analytics/analytics'
import type { ChartData, ChartOptions } from 'chart.js'

import {
  DatePeriod,
  generateRandomColorArray,
  getDatePeriodDuration,
} from '@/services/client/analytics/analytics'

interface AmountByCategory {
  category_id: string
  amount: number
}

interface AmountByCategoryName {
  category_name: string
  amount: number
}

export const aggregateAmountsByCategories = (
  expenses: IExpense[],
  categories: ICategory[],
  datePeriodType: DatePeriod,
  target: {
    date: string
    fromTo: IFromTo
  }
): AmountByCategoryName[] => {
  const duration = getDatePeriodDuration(datePeriodType, target)
  if (!duration) return []

  const { start, end }: Duration = duration

  const filteredData = expenses.filter(({ date }) => {
    const currentDate = dayjs(date)
    return (
      (currentDate.isAfter(start) || currentDate.isSame(start)) &&
      (currentDate.isBefore(end) || currentDate.isSame(end))
    )
  })

  const amountByCategories: AmountByCategory[] = Object.values(
    filteredData.reduce(
      (acc: { [key: string]: AmountByCategory }, { amount, category_id }) => {
        if (!(category_id in acc)) {
          acc[category_id] = { category_id: category_id, amount }
        } else {
          acc[category_id].amount += amount
        }
        return acc
      },
      {} as { [category_id: number]: AmountByCategory }
    )
  )

  const result = amountByCategories.map((v) => {
    const category = categories.find((cat) => cat.id === v.category_id)
    return {
      category_name: category ? category.name : 'Unknown',
      amount: v.amount,
    }
  })
  return result
}

export const createDailyExpensesCategoriesPieData = (
  data: AmountByCategoryName[]
) => {
  const randomColors = generateRandomColorArray(data.length)
  const pieChartData: ChartData = {
    labels: data.map((v) => v.category_name),
    datasets: [
      {
        type: 'pie',
        data: data.map((v) => v.amount),
        backgroundColor: randomColors,
      },
    ],
  }
  const pieChartOptions: ChartOptions = {
    responsive: true,
    aspectRatio: 2 / 1,
    plugins: {
      title: {
        display: true,
        font: { size: 18 },
        text: `Daily Expenses by Categories`,
      },
    },
  }

  return { pieChartData, pieChartOptions }
}

interface DailyAmount {
  date: string
  amount: number
}

interface DailyTotalAmount {
  date: string
  total: number
}

export const aggregateAmountsByDate = (
  expenses: IExpense[],
  datePeriodType: DatePeriod,
  target: {
    date: string
    fromTo: IFromTo
  }
): DailyTotalAmount[] => {
  const dailyAmount: DailyAmount[] = expenses.map(({ date, amount }) => ({
    date,
    amount,
  }))

  const duration = getDatePeriodDuration(datePeriodType, target)
  if (!duration) return []

  const { start, end }: Duration = duration

  const filteredData = dailyAmount.filter(({ date }) => {
    const currentDate = dayjs(date)
    return (
      (currentDate.isAfter(start) || currentDate.isSame(start)) &&
      (currentDate.isBefore(end) || currentDate.isSame(end))
    )
  })

  const totalDateAmounts: DailyTotalAmount[] = Object.values(
    filteredData.reduce((acc, { date, amount }) => {
      if (!(date in acc)) {
        acc[date] = { date, total: amount }
      } else {
        acc[date].total += amount
      }
      return acc
    }, {} as { [date: string]: DailyTotalAmount })
  )
  return totalDateAmounts.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )
}

export const createDailyExpensesChartData = (
  expenses: DailyTotalAmount[],
  selectedDatePeriod: string
) => {
  const title = (() => {
    if (expenses.length <= 0) return ''
    if (selectedDatePeriod === DatePeriod.EVERY_MONTH) {
      const [year, month] = expenses[0].date.split('-')
      return `${year}/${month} (Daily Exist Data)`
    }
    const start = expenses[0].date.split('-')
    const end = expenses[expenses.length - 1].date.split('-')
    return `${start[0]}/${start[1]}/${start[2]} - ${end[0]}/${end[1]}/${end[2]} (Daily Exist Data)`
  })()

  const chartData: ChartData = {
    labels: expenses.map((v) =>
      v.date
        .replace(/ \(.*\)$/, '')
        .replace(/^\d+?-/, '')
        .replace('-', '/')
    ),
    datasets: [
      {
        label: 'Daily Total Amount',
        data: expenses.map((v) => v.total),
        borderColor: '#7370f7',
        backgroundColor: '#7370f7',
        fill: false,
        tension: 0.4,
      },
    ],
  }

  const chartOption: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        font: { size: 20 },
        text: title,
      },
    },
  }

  return { chartData, chartOption }
}
