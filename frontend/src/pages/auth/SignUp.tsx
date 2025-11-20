import { Button } from '@/components/ui/button';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label';
import { useIsMobile } from '@/hooks/use-mobile';
import AppLayout from '@/layout/app-layout'
import { Lock, MessageCircle, UserRound } from 'lucide-react'
import { Link } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function Signup() {
  const isMobile = useIsMobile();
  return (
    <AppLayout>
      <div className={isMobile ? 'hidden' : 'bg-neutral-900 min-h-160 w-full rounded-lg flex flex-col md:flex-row items-center justify-center'}>

        {/* Left Side */}
        <div className="flex items-center justify-center min-w-120 gap-10">
          <div className='w-full'>
            <div className='flex flex-col items-center justify-center mb-10 text-white'>
              <MessageCircle className='size-18 mb-4' />
              <h1 className='text-2xl font-bold'>Create your account</h1>
              <p className='text-sm font-normal'>Enter your details below to get started</p>
            </div>

            <form className='space-y-8 mx-8'>
              <div className='space-y-2 w-full'>
                <Label className='text-white'>Full Name</Label>

                <InputGroup>
                  <InputGroupInput type='text' className='text-white' placeholder="John Doe" />
                  <InputGroupAddon>
                    <UserRound />
                  </InputGroupAddon>
                </InputGroup>
              </div>

              <div className='space-y-2 w-full'>
                <Label className='text-white'>Gender</Label>

                <Select>
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
                  <InputGroupInput type='text' className='text-white' placeholder="johndoe@gmail.com" />
                  <InputGroupAddon>
                    <UserRound />
                  </InputGroupAddon>
                </InputGroup>
              </div>

              <div className='space-y-2'>
                <Label className='text-white'>Password</Label>

                <InputGroup>
                  <InputGroupInput type='password' className='text-white' placeholder="••••••••" />
                  <InputGroupAddon>
                    <Lock />
                  </InputGroupAddon>
                </InputGroup>
              </div>

              <Button variant={'form'}>Create account</Button>
            </form>

            <div className="mt-6 text-center relative">
              <Link to="/login" className="auth-link">
                Already have an account? Login
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

export default Signup