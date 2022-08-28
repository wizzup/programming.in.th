import { Task } from '@prisma/client'
import useSWR from 'swr'

import Card from '@/components/Admin/Assessments/Card'
import { Layout } from '@/components/Admin/Layout'
import fetcher from '@/lib/fetcher'
import { IAssessmentwithTask } from '@/types/assessments'

const Assessments = () => {
  const { data: assessments } = useSWR<IAssessmentwithTask[]>(
    '/api/assessments',
    fetcher
  )
  console.log(assessments)
  const { data: tasks } = useSWR<Task[]>('/api/tasks', fetcher)
  return (
    <Layout current="assessments">
      <div className="flex flex-col space-y-4 py-4 ">
        <div className="flex h-40 items-center justify-center space-x-2 rounded-lg shadow-md transition dark:bg-slate-700 dark:hover:bg-slate-600">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10 3C10.5523 3 11 3.44772 11 4V9H16C16.5523 9 17 9.44772 17 10C17 10.5523 16.5523 11 16 11H11V16C11 16.5523 10.5523 17 10 17C9.44772 17 9 16.5523 9 16V11H4C3.44772 11 3 10.5523 3 10C3 9.44771 3.44772 9 4 9L9 9V4C9 3.44772 9.44772 3 10 3Z"
              fill="#94A3B8"
            />
          </svg>
          <p>สร้าง Assessments</p>
        </div>
        {assessments &&
          assessments.map(assessment => (
            <Card assessment={assessment} key={assessment.id} tasks={tasks} />
          ))}
      </div>
    </Layout>
  )
}

export default Assessments