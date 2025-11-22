import AppLayout from '@/layout/app-layout'
import MessageLayout from '@/layout/message-layout'
import PostLayout from '@/layout/post-layout'
import UserDisplayLayout from '@/layout/user-display-layout'
import { UseAuthStore } from '@/store/UseAuthStore'

function Home() {
  const { authUser } = UseAuthStore()
  return (
    <AppLayout>
      <div>
        <PostLayout/>
        <MessageLayout/>
        <UserDisplayLayout/>
      </div>
    </AppLayout>
  )
}

export default Home