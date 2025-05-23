// components/sidebar.tsx
export default function Sidebar() {
  return (
    <aside className="w-64 bg-darkblue text-white p-4">
      <h2 className="text-2xl font-bold mb-6">SmartSpend</h2>
      <ul className="space-y-4">
        <li><a href="/dashboard">Overview</a></li>
        <li><a href="/dashboard/budget">Budget</a></li>
        <li><a href="/">Back to Home</a></li>
      </ul>
    </aside>
  );
}
