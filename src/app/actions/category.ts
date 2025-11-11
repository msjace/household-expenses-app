'use server'

import { revalidatePath } from 'next/cache'

import type { ICategory } from '@/common/interfaces/category'

import { requireAuth } from '@/app/_auth/server'
import { CategoryStoreRepository } from '@/repositories/server/store/category'

export const getCategories = async (): Promise<ICategory[]> => {
  const authUser = await requireAuth()
  const repo = new CategoryStoreRepository(authUser.id)
  const categories = await repo.getRecentData()
  return categories
}

export const getCategory = async (
  categoryId: string
): Promise<ICategory | null> => {
  const authUser = await requireAuth()
  const repo = new CategoryStoreRepository(authUser.id)
  const category = await repo.findById(categoryId)
  if (!category) return null
  return category
}

export const createCategory = async (category: ICategory): Promise<void> => {
  const authUser = await requireAuth()
  const repo = new CategoryStoreRepository(authUser.id)
  await repo.create(category)
  revalidatePath('/')
}

export const updateCategory = async (category: ICategory): Promise<void> => {
  const authUser = await requireAuth()
  const repo = new CategoryStoreRepository(authUser.id)
  await repo.update(category.id, category)
  revalidatePath('/')
}

export const deleteCategory = async (categoryId: string): Promise<void> => {
  const authUser = await requireAuth()
  const repo = new CategoryStoreRepository(authUser.id)
  await repo.delete(categoryId)
  revalidatePath('/')
}
