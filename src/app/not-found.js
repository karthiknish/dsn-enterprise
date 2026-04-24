import Link from "next/link";

export const metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <div className="min-h-[calc(100dvh-4rem)] bg-white text-gray-900">
      <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col items-center justify-center min-h-[inherit] text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary mb-3">
          404
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-balance leading-tight max-w-2xl">
          Page not found
        </h1>
        <p className="text-lg text-gray-800 max-w-md mb-10 leading-relaxed">
          That page does not exist or the link is outdated. Use the buttons
          below or the site menu to continue.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto max-w-sm sm:max-w-none">
          <Link
            href="/"
            className="inline-flex justify-center items-center px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-md transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Back to home
          </Link>
          <Link
            href="/contact"
            className="inline-flex justify-center items-center px-6 py-3 border-2 border-primary text-primary font-medium rounded-md hover:bg-primary/5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}
