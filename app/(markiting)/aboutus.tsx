import { Badge } from '@/components/ui/badge'
import { Star } from 'lucide-react'
import React from 'react'

export default function AboutUs () {
  return (
    <section className="relative py-32 bg-gradient-to-b from-white via-purple-50 to-pink-50 overflow-hidden">
  {/* Optional decorative blur elements */}
  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-purple-100 rounded-full blur-3xl opacity-30 -z-10" />
  <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-200 rounded-full blur-3xl opacity-20 -z-10" />

  <div className="container mx-auto px-6 sm:px-12">
    <div className="max-w-4xl mx-auto text-center bg-white/90 backdrop-blur-sm shadow-xl rounded-3xl p-10 border border-purple-100">
      <div className="inline-flex items-center gap-2 mb-4">
        <Star className="text-purple-600 h-5 w-5" />
        <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border border-purple-200">
          About Us
        </Badge>
      </div>

      <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-6">
        About <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">BrainSnack</span>
      </h2>

      <div className="text-lg sm:text-xl text-gray-700 space-y-6 leading-relaxed">
        <p>
          <strong className="text-purple-700">BrainSnack</strong> is your daily dose of knowledge&mdash;bite-sized, personalized, and beautifully delivered to your inbox.
        </p>

        <div className="bg-purple-50 border-l-4 border-purple-400 px-4 py-3 rounded-lg shadow-sm">
          <p>
            ⚛ From science and technology to history and art, our AI curates insights tailored to your unique interests.
          </p>
        </div>

        <p>
          We&rsquo;re on a mission to empower curious minds with content that fits your lifestyle&mdash;perfect for coffee breaks, commutes, or quiet moments.
        </p>

        <div className="bg-pink-50 border-l-4 border-pink-400 px-4 py-3 rounded-lg shadow-sm">
          <p>
            🚫 No spam. No data selling. Just pure brain food&mdash;delivered respectfully and responsibly.
          </p>
        </div>

        <p>
          Join a thriving community of lifelong learners and make curiosity a daily habit.
        </p>

        <p>
          Our motto: &quot;Feed your brain, daily.&quot;
        </p>
      </div>
    </div>
  </div>
</section>

  )
}

