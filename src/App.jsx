import { useState, useEffect } from 'react';
import Countdown from './components/Countdown';
import TaskBoard from './components/TaskBoard';
import { Trophy, CheckCircle, BarChart3, Rocket } from 'lucide-react';

function App() {
  // Load tasks from localStorage or use defaults
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('fifa-tasks');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Stadium Infrastructure Setup', owner: 'Network Team', targetDate: '2025-12-31', progress: 80 },
      { id: 2, name: 'Network Architecture Design', owner: 'Solution Architects', targetDate: '2025-10-15', progress: 60 },
      { id: 3, name: 'Hardware Deployment (Servers & Edge)', owner: 'Ops Team', targetDate: '2026-02-28', progress: 40 },
      { id: 4, name: 'Software Integration Testing', owner: 'Dev Team', targetDate: '2026-03-15', progress: 20 },
      { id: 5, name: 'Security Compliance Audit', owner: 'Sec Team', targetDate: '2026-04-01', progress: 10 },
    ];
  });

  const [overallProgress, setOverallProgress] = useState(0);

  useEffect(() => {
    localStorage.setItem('fifa-tasks', JSON.stringify(tasks));
    
    if (tasks.length === 0) {
      setOverallProgress(0);
      return;
    }
    
    const total = tasks.reduce((acc, task) => acc + task.progress, 0);
    setOverallProgress(Math.round(total / tasks.length));
  }, [tasks]);

  const addTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      name: taskData.name,
      owner: taskData.owner || 'Unassigned',
      targetDate: taskData.targetDate || '',
      progress: 0
    };
    setTasks([...tasks, newTask]);
  };

  const updateTaskDetails = (id, updates) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, ...updates } : t
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const updateProgress = (id, newProgress) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, progress: newProgress } : t
    ));
  };

  const importTasks = (importedTasks) => {
    // Validate imported tasks
    if (Array.isArray(importedTasks)) {
      const validTasks = importedTasks.filter(t => 
        t.id && t.name && typeof t.progress === 'number'
      );
      if (validTasks.length > 0) {
        setTasks(validTasks);
        alert(`Successfully imported ${validTasks.length} tasks!`);
      } else {
        alert('No valid tasks found in the file.');
      }
    } else {
      alert('Invalid file format.');
    }
  };

  return (
    <div className="min-h-screen bg-lenovo-black text-white selection:bg-lenovo-red selection:text-white font-sans overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-lenovo-black via-[#0a0a0a] to-[#1a1a1a]"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-lenovo-red/20 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-fifa-blue/20 rounded-full blur-[120px] animate-pulse-slow"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-white/10 pb-6">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <div className="flex flex-col items-end">
              <h1 className="text-4xl font-black tracking-tighter text-white">LENOVO</h1>
              <span className="text-xs tracking-[0.3em] text-lenovo-red font-bold">SMARTER TECHNOLOGY</span>
            </div>
            <div className="h-12 w-px bg-white/20 mx-4"></div>
            <div className="flex flex-col">
              <h1 className="text-4xl font-black tracking-tighter text-fifa-gold flex items-center gap-2">
                <Trophy size={32} /> FIFA
              </h1>
              <span className="text-xs tracking-[0.3em] text-fifa-blue font-bold">OFFICIAL PARTNER</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400 font-mono">PROJECT LAUNCH TARGET</div>
            <div className="text-xl font-bold text-white">MAY 1, 2026</div>
          </div>
        </header>

        {/* Hero Section - Countdown */}
        <section className="mb-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
            MISSION COUNTDOWN
          </h2>
          <Countdown />
        </section>

        {/* Overall Progress */}
        <section className="mb-16 max-w-4xl mx-auto">
          <div className="glass-panel p-8 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-lenovo-red via-fifa-gold to-fifa-blue"></div>
            
            <div className="flex justify-between items-end mb-4">
              <div>
                <h3 className="text-3xl font-bold text-white flex items-center gap-3">
                  <Rocket className="text-lenovo-red" />
                  Overall Readiness
                </h3>
                <p className="text-gray-400 mt-1">Aggregated completion status across all workstreams</p>
              </div>
              <div className="text-5xl font-black text-white font-mono">
                {overallProgress}%
              </div>
            </div>

            <div className="h-6 bg-gray-800/50 rounded-full overflow-hidden border border-white/5 relative">
              <div 
                className="h-full bg-gradient-to-r from-lenovo-red via-red-500 to-fifa-gold transition-all duration-1000 ease-out relative"
                style={{ width: `${overallProgress}%` }}
              >
                <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite]"></div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6 text-center">
              <div className="p-3 rounded bg-white/5 border border-white/5">
                <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">Status</div>
                <div className={`font-bold ${overallProgress === 100 ? 'text-green-500' : 'text-fifa-blue'}`}>
                  {overallProgress === 100 ? 'READY FOR LAUNCH' : 'IN PROGRESS'}
                </div>
              </div>
              <div className="p-3 rounded bg-white/5 border border-white/5">
                <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">Tasks</div>
                <div className="font-bold text-white">{tasks.length} Total</div>
              </div>
              <div className="p-3 rounded bg-white/5 border border-white/5">
                <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">Completed</div>
                <div className="font-bold text-white">
                  {tasks.filter(t => t.progress === 100).length} Done
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Task Management */}
        <section className="pb-20">
          <TaskBoard 
            tasks={tasks} 
            onAddTask={addTask} 
            onDeleteTask={deleteTask} 
            onUpdateProgress={updateProgress}
            onUpdateTask={updateTaskDetails}
            onImportTasks={importTasks}
          />
        </section>

        <footer className="text-center text-gray-600 text-sm py-8 border-t border-white/5">
          <p>© 2026 Lenovo x FIFA Partnership. Confidential Project Dashboard.</p>
        </footer>

      </div>
    </div>
  )
}

export default App
