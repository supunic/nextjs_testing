import axios from 'axios'
import useSWR from 'swr'
import { COMMENT } from '../types/Types'

const axiosFetcher = async () => {
  const result = await axios.get<COMMENT[]>(
    'https://jsonplaceholder.typicode.com/comments/?_limit=10'
  )
  return result.data
}

export const useSWRCommentsState = (): {
  comments: COMMENT[]
  error: any
} => {
  const { data: comments, error } = useSWR('commentsFetch', axiosFetcher)
  return { comments, error }
}
