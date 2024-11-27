import React from 'react';
import { Activity } from 'lucide-react';
import { useQuery } from 'react-query';
import { checkHealth } from '../api/health';

export default function HealthCheck() {
  const { data, isLoading, error } = useQuery('health', checkHealth, {
    refetchInterval: 30000, // Check every 30 seconds
  });

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-gray-500">
        <Activity className="w-4 h-4 animate-pulse" />
        <span>Checking system status...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 text-red-500">
        <Activity className="w-4 h-4" />
        <span>System unavailable</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-green-500">
      <Activity className="w-4 h-4" />
      <span>System operational</span>
      {data?.version && <span className="text-xs text-gray-500">v{data.version}</span>}
    </div>
  );
}