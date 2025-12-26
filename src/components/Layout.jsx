const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col safe-area-inset">
      {/* Safe area wrapper for mobile notches and home bars */}
      <div className="flex-1 flex flex-col pb-safe pt-safe">
        {children}
      </div>
    </div>
  );
};

export default Layout;
