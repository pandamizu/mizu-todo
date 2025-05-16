import React, { useState } from 'react';
    import { CheckSquare, Square, Trash2, Plus, X, Instagram, MessageCircle } from 'lucide-react';

    interface Task {
      id: string;
      text: string;
      completed: boolean;
    }

    function App() {
      const [tasks, setTasks] = useState<Task[]>([]);
      const [newTask, setNewTask] = useState('');

      const addTask = () => {
        if (newTask.trim() === '') return;
        const task: Task = {
          id: Date.now().toString(),
          text: newTask,
          completed: false
        };
        setTasks([...tasks, task]);
        setNewTask('');
      };

      const toggleTask = (id: string) => {
        setTasks(tasks.map(task => 
          task.id === id ? { ...task, completed: !task.completed } : task
        ));
      };

      const deleteTask = (id: string) => {
        setTasks(tasks.filter(task => task.id !== id));
      };

      return (
        <div className="min-h-screen animated-gradient flex items-center justify-center p-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-white/20 flex flex-col">
            <div className="p-6 flex-1">
              {/* Existing To-Do List Content */}
              <h1 className="text-3xl font-bold text-white mb-6 text-center">My To-Do List</h1>
              
              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Add a new task..."
                  className="flex-1 px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                  onKeyDown={(e) => e.key === 'Enter' && addTask()}
                />
                <button
                  onClick={addTask}
                  className="px-4 py-2 bg-white/30 rounded-lg hover:bg-white/40 transition-colors text-white"
                >
                  <Plus size={20} />
                </button>
              </div>

              <ul className="space-y-3">
                {tasks.length === 0 ? (
                  <p className="text-white/70 text-center py-4">No tasks yet. Add one above!</p>
                ) : (
                  tasks.map(task => (
                    <li 
                      key={task.id}
                      className="bg-white/10 rounded-lg p-3 flex items-center justify-between group hover:bg-white/20 transition-colors"
                    >
                      <button
                        onClick={() => toggleTask(task.id)}
                        className="flex items-center gap-3 flex-1"
                      >
                        {task.completed ? (
                          <CheckSquare className="text-green-400" size={20} />
                        ) : (
                          <Square className="text-white/70" size={20} />
                        )}
                        <span className={`text-white ${task.completed ? 'line-through opacity-70' : ''}`}>
                          {task.text}
                        </span>
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-white/50 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={18} />
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </div>
            
            {/* Social Media Icons Footer */}
            <div className="bg-white/5 px-6 py-4 flex justify-center gap-6 border-t border-white/10">
              <button 
                onClick={() => window.open('https://twitter.com', '_blank')}
                className="text-white/70 hover:text-blue-400 transition-all duration-300 hover:scale-110"
              >
                <X size={20} />
              </button>
              
              <button 
                onClick={() => window.open('https://instagram.com', '_blank')}
                className="text-white/70 hover:text-purple-400 transition-all duration-300 hover:scale-110"
              >
                <Instagram size={20} />
              </button>
              
              <button 
                onClick={() => window.open('https://whatsapp.com', '_blank')}
                className="text-white/70 hover:text-green-400 transition-all duration-300 hover:scale-110"
              >
                <MessageCircle size={20} />
              </button>
            </div>
          </div>
        </div>
      );
    }

    export default App;
