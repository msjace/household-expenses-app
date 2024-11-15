'use server'

import { revalidatePath } from 'next/cache'

import type { IExpense } from '@/common/interfaces/expense'

import { ExpenseStoreRepository } from '@/repositories/server/store/expense'

export const getExpenses = async (userId: string): Promise<IExpense[]> => {
  const repo = new ExpenseStoreRepository(userId)
  const expenses = await repo.getRecentData()
  return expenses
}

export const getExpense = async (
  expenseId: string,
  userId: string
): Promise<IExpense | null> => {
  const repo = new ExpenseStoreRepository(userId)
  const expense = await repo.findById(expenseId)
  if (!expense) return null
  return expense
}

export const createExpense = async (
  expense: IExpense,
  userId: string
): Promise<void> => {
  const repo = new ExpenseStoreRepository(userId)
  await repo.create(expense)
  revalidatePath('/')
}

export const updateExpense = async (
  expense: IExpense,
  userId: string
): Promise<void> => {
  const repo = new ExpenseStoreRepository(userId)
  await repo.update(expense.id, expense)
  revalidatePath('/')
}

export const deleteExpense = async (
  expenseId: string,
  userId: string
): Promise<void> => {
  const repo = new ExpenseStoreRepository(userId)
  await repo.delete(expenseId)
  revalidatePath('/')
}
