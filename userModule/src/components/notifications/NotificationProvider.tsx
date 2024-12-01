import React, { createContext, useContext, useState, useCallback } from 'react';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';

type NotificationType = 'success' | 'error' | 'info';

interface Notification {
  id: string;
  type: NotificationType;
  message: string;
}

interface NotificationContextType {
  showNotification: (type: NotificationType, message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = useCallback((type: NotificationType, message: string) => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(notification => notification.id !== id));
    }, 5000);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className={`flex items-center p-4 rounded-lg shadow-lg ${
              notification.type === 'success' ? 'bg-green-50' :
              notification.type === 'error' ? 'bg-red-50' : 'bg-blue-50'
            }`}
          >
            {notification.type === 'success' && <CheckCircle className="h-5 w-5 text-green-400" />}
            {notification.type === 'error' && <AlertCircle className="h-5 w-5 text-red-400" />}
            {notification.type === 'info' && <Info className="h-5 w-5 text-blue-400" />}
            <span className={`mx-3 text-sm font-medium ${
              notification.type === 'success' ? 'text-green-800' :
              notification.type === 'error' ? 'text-red-800' : 'text-blue-800'
            }`}>
              {notification.message}
            </span>
            <button
              onClick={() => removeNotification(notification.id)}
              className="ml-auto"
            >
              <X className={`h-5 w-5 ${
                notification.type === 'success' ? 'text-green-400' :
                notification.type === 'error' ? 'text-red-400' : 'text-blue-400'
              }`} />
            </button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
}