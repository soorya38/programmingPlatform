interface ErrorMessageProps {
  message: string;
  error?: Error | null;
}

export default function ErrorMessage({ message, error }: ErrorMessageProps) {
  return (
    <div className="rounded-md bg-red-50 p-4 w-full max-w-2xl">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-red-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">Error</h3>
          <div className="mt-2 text-sm text-red-700">
            <p>{message}</p>
            {error && process.env.NODE_ENV === 'development' && (
              <pre className="mt-2 text-xs bg-red-100 p-2 rounded overflow-x-auto">
                {error.stack}
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}