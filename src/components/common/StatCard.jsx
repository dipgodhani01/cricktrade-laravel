function StatCard({ title, count, gradient }) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg shadow-lg px-6 py-4 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl ${gradient}`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/50 to-white/0 rounded-t-lg" />
      <div className="flex items-center justify-between h-full relative z-10">
        <div className="text-white text-xl font-medium">{title}</div>
        <div className="text-2xl font-medium text-white drop-shadow">
          {count}
        </div>
      </div>
    </div>
  );
}

export default StatCard;
