import React from 'react'
import { prismaclient } from '@repo/db/client'

const page = async() => {
  const users= await prismaclient.user.findMany()
  return (
    <div>
      {JSON.stringify(users)}
    </div>
  )
}

export default page

export const revalidate=60
// export const dynamic="force-dynamic"