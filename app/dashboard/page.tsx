import Dashboard from '@/components/dashboard'
import GoalTracker from '@/components/GoalTracker';
export default function DashBoardPage() {
    return (
        <>
        <div className="text-blue-500 container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-8">Your Savings Goals</h1>
            <GoalTracker />
        </div>
        <Dashboard />
        </>
    )
}