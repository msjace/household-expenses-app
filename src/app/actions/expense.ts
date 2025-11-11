'use server'

import { revalidatePath } from 'next/cache'

import type { IExpense } from '@/common/interfaces/expense'

import { requireAuth } from '@/app/_auth/server'
import { ExpenseStoreRepository } from '@/repositories/server/store/expense'

export const getExpenses = async (): Promise<IExpense[]> => {
  const authUser = await requireAuth()
  const repo = new ExpenseStoreRepository(authUser.id)
  const expenses = await repo.getRecentData()
  return expenses
}

export const getExpense = async (
  expenseId: string
): Promise<IExpense | null> => {
  const authUser = await requireAuth()
  const repo = new ExpenseStoreRepository(authUser.id)
  const expense = await repo.findById(expenseId)
  if (!expense) return null
  return expense
}

export const createExpense = async (expense: IExpense): Promise<void> => {
  const authUser = await requireAuth()
  const repo = new ExpenseStoreRepository(authUser.id)
  await repo.create(expense)
  revalidatePath('/')
}

export const updateExpense = async (expense: IExpense): Promise<void> => {
  const authUser = await requireAuth()
  const repo = new ExpenseStoreRepository(authUser.id)
  await repo.update(expense.id, expense)
  revalidatePath('/')
}

export const deleteExpense = async (expenseId: string): Promise<void> => {
  const authUser = await requireAuth()
  const repo = new ExpenseStoreRepository(authUser.id)
  await repo.delete(expenseId)
  revalidatePath('/')
}
