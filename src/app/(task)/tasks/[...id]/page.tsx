import { notFound } from 'next/navigation'

import { TaskContent } from '@/components/Task/Content'
import prisma from '@/lib/prisma'
import { mdxToHtml } from '@/lib/renderMarkdown'

import { TaskLayout } from '../../TaskLayout'

async function getTask(id: string, type = 'statement') {
  if (!id) {
    return null
  }

  const task = await prisma.task.findFirst({
    where: { id, private: false }
  })

  if (task === null) {
    return null
  }

  let solution = null

  if (type === 'solution') {
    const solutionRes = await fetch(
      `${process.env.NEXT_PUBLIC_AWS_URL}/solutions/md/${id}.md`
    )

    if (solutionRes.status === 200) {
      const raw = await solutionRes.text()
      solution = await mdxToHtml(raw)
    }
  }

  return {
    solution,
    task,
    type
  }
}

export default async function Tasks({ params }: { params: { id: string[] } }) {
  const id = params.id
  const tasks = await getTask(id[0], id[1])

  if (tasks === null) {
    notFound()
  }

  const { solution, task, type } = tasks

  return (
    <TaskLayout task={task} type={type}>
      <TaskContent task={task} solution={solution} type={type} />
    </TaskLayout>
  )
}