export type taskModel = {
  id?: string;
  title?: string;
  description?: string;
  dueDate?: Date;
  start?: Date;
  end?: Date;
  uids?: string[];
  color?: string;
  attachment: AttachmentModel[];
  progress?: number;
  isUrgen:boolean
  taskid?: string;
};

export type AttachmentModel = {
  size?: number;
  name?: string;
  url?: string;
  type?: string;
};


export interface SubTaskModel {
  createdAt: number;
  description: string;
  isCompleted: boolean;
  taskId: string;
  title: string;
  updatedAt: number;
  idSubtask?:string
}
