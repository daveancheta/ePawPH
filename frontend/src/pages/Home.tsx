import AppLayout from '@/layout/app-layout'
import MessageLayout from '@/layout/message-layout'
import PostLayout from '@/layout/post-layout'

function Home() {
  return (
    <AppLayout>
      <div>
        <PostLayout/>
        <MessageLayout/>
      </div>
    </AppLayout>
  )
}

export default Home