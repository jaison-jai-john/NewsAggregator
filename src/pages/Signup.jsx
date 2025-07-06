import { GalleryVerticalEnd } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { cn } from '~/lib/utils';
import { register } from '../api/auth';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    try {
      const response = await register(formData.email, formData.password);
      if (response && response.user) {
        console.log('Registration successful:', response.user);
        navigate('/'); // Redirect to home page after successful registration
      } else {
        console.error('Registration failed: No user data returned');
        // Handle case where registration was unsuccessful
      }
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle registration error (e.g., show error message)
    }
  };

  return (
    <div className='bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10'>
      <div className='flex w-full max-w-sm flex-col gap-6'>
        <a href='#' className='flex items-center gap-2 self-center font-medium'>
          <div className='bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md'>
            <GalleryVerticalEnd className='size-4' />
          </div>
          InShort
        </a>
        <div className={cn('flex flex-col gap-6')}>
          <Card>
            <CardHeader className='text-center'>
              <CardTitle className='text-xl'>Welcome</CardTitle>
            </CardHeader>
            <CardContent>
              <form>
                <div className='grid gap-6'>
                  <div className='grid gap-6'>
                    <div className='grid gap-3'>
                      <Label htmlFor='email'>Email</Label>
                      <Input
                        id='email'
                        type='email'
                        placeholder='m@example.com'
                        required
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className='grid gap-3'>
                      <div className='flex items-center'>
                        <Label htmlFor='password'>Password</Label>
                      </div>
                      <Input
                        id='password'
                        type='password'
                        required
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>
                    <Button
                      type='submit'
                      className='w-full'
                      onClick={handleSubmit}>
                      Register
                    </Button>
                  </div>
                  <div className='text-center text-sm'>
                    Already have an account?{' '}
                    <a href='/login' className='underline underline-offset-4'>
                      Login
                    </a>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
          <div className='text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4'>
            By clicking continue, you agree to our{' '}
            <a href='#'>Terms of Service</a> and <a href='#'>Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
