import Layout from '../components/Layout'
import Comment from '../components/Comment'
import { useSWRCommentsState } from '../swr/useSWRCommentsState'

const CommentPage: React.FC = () => {
  const { comments, error } = useSWRCommentsState()

  if (error) return <span>Error!</span>

  return (
    <Layout title="Comment">
      <p className="text-4xl m-10">comment page</p>
      <ul>
        {comments &&
          comments.map(comment => <Comment key={comment.id} {...comment} />)}
      </ul>
    </Layout>
  )
}
export default CommentPage
