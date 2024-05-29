export type taskModel  ={
    id?:string
    title?:string , 
    description ?:string , 
    dueDate ?:Date , 
    start?:Date , 
    end?:Date , 
    uids?:string [] , 
    color?:string ,  
    fileUrls?:string[] , 
    progress?:number , 
   
    taskid?:string
}