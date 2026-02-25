import { useState } from 'react';
import { Plus, Trash2, GripVertical, CheckCircle2, User, Calendar, Edit2, Save, X } from 'lucide-react';

const TaskBoard = ({ tasks, onAddTask, onDeleteTask, onUpdateProgress, onUpdateTask }) => {
  const [newTaskName, setNewTaskName] = useState('');
  const [newOwner, setNewOwner] = useState('');
  const [newTargetDate, setNewTargetDate] = useState('');
  
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', owner: '', targetDate: '' });

  const handleAdd = (e) => {
    e.preventDefault();
    if (newTaskName.trim()) {
      onAddTask({
        name: newTaskName,
        owner: newOwner,
        targetDate: newTargetDate
      });
      setNewTaskName('');
      setNewOwner('');
      setNewTargetDate('');
    }
  };

  const startEditing = (task) => {
    setEditingId(task.id);
    setEditForm({
      name: task.name,
      owner: task.owner || '',
      targetDate: task.targetDate || ''
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditForm({ name: '', owner: '', targetDate: '' });
  };

  const saveEditing = (id) => {
    onUpdateTask(id, editForm);
    setEditingId(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 glass-panel">
      <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="w-2 h-8 bg-lenovo-red rounded-full"></span>
          Mission Log
        </h2>
        <span className="text-sm text-gray-400 font-mono">{tasks.length} Active Tasks</span>
      </div>

      <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8 bg-white/5 p-4 rounded-xl border border-white/5">
        <div className="md:col-span-5">
          <label className="block text-xs text-gray-400 mb-1 ml-1 uppercase tracking-wider">Task Name</label>
          <input
            type="text"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            placeholder="Enter new mission objective..."
            className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-fifa-blue focus:ring-1 focus:ring-fifa-blue transition-all"
          />
        </div>
        <div className="md:col-span-3">
          <label className="block text-xs text-gray-400 mb-1 ml-1 uppercase tracking-wider">Owner</label>
          <div className="relative">
            <User size={14} className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              value={newOwner}
              onChange={(e) => setNewOwner(e.target.value)}
              placeholder="Owner"
              className="w-full bg-black/40 border border-white/20 rounded-lg pl-9 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-fifa-blue focus:ring-1 focus:ring-fifa-blue transition-all"
            />
          </div>
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs text-gray-400 mb-1 ml-1 uppercase tracking-wider">Target Date</label>
          <div className="relative">
             <Calendar size={14} className="absolute left-3 top-3 text-gray-500" />
            <input
              type="date"
              value={newTargetDate}
              onChange={(e) => setNewTargetDate(e.target.value)}
              className="w-full bg-black/40 border border-white/20 rounded-lg pl-9 pr-2 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-fifa-blue focus:ring-1 focus:ring-fifa-blue transition-all text-sm appearance-none"
              style={{ colorScheme: 'dark' }}
            />
          </div>
        </div>
        <div className="md:col-span-2 flex items-end">
          <button
            type="submit"
            disabled={!newTaskName.trim()}
            className="w-full bg-lenovo-red hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed h-[42px]"
          >
            <Plus size={18} />
            Add
          </button>
        </div>
      </form>

      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
        {tasks.length === 0 ? (
          <div className="text-center py-10 text-gray-500 italic">
            No active missions. Add a task to begin tracking.
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="group bg-white/5 hover:bg-white/10 rounded-lg p-4 border border-white/5 transition-all duration-300 hover:border-fifa-blue/30"
            >
              {editingId === task.id ? (
                // Edit Mode
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-6">
                      <label className="text-xs text-gray-500 block mb-1">Task Name</label>
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                        className="w-full bg-black/60 border border-fifa-blue rounded px-3 py-2 text-white focus:outline-none"
                        autoFocus
                      />
                    </div>
                    <div className="md:col-span-3">
                      <label className="text-xs text-gray-500 block mb-1">Owner</label>
                      <input
                        type="text"
                        value={editForm.owner}
                        onChange={(e) => setEditForm({...editForm, owner: e.target.value})}
                        className="w-full bg-black/60 border border-fifa-blue rounded px-3 py-2 text-white focus:outline-none"
                      />
                    </div>
                    <div className="md:col-span-3">
                      <label className="text-xs text-gray-500 block mb-1">Target Date</label>
                      <input
                        type="date"
                        value={editForm.targetDate}
                        onChange={(e) => setEditForm({...editForm, targetDate: e.target.value})}
                        className="w-full bg-black/60 border border-fifa-blue rounded px-3 py-2 text-white focus:outline-none"
                        style={{ colorScheme: 'dark' }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-2">
                    <button 
                      onClick={cancelEditing}
                      className="px-3 py-1 rounded border border-white/20 text-gray-300 hover:bg-white/10 text-sm flex items-center gap-1"
                    >
                      <X size={14} /> Cancel
                    </button>
                    <button 
                      onClick={() => saveEditing(task.id)}
                      className="px-3 py-1 rounded bg-fifa-blue hover:bg-blue-600 text-white text-sm flex items-center gap-1"
                    >
                      <Save size={14} /> Save
                    </button>
                  </div>
                </div>
              ) : (
                // View Mode
                <>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-gray-500 cursor-move opacity-0 group-hover:opacity-100 transition-opacity mt-1">
                      <GripVertical size={16} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                        <h3 className="text-lg font-medium text-white flex items-center gap-2">
                          {task.name}
                          {task.progress === 100 && <CheckCircle2 size={16} className="text-green-500" />}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded border border-white/5">
                            <User size={12} className="text-fifa-gold" />
                            <span>{task.owner || 'Unassigned'}</span>
                          </div>
                          {task.targetDate && (
                            <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded border border-white/5">
                              <Calendar size={12} className="text-lenovo-red" />
                              <span>{task.targetDate}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => startEditing(task)}
                        className="text-gray-500 hover:text-fifa-blue p-2 rounded-full hover:bg-white/10 transition-colors"
                        title="Edit Task"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => onDeleteTask(task.id)}
                        className="text-gray-500 hover:text-lenovo-red p-2 rounded-full hover:bg-white/10 transition-colors"
                        title="Remove Task"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pl-8">
                    <div className="flex-1 relative h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className={`absolute top-0 left-0 h-full transition-all duration-300 ${
                          task.progress === 100 ? 'bg-green-500' : 'bg-fifa-blue'
                        }`}
                        style={{ width: `${task.progress}%` }}
                      />
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={task.progress}
                        onChange={(e) => onUpdateProgress(task.id, parseInt(e.target.value))}
                        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                    <span className={`font-mono font-bold w-12 text-right ${
                      task.progress === 100 ? 'text-green-500' : 'text-fifa-blue'
                    }`}>
                      {task.progress}%
                    </span>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskBoard;
