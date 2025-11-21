import { Button } from '@/components/ui/button';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label';
import { useIsMobile } from '@/hooks/use-mobile';
import AppLayout from '@/layout/app-layout'
import { UseAuthStore } from '@/store/UseAuthStore';
import { Lock, MessageCircle, UserRound } from 'lucide-react'
import { useState } from 'react';
import { LoaderIcon } from 'react-hot-toast';
import { Link } from 'react-router-dom';

function Login() {
  const isMobile = useIsMobile();
  const { isLoggingIn, login, authUser } = UseAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (e: any) => {
    e.preventDefault()

    login(formData)
  }
  return (
    <AppLayout>
      <div className={isMobile ? 'hidden' : 'bg-neutral-900 min-h-160 w-full rounded-lg flex flex-col md:flex-row items-center justify-center'}>

        {/* Left Side */}
        <div className="flex items-center justify-center min-w-120 gap-10">
          <div className='w-full'>
            <div className='flex flex-col items-center justify-center mb-10 text-white'>
              <MessageCircle className='size-18 mb-4' />
              <h1 className='text-2xl font-bold'>Login to your account</h1>
              <p className='text-sm font-normal'>Enter your email below to login to your account</p>
            </div>

            <form onSubmit={handleLogin} className='space-y-8 mx-8'>
              <div className='space-y-2 w-full'>
                <Label className='text-white'>Email</Label>

                <InputGroup>
                  <InputGroupInput type='email' className='text-white' placeholder="johndoe@gmail.com"
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} value={formData.email} />
                  <InputGroupAddon>
                    <UserRound />
                  </InputGroupAddon>
                </InputGroup>
              </div>

              <div className='space-y-2'>
                <Label className='text-white'>Password</Label>

                <InputGroup>
                  <InputGroupInput type='password' className='text-white' placeholder="••••••••"
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })} value={formData.password} />
                  <InputGroupAddon>
                    <Lock />
                  </InputGroupAddon>
                </InputGroup>

                <Link to={'/forgot-password'} className='text-white'>Forgot password?</Link>
              </div>

              {isLoggingIn ?
                <Button variant={'form'} className='flex flex-row gap-2' disabled>
                  <LoaderIcon className='animate-spin' /><span>Login</span>
                </Button>
                :
                <Button variant={'form'} disabled={!formData.email.trim() || !formData.password.trim()}>Login</Button>}
            </form>

            <div className="mt-6 text-center relative">
              <Link to="/signup" className="auth-link">
                Don't have an account? Sign up
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className='flex items-center justify-center border-l border-[#2F2F2F]'>
          <div>
            <img
              src="/login.png"
              alt="People using mobile devices"
              className="w-full h-auto object-contain rounded-r-lg"
            />
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default Login