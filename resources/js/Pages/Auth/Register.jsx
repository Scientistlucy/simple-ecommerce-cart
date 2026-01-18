import { useEffect } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <>
            <Head title="Register" />

            <div className="min-h-screen flex">
              {/* Left Side - Enhanced with icons and features */}
{/* Left Side - Enhanced with icons and features */}
<div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 p-12 flex-col justify-between relative overflow-hidden">
    {/* Decorative circles */}
    <div className="absolute top-20 right-20 w-64 h-64 bg-blue-400 rounded-full opacity-10 blur-3xl"></div>
    <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-300 rounded-full opacity-10 blur-3xl"></div>
    
    <div className="relative z-10">
        <Link href="/products" className="flex items-center gap-3 text-white">
            <ShoppingBagIcon className="w-10 h-10" />
            <span className="text-3xl font-bold">Simple E-Commerce</span>
        </Link>
    </div>
    
    <div className="text-white relative z-10">
        <h2 className="text-5xl font-bold mb-6">Join Our Community!</h2>
        <p className="text-xl text-blue-100 mb-8">
            Create your account and unlock exclusive benefits, personalized recommendations, and amazing deals.
        </p>
        
        {/* Feature highlights */}
        <div className="space-y-4">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-500 bg-opacity-30 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <span className="text-lg">20% Off Your First Order</span>
            </div>
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-500 bg-opacity-30 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                </div>
                <span className="text-lg">Save Your Favorite Items</span>
            </div>
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-500 bg-opacity-30 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                </div>
                <span className="text-lg">Get Notified of New Deals</span>
            </div>
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-500 bg-opacity-30 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                </div>
                <span className="text-lg">Secure & Protected Data</span>
            </div>
        </div>
    </div>

    <div className="text-blue-100 text-sm relative z-10">
        © 2026 Simple E-Commerce. All rights reserved.
    </div>
</div>

                {/* Right Side - Form */}
                <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
                    <div className="w-full max-w-md">
                        {/* Mobile Logo */}
                        <div className="lg:hidden mb-8 text-center">
                            <Link href="/products" className="inline-flex items-center gap-2 text-blue-600">
                                <ShoppingBagIcon className="w-8 h-8" />
                                <span className="text-2xl font-bold">Simple E-Commerce</span>
                            </Link>
                        </div>

                        <div className="bg-white rounded-2xl shadow-xl p-8">
                            <div className="mb-8">
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
                                <p className="text-gray-600">Sign up to start your shopping journey</p>
                            </div>

                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="name" value="Full Name" className="text-gray-700 font-semibold mb-2" />
                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        autoComplete="name"
                                        isFocused={true}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                        placeholder="John Doe"
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="email" value="Email Address" className="text-gray-700 font-semibold mb-2" />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        autoComplete="username"
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                        placeholder="you@example.com"
                                    />
                                    <InputError message={errors.email} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="password" value="Password" className="text-gray-700 font-semibold mb-2" />
                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        autoComplete="new-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
                                        placeholder="Create a strong password"
                                    />
                                    <InputError message={errors.password} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" className="text-gray-700 font-semibold mb-2" />
                                    <TextInput
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        autoComplete="new-password"
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        required
                                        placeholder="Confirm your password"
                                    />
                                    <InputError message={errors.password_confirmation} className="mt-2" />
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                                >
                                    {processing ? 'Creating Account...' : 'Create Account'}
                                </button>

                                <div className="text-center pt-4 border-t border-gray-200">
                                    <p className="text-gray-600">
                                        Already have an account?{' '}
                                        <Link
                                            href={route('login')}
                                            className="text-blue-600 hover:text-blue-700 font-semibold"
                                        >
                                            Sign In
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </div>

                        <div className="mt-6 text-center">
                            <Link
                                href="/products"
                                className="text-gray-600 hover:text-gray-900 text-sm font-medium"
                            >
                                ← Back to Products
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}