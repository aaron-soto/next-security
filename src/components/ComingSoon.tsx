'use client';
// components/ComingSoon.tsx
import Image from 'next/image';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from './ui/use-toast';

const ComingSoon = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast({
        title: 'Error',
        description: 'Please enter an email address.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: email,
          subject:
            "Welcome to C3 Security & Logistics! You've Been Added to Our List",
          text: `
Thank you for signing up to be notified about the launch of the C3 Security & Logistics website! We are excited to have you as part of our community!

Best Regards,

Manuel Duarte
CEO, C3 Security & Logistics
+1 (520) 517-0558
          `,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: 'Success',
          description: 'Thank you for subscribing!',
          variant: 'default',
        });
        setEmail('');

        // Send notification to the sender email
        await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: 'c3securitylogistics.com',
            subject: 'New Signup Notification',
            text: `A new user has signed up with the email: ${email}`,
          }),
        });
      } else {
        toast({
          title: 'Error',
          description: 'Something went wrong. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Image
        src="/images/C3Logo.jpeg"
        width={110}
        height={110}
        alt="c3 logo"
        className="mb-4"
      ></Image>
      <p className="font-black text-lg">C3 Security & Logistics</p>
      <h1 className="mb-4 font-bold text-5xl">Coming Soon</h1>
      <p className="mb-8 px-4 text-center">
        We&apos;re working hard to bring you something amazing. Sign up below to
        be the first to know when we launch.
      </p>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="flex sm:flex-row flex-col items-center gap-4 px-4 py-2">
          <Input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            disabled={loading}
          />
          <Button type="submit" className="w-full sm:w-auto" disabled={loading}>
            {loading ? (
              <svg
                className="w-5 h-5 text-white animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              'Notify Me'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ComingSoon;
