'use server'

import { db } from "@/db"

export async function createProperty(formState: { message: string}, formData: FormData) {
  try {
    await db.property.create({
      data: {
        name: "Test 1",
        description: "Test desc",
        address: "Test add",
        price: 100,
        image: "https://example.com/image.jpg",
        status: "Available"
      }
    })
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { message: error.message }
    }
    return { message: "An unknown error occurred" }
  }
}