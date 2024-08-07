import { TaskRepository } from "../../domain/repositories/TaskRepository";
import { Task } from "../../domain/entities/Task";

export class TaskService {
  private taskRepository: TaskRepository;

  constructor(taskRepository: TaskRepository) {
    this.taskRepository = taskRepository;
  }

  async getTasks(): Promise<Task[]> {
    return await this.taskRepository.getAllTasks();
  }
  async getTaskById(id: number): Promise<Task | null> {
    return await this.taskRepository.getTaskById(id);
  }
  async addTask(id: number, title: string, completed: boolean): Promise<Task> {
    const newTask = new Task(id, title, completed);
    return await this.taskRepository.addTask(newTask)
  }
  async updateTask(id: number, title: string, completed: boolean): Promise<void> {
    const taskToUpdate = await this.taskRepository.getTaskById(id);
    if (!taskToUpdate) {
      throw new Error("Task not found") 
    }
    taskToUpdate.title = title;
    taskToUpdate.completed = completed;
    await this.taskRepository.updateTask(taskToUpdate);
  }
  async deleteTaskById(id: number): Promise<void> {
    await this.taskRepository.deleteTaskById(id)
  }
  async toggleCompleted(id: number): Promise<void> {
    await this.taskRepository.toggleCompleted(id)
  }
}
