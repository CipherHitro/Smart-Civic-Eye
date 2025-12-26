import { Eye } from 'lucide-react';

const Header = () => {
  return (
    <header className="px-6 py-6 bg-white shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
          <Eye className="w-7 h-7 text-white" strokeWidth={2.5} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 leading-none">
            Smart Civic Eye
          </h1>
          <p className="text-sm text-slate-600 font-medium mt-0.5">
            Report. Track. Transform.
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
