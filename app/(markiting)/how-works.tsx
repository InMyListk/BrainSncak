import React from 'react'

export default function HowWorks() {
    return (
        <section id="how-it-works" className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="text-3xl font-bold sm:text-4xl mb-4">
                        How It{" "}
                        <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Works</span>
                    </h2>
                    <p className="text-lg text-gray-600">Get started in less than 2 minutes</p>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    <div className="text-center">
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-2xl font-bold">
                            1
                        </div>
                        <h3 className="mb-4 text-xl font-semibold">Choose Your Interests</h3>
                        <p className="text-gray-600">
                            Select from topics like science, technology, psychology, history, and more. You can always change them
                            later.
                        </p>
                    </div>

                    <div className="text-center">
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-2xl font-bold">
                            2
                        </div>
                        <h3 className="mb-4 text-xl font-semibold">AI Curates Content</h3>
                        <p className="text-gray-600">
                            Our AI scans thousands of sources daily to find the most fascinating insights tailored to your
                            preferences.
                        </p>
                    </div>

                    <div className="text-center">
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-teal-500 text-white text-2xl font-bold">
                            3
                        </div>
                        <h3 className="mb-4 text-xl font-semibold">Enjoy Daily Snacks</h3>
                        <p className="text-gray-600">
                            Wake up to a beautifully designed email with your daily dose of knowledge. Read, learn, and get
                            inspired.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

