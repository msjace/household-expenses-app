'use server'

import { revalidatePath } from 'next/cache'

import type { ICategory } from '@/common/interfaces/category'

import { CategoryStoreRepository } from '@/repositories/server/store/category'

export const getCategories = async (userId: string): Promise<ICategory[]> => {
  const repo = new CategoryStoreRepository(userId)
  const categories = await repo.getRecentData()
  return categories
}

export const getCategory = async (
  categoryId: string,
  userId: string
): Promise<ICategory | null> => {
  const repo = new CategoryStoreRepository(userId)
  const category = await repo.findById(categoryId)
  if (!category) return null
  return category
}

export const createCategory = async (
  category: ICategory,
  userId: string
): Promise<void> => {
  const repo = new CategoryStoreRepository(userId)
  await repo.create(category)
  revalidatePath('/')
}

export const updateCategory = async (
  category: ICategory,
  userId: string
): Promise<void> => {
  const repo = new CategoryStoreRepository(userId)
  await repo.update(category.id, category)
  revalidatePath('/')
}

export const deleteCategory = async (
  categoryId: string,
  userId: string
): Promise<void> => {
  const repo = new CategoryStoreRepository(userId)
  await repo.delete(categoryId)
  revalidatePath('/')
}
