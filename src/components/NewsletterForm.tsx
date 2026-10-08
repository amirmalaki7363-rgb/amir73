'use client';

import { useState } from 'react';
import { ArrowRightIcon } from './Icons';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  if (submitted) {
    return (
      <p className="text-sm text-champagne">Thank you for subscribing!</p>
    );
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Your email address"
        aria-label="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full bg-white/5 border border-white/15 px-4 py-3 text-sm text-white placeholder-white/40 focus:border-champagne focus:outline-none transition-colors min-h-[48px]"
      />
      <button
        type="submit"
        className="group inline-flex items-center justify-center gap-2 w-full bg-champagne text-navy px-5 py-3 text-sm font-medium uppercase tracking-wide hover:bg-champagne-light transition-colors min-h-[48px]"
      >
        Subscribe
        <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </button>
    </form>
  );
}
