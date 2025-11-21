import AppLayout from '@/layout/app-layout'
import { UseAuthStore } from '@/store/UseAuthStore'

function Home() {
  const { authUser } = UseAuthStore()
  return (
    <AppLayout>
      <div>
        {authUser.fullname}
      </div>
    </AppLayout>
  )
}

export default Home