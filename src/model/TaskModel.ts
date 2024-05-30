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

  taskid?: string;
};

export type AttachmentModel = {
  size?: number;
  name?: string;
  url?: string;
  type?: string;
};
