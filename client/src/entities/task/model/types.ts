export type Task = {
  id: number;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Backlog' | 'InProgress' | 'Done';
  boardId: number;
  boardName: string;
  assignee: {
    id: number;
    fullName: string;
    email: string;
    avatarUrl: string;
  };
};

export type CreateTaskDto = {
  assigneeId: number;
  boardId: number;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  title: string;
};
