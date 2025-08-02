'use client'

import { useActionState, startTransition } from "react";
import * as actions from '@/actions'
import Image from "next/image";


export default function CreatePropertyPage() {
  const [formState, action] = useActionState(actions.createProperty, { message: "" })

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    startTransition(() => {
      action(formData)
    })
  }

  return (
    <div className="container flex mx-auto mt-4">
      <div className="basis-2/5">
        <div className="relative pb-[100%]">
          <Image src="https://www.michaelzingraf.com/storage/images/xOWyG9KJ1jqmMPFgv1KoscsYpkoQ0lCDD2WTi8WE.jpeg" alt="Property Image" fill></Image>
        </div>
      </div>
      <div className="basis-3/5 pl-4">
        <form onSubmit={handleSubmit}>
          <h1 className="font-bold text-2xl">Add property</h1>
          <div className="mt-4">
            <label htmlFor="name" className="text-sm font-bold text-gray-700">Name</label>
            <input type="text" id="name" title="name" className="border rounded border-gray-300 w-full p-2" />
          </div>
          <div className="mt-4">
            <label htmlFor="address" className="text-sm font-bold text-gray-700">Address</label>
            <input type="text" id="address" title="address" className="border rounded border-gray-300 w-full p-2" />
          </div>
          <div className="mt-4">
            <label htmlFor="price" className="text-sm font-bold text-gray-700">Price</label>
            <div className="input-container border rounded border-gray-300 flex focus:border-blue-600">
              <span className="p-2 pr-0">$</span>
              <input type="number" id="price" title="price" className="p-2 grow focus:outline-none" />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="description" className="text-sm font-bold text-gray-700">Description</label>
            <textarea id="description" title="description" className="border rounded border-gray-300 w-full p-2" />
          </div>
          <div className="mt-4">
            <label htmlFor="status" className="text-sm font-bold text-gray-700">Status</label>
            <select name="status" id="status" className="w-full p-2 border rounded border-gray-300">
              <option value="Available">Available</option>
              <option value="Under Contract">Under Contract</option>
              <option value="Sold">Sold</option>
            </select>
          </div>
          <button type="submit" className="mt-8 p-2 px-4 rounded bg-blue-600 text-white w-full">Add property</button>
        </form>
      </div>
    </div>
  )
}