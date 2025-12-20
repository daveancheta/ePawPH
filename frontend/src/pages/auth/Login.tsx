import { Button } from '@/components/ui/button';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { UseAuthStore } from '@/store/UseAuthStore';
import { Eye, EyeOff, Lock, UserRound } from 'lucide-react'
import { useState } from 'react';
import { LoaderIcon } from 'react-hot-toast';
import { Link } from 'react-router-dom';

function Login() {
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
    <div className='min-h-screen w-full rounded-lg flex flex-col md:flex-row items-center justify-center'>

      <div className="flex items-center justify-center min-w-120 gap-10">
        <div className='w-full'>
          <div className='flex flex-col gap-2 items-center justify-center mb-10 text-white'>
            <img className='w-20 h-20 rounded-full' src="logo(2).png" alt="" />
            <h1 className='text-2xl font-medium'>Login to your account</h1>
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
                  <InputGroupInput type={password === "show" ? "text" : "password"} className='text-white pr-8' placeholder="Password"
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
    </div>
  )
}

export default Login