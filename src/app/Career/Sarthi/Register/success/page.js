"use client";

import { useEffect,useState } from "react";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function SarthiSuccessPage() {
  useEffect(() => {
    // Scroll to top when arriving
    window.scrollTo(0, 0);
  }, []);

  const router = useRouter();

  const [allowed, setAllowed] = useState(null); // null = loading, true = show page, false = redirect

  useEffect(() => {
    const ok = sessionStorage.getItem("saarthi_success");

    if (!ok) {
      setAllowed(false);
      router.replace("/");
      return;
    }

    // If submission is valid
    sessionStorage.removeItem("saarthi_success");
    setAllowed(true);
  }, []);

  // While checking → SHOW NOTHING
  if (allowed === null) return null;

  // If allowed === false, redirect already triggered
  if (!allowed) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 px-6 py-20">
      <div className="bg-white shadow-xl rounded-3xl p-10 max-w-lg w-full text-center border border-orange-200">
        
        {/* Success Icon */}
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />

        {/* Title */}
        <h1 className="text-3xl font-extrabold text-gray-800 mb-3">
          Application Submitted!
        </h1>

        {/* Message */}
        <p className="text-gray-600 text-lg leading-relaxed mb-8">
          Thank you for applying to become a <span className="font-semibold">Saarthi</span>.
          Our team will review your application and contact you soon.
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-4">
          <Link
            href="/Career/Sarthi"
            className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow transition-all text-center"
          >
            Back to Saarthi Page
          </Link>

          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold shadow-inner transition-all text-center"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
