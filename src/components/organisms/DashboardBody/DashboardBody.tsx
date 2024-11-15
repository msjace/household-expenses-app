'use client'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import { Chart } from 'react-chartjs-2'

import styles from './dashboardBody.module.css'

import { AnalyticsRangeSelector } from '@/components/organisms/DashboardRangeSelector/DashboardRangeSelector'
import { useAnalyticsRangeSearchParams } from '@/services/client/analytics/analytics'
import {
  aggregateAmountsByCategories,
  aggregateAmountsByDate,
  createDailyExpensesCategoriesPieData,
  createDailyExpensesChartData,
} from '@/services/client/analytics/dashboard_analytics'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

interface IDashboardBodyProps {
  expensesJson: string
  categoriesJson: string
}

export const DashboardBody: React.FC<IDashboardBodyProps> = (props) => {
  const expenses = JSON.parse(props.expensesJson)
  const categories = JSON.parse(props.categoriesJson)
  const {
    monthSelectOption,
    datePeriod,
    month,
    fromTo,
    setDatePeriod,
    setMonth,
    setFromTo,
  } = useAnalyticsRangeSearchParams(expenses)

  const expensesAmountByCategories = aggregateAmountsByCategories(
    expenses,
    categories,
    datePeriod,
    {
      date: month,
      fromTo,
    }
  )

  const { pieChartData, pieChartOptions } =
    createDailyExpensesCategoriesPieData(expensesAmountByCategories)

  const dailyTotalExpensesAmounts = aggregateAmountsByDate(
    expenses,
    datePeriod,
    {
      date: month,
      fromTo,
    }
  )

  const { chartData, chartOption } = createDailyExpensesChartData(
    dailyTotalExpensesAmounts,
    datePeriod
  )

  return (
    <div className={styles.container}>
      <div className={styles.rangeSelectorContainer}>
        <AnalyticsRangeSelector
          fromTo={[fromTo, setFromTo]}
          monthOptions={monthSelectOption.monthOptionsInfo}
          selectedDatePeriod={[datePeriod, setDatePeriod]}
          selectedMonth={[month, setMonth]}
        />
      </div>
      <div className={styles.canvasContainer}>
        <Chart data={pieChartData} options={pieChartOptions} type="pie" />
        <Chart data={chartData} options={chartOption} type="line" />
      </div>
    </div>
  )
}
