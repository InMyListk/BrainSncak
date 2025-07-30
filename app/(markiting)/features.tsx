import { Card, CardContent } from '@/components/ui/card'
import { BookOpen, Brain, Clock, Lightbulb, Target, Zap } from 'lucide-react'
import React from 'react'


export default function Features() {
    return (
        <section id="features" className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="text-3xl font-bold sm:text-4xl mb-4">
                        Why Choose{" "}
                        <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            BrainSnack?
                        </span>
                    </h2>
                    <p className="text-lg text-gray-600">
                        Transform your morning routine with personalized, bite-sized learning
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <CardContent className="p-8">
                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                                <Brain className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="mb-3 text-xl font-semibold">AI-Curated Content</h3>
                            <p className="text-gray-600">
                                Our AI analyzes thousands of sources to find the most interesting and relevant knowledge for your
                                interests.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <CardContent className="p-8">
                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-orange-500 to-red-500">
                                <Clock className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="mb-3 text-xl font-semibold">Perfect Timing</h3>
                            <p className="text-gray-600">
                                Delivered every morning at the perfect time to start your day with curiosity and wonder.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <CardContent className="p-8">
                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-green-500 to-teal-500">
                                <Target className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="mb-3 text-xl font-semibold">Personalized Topics</h3>
                            <p className="text-gray-600">
                                Choose from science, technology, psychology, history, and more. Get exactly what interests you most.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <CardContent className="p-8">
                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500">
                                <Zap className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="mb-3 text-xl font-semibold">Bite-Sized Learning</h3>
                            <p className="text-gray-600">
                                Each email takes just 2-3 minutes to read. Perfect for busy schedules and short attention spans.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <CardContent className="p-8">
                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-pink-500 to-purple-500">
                                <BookOpen className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="mb-3 text-xl font-semibold">Quality Sources</h3>
                            <p className="text-gray-600">
                                We only source from reputable publications, research papers, and trusted educational content.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <CardContent className="p-8">
                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500">
                                <Lightbulb className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="mb-3 text-xl font-semibold">Spark Curiosity</h3>
                            <p className="text-gray-600">
                                Each snack is designed to inspire further exploration and keep your mind engaged throughout the day.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>

    )
}

