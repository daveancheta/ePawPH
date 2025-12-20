import { Button } from '@/components/ui/button';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label';
import { LoaderIcon, Lock, UserRound } from 'lucide-react'
import { Link } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from 'react';
import { UseAuthStore } from '@/store/UseAuthStore';

function Signup() {
  const { signup, isSigningUp } = UseAuthStore()
  const [formData, setFormData] = useState({
    fullname: "",
    gender: "",
    email: "",
    password: "",
  });

  const handleSignup = (e: any) => {
    e.preventDefault()

    signup(formData)
  }

  return (
    <div className='min-h-screen w-full rounded-lg flex flex-col md:flex-row items-center justify-center'>
      <div className="flex items-center justify-center w-full max-w-md md:max-w-lg gap-10">
        <div className='w-full'>
          <div className='flex flex-col items-center gap-2 justify-center mb-10 text-white text-center'>
            <img className='w-20 h-20 rounded-full' src="logo(2).png" alt="" />
            <h1 className='text-2xl font-bold'>Create your account</h1>
            <p className='text-sm font-normal'>Enter your details below to get started</p>
          </div>

          <form onSubmit={handleSignup} className='space-y-8 mx-8'>
            <div className='space-y-2 w-full'>
              <Label className='text-white'>Full Name</Label>

              <InputGroup>
                <InputGroupInput type='text' className='text-white' placeholder="John Doe"
                  onChange={(e) => setFormData({ ...formData, fullname: e.target.value })} value={formData.fullname} />
                <InputGroupAddon>
                  <UserRound />
                </InputGroupAddon>
              </InputGroup>
            </div>

            <div className='space-y-2 w-full'>
              <Label className='text-white'>Gender</Label>

              <Select onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent className='dark'>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="non-binary">Non-binary</SelectItem>
                  <SelectItem value="classified">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2 w-full'>
              <Label className='text-white'>Email</Label>

              <InputGroup>
                <InputGroupInput type='text' className='text-white' placeholder="johndoe@gmail.com"
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
            </div>
            {isSigningUp ?
              <Button variant={'form'} className='flex flex-row gap-2' disabled>
                <LoaderIcon className='animate-spin' /><span>Create account</span>
              </Button>
              :
              <Button variant={'form'} disabled={
                !formData.fullname.trim() || !formData.gender.trim() ||
                !formData.email.trim() || !formData.password.trim()
              }>Create account</Button>}

          </form>

          <div className="mt-6 text-center relative">
            <Link to="/login" className="auth-link">
              Already have an account? Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup