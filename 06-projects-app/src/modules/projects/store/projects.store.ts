import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { Project, Task } from '../interfaces/project.interface';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from '@vueuse/core';

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref(useLocalStorage<Project[]>('projects', []));

  const addProject = (name: string) => {
    if (name.length === 0) return;

    projects.value.push({
      id: uuidv4(),
      name,
      tasks: [],
    });
  };

  const addTaskToProject = (project: Project, name: string) => {
    if (name.length === 0 || !project) return;

    const newTask: Task = {
      id: uuidv4(),
      name,
      completedAt: null,
    };

    project.tasks = [...project.tasks, newTask];
  };

  const toggleTask = (projectId: string, taskId: string) => {
    const project = projects.value.find((p) => p.id === projectId);
    if (!project) return;

    const task = project.tasks.find((t) => t.id === taskId);
    if (!task) return;

    task.completedAt = task.completedAt ? null : new Date();
  };

  return {
    // properties
    // projects,

    //getters
    projectList: computed(() => [...projects.value]),
    noProjects: computed(() => projects.value.length === 0),
    projectsWithCompletion: computed(() => {
      return projects.value.map((project) => {
        const taskCount: number = project.tasks.length;
        const taskCompletedCount: number = project.tasks.filter((t) => t.completedAt).length;
        const completion = taskCount !== 0 ? (taskCompletedCount / taskCount) * 100 : 0;

        return {
          id: project.id,
          name: project.name,
          taskCount,
          completion,
          taskCompletedCount,
        };
      });
    }),

    //actions
    addProject,
    addTaskToProject,
    toggleTask,
  };
});
