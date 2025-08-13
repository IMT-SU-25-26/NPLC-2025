import React from 'react'

export default async function Page(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  return (
    <div>page {params.id}</div>
  )
}