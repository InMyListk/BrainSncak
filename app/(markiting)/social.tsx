import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import React from 'react';

export default function Socia() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold sm:text-4xl mb-4">
            Loved by{' '}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Curious Minds
            </span>
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm text-gray-600">4.9/5 from 10,000+ users</span>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                &quot;BrainSnack has become my favorite part of the morning routine. The AI picks such interesting topics
                that I never would have discovered on my own!&quot;
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white font-semibold">
                  S
                </div>
                <div className="ml-3">
                  <p className="font-semibold">Sarah Chen</p>
                  <p className="text-sm text-gray-500">Product Designer</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                &quot;Perfect length and timing. I actually look forward to checking my email now. The psychology insights
                have been particularly fascinating.&quot;
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-green-400 to-teal-400 flex items-center justify-center text-white font-semibold">
                  M
                </div>
                <div className="ml-3">
                  <p className="font-semibold">Marcus Johnson</p>
                  <p className="text-sm text-gray-500">Software Engineer</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                &quot;As a busy parent, I love that I can learn something new in just a few minutes. The science topics
                have been amazing conversation starters with my kids!&quot;
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-orange-400 to-red-400 flex items-center justify-center text-white font-semibold">
                  A
                </div>
                <div className="ml-3">
                  <p className="font-semibold">Amanda Rodriguez</p>
                  <p className="text-sm text-gray-500">Marketing Manager</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
