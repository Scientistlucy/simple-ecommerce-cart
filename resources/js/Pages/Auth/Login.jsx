import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <>
            <Head title="Log in" />

            <div className="min-h-screen flex">
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
        <h2 className="text-5xl font-bold mb-6">Welcome Back!</h2>
        <p className="text-xl text-blue-100 mb-8">
            Sign in to access your cart and continue shopping for amazing products.
        </p>
        
        {/* Feature highlights */}
        <div className="space-y-4">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-500 bg-opacity-30 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <span className="text-lg">Fast & Secure Checkout</span>
            </div>
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-500 bg-opacity-30 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                </div>
                <span className="text-lg">Exclusive Deals Daily</span>
            </div>
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-500 bg-opacity-30 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                </div>
                <span className="text-lg">Free Shipping Over $50</span>
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
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h1>
                                <p className="text-gray-600">Enter your credentials to access your account</p>
                            </div>

                            {status && (
                                <div className="mb-4 text-sm font-medium text-green-600 bg-green-50 p-3 rounded-lg">
                                    {status}
                                </div>
                            )}

                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="email" value="Email Address" className="text-gray-700 font-semibold mb-2" />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        autoComplete="username"
                                        isFocused={true}
                                        onChange={(e) => setData('email', e.target.value)}
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
                                        autoComplete="current-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="Enter your password"
                                    />
                                    <InputError message={errors.password} className="mt-2" />
                                </div>

                                <div className="flex items-center justify-between">
                                    <label className="flex items-center">
                                        <Checkbox
                                            name="remember"
                                            checked={data.remember}
                                            onChange={(e) => setData('remember', e.target.checked)}
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="ms-2 text-sm text-gray-600">Remember me</span>
                                    </label>

                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                                        >
                                            Forgot password?
                                        </Link>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                                >
                                    {processing ? 'Signing in...' : 'Sign In'}
                                </button>

                                <div className="text-center pt-4 border-t border-gray-200">
                                    <p className="text-gray-600">
                                        Don't have an account?{' '}
                                        <Link
                                            href={route('register')}
                                            className="text-blue-600 hover:text-blue-700 font-semibold"
                                        >
                                            Create Account
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </div>

                       
                    </div>
                </div>
            </div>
        </>
    );
}