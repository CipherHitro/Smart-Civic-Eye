import { CheckCircle, Users, Clock } from 'lucide-react';

const StatsFooter = () => {
  return (
    <footer className="px-6 py-6 bg-white border-t border-slate-200">
      {/* Trust Badge */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <p className="text-sm text-slate-600 font-medium">
          Live Community Monitoring
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
        <div className="text-center">
          <div className="flex justify-center mb-1">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900">1,240</p>
          <p className="text-xs text-slate-600 font-medium">Resolved</p>
        </div>

        <div className="text-center">
          <div className="flex justify-center mb-1">
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900">3,890</p>
          <p className="text-xs text-slate-600 font-medium">Citizens</p>
        </div>

        <div className="text-center">
          <div className="flex justify-center mb-1">
            <Clock className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900">24h</p>
          <p className="text-xs text-slate-600 font-medium">Avg Response</p>
        </div>
      </div>

      {/* Version Info */}
      <p className="text-center text-xs text-slate-400 mt-4">
        v1.0.0 • Powered by Community
      </p>
    </footer>
  );
};

export default StatsFooter;
