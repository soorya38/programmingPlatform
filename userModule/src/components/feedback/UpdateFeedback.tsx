import { CheckCircle, XCircle } from 'lucide-react';

interface UpdateFeedbackProps {
  success?: boolean;
  error?: string | null;
}

export default function UpdateFeedback({ success, error }: UpdateFeedbackProps) {
  if (!success && !error) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg ${
        success ? 'bg-green-50' : 'bg-red-50'
      }`}
    >
      <div className="flex items-center">
        {success ? (
          <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
        ) : (
          <XCircle className="h-5 w-5 text-red-400 mr-2" />
        )}
        <p
          className={`text-sm font-medium ${
            success ? 'text-green-800' : 'text-red-800'
          }`}
        >
          {success ? 'Changes saved successfully' : error}
        </p>
      </div>
    </div>
  );
}