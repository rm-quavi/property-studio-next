import { db } from "@/db"
import Link from "next/link"
import Image from "next/image"
import type { Property } from "@/generated/prisma";

export default async function Home() {
  const properties: Property[] = await db.property.findMany()

  const propertyList = properties.map((property) => {
    return <Link
      key={property.id}
      href={`/properties/${property.id}`}
    >
      <div>
        <h2>{property.name}</h2>
        <p>{property.description}</p>
        <p>Price: ${property.price}</p>
      </div>
    </Link>
  })
  return (
    <div>
      <h1>Welcome!</h1>
      <div className="flex flex-col gap-2">
        {propertyList.length > 0 ? propertyList : <p>No properties available.</p>}
      </div>
    </div>
  )
}
