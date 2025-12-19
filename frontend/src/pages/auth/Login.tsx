import { Button } from '@/components/ui/button';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { UseAuthStore } from '@/store/UseAuthStore';
import { Divide, Eye, EyeOff, Lock, MessageCircle, UserRound } from 'lucide-react'
import { useState } from 'react';
import { LoaderIcon } from 'react-hot-toast';
import { Link } from 'react-router-dom';

function Login() {
  const isMobile = useIsMobile();
  const { isLoggingIn, login } = UseAuthStore();
  const [password, setPassword] = useState("")
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const handleLogin = (e: any) => {
    e.preventDefault()

    login(formData)
  }
  return (
    <div className='m-20'>
     {isMobile ?<div className="flex min-h-screen items-center justify-center">
  <div className="max-w-md rounded-xl p-6 text-center flex justify-center flex-col items-center gap-2 shadow-lg">
      <div><img className='rounded-full w-20 h-20' src="/logo(2).png" alt="" /></div>
    <p className="text-sm font-medium text-slate-200">
      ePawPH is currently available on desktop only.
    </p>
    <p className="mt-2 text-xs text-slate-400">
      Mobile support will be available soon.
    </p>
  </div>
</div>

 : 
      <div className={isMobile ? 'hidden' : 'bg-neutral-800 min-h-160 w-full rounded-lg flex flex-col md:flex-row items-center justify-center'}>

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
                <Label className='text-white'>Email or Username</Label>

                <InputGroup>
                  <InputGroupInput type='text' className='text-white' placeholder="Email or Username"
                    onChange={(e) => setFormData({ ...formData, identifier: e.target.value })} value={formData.identifier} />
                  <InputGroupAddon>
                    <UserRound />
                  </InputGroupAddon>
                </InputGroup>
              </div>

              <div className='space-y-2'>
                <Label className='text-white'>Password</Label>

                <div className='relative'>
                  <InputGroup>
                    <InputGroupInput type={password === "show" ? "text" : "password"} className='text-white pr-8' placeholder="••••••••"
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })} value={formData.password} />
                    <InputGroupAddon>
                      <Lock />
                    </InputGroupAddon>
                  </InputGroup>
                  <div className='flex justify-end'>
                    <Eye className={cn('absolute top-1/4 right-2 text-muted-foreground size-5', password === "show" || password === "" ? "" : "hidden")} onClick={() => setPassword("show")} />
                    <EyeOff className={cn('absolute top-1/4 right-2 text-muted-foreground size-5', password === "" ? "hidden" : "")} onClick={() => setPassword("")} />
                  </div>
                </div>
                <Link to={'/forgot-password'} className='text-white text-sm'>Forgot password?</Link>
              </div>

              {isLoggingIn ?
                <Button variant={'form'} className='flex flex-row gap-2' disabled>
                  <LoaderIcon className='animate-spin' /><span>Login</span>
                </Button>
                :
                <Button variant={'form'} disabled={!formData.identifier.trim() || !formData.password.trim()}>Login</Button>}
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
      </div>}
    </div>
  )
}

export default Login