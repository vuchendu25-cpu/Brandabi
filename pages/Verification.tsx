import React, { useState } from 'react';
import { User } from '../types';

interface VerificationProps {
  user: User;
  onVerified: (user: User) => void;
}

const Verification: React.FC<VerificationProps> = ({ user, onVerified }) => {
  const [verifying, setVerifying] = useState(false);
  const [sent, setSent] = useState(true);

  const handleVerify = () => {
    setVerifying(true);
    // Simulate verification process
    setTimeout(() => {
      const updatedUser = { ...user, isVerified: true };
      onVerified(updatedUser);
      setVerifying(false);
    }, 2000);
  };

  const resendEmail = () => {
    setSent(false);
    setTimeout(() => setSent(true), 1000);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full text-center bg-white p-10 rounded-2xl shadow-xl border border-blue-50">
        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-royal-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        
        <h2 className="text-3xl font-black royal-blue mb-4 uppercase tracking-tighter">Activate Your <span className="text-golden-yellow">Vision</span></h2>
        <p className="text-royal-blue/70 mb-8 font-medium">
          We've sent a verification link to <span className="font-bold text-royal-blue">{user.email}</span>. 
          Unlock your full growth potential by confirming your account.
        </p>

        {sent && (
          <div className="bg-blue-50 text-royal-blue p-3 rounded-lg text-xs font-bold mb-6 border border-blue-100 flex items-center justify-center uppercase tracking-widest">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-golden-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Activation email sent!
          </div>
        )}

        <div className="space-y-4">
          <button
            onClick={handleVerify}
            disabled={verifying}
            className="w-full bg-royal-blue text-golden-yellow py-4 rounded-xl font-black text-lg hover:bg-blue-900 transition-all flex items-center justify-center shadow-lg uppercase tracking-tighter border-2 border-royal-blue"
          >
            {verifying ? (
              <>
                <div className="w-6 h-6 border-2 border-golden-yellow border-t-transparent rounded-full animate-spin mr-3"></div>
                Initializing...
              </>
            ) : 'Simulate Success & Proceed'}
          </button>
          
          <button
            onClick={resendEmail}
            className="text-xs font-black text-royal-blue/50 hover:text-golden-yellow transition-colors uppercase tracking-widest"
          >
            Didn't get the email? Resend Link
          </button>
        </div>

        <div className="mt-10 p-4 bg-slate-50 rounded-lg text-[10px] text-royal-blue/40 font-bold uppercase tracking-widest border border-blue-50/50">
          <p>Verified status ensures secure marketplace access and direct expert consultation.</p>
        </div>
      </div>
    </div>
  );
};export default Verification;