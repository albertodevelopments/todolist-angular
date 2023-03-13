/** Angular core */
import { Injectable } from '@angular/core';

/** App imports */
import { iTask } from '@modules/tasks';

/** Firebase */
import { app } from '@core/index';
import { collection, getDocs, getFirestore, doc, setDoc, query, updateDoc, where, limit } from 'firebase/firestore';
import { deleteDoc, startAfter, orderBy, limitToLast, endBefore, getCountFromServer } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private _db = getFirestore(app)
  
  private _linesPerPage: number
  private _lastDocument: any | null
  private _currentPage: number
  
  constructor() {
    this._linesPerPage = 4
    this._lastDocument = null
    this._currentPage = 0
  }

  async getTasks(page: number, userId: string): Promise<iTask[]>{
    /** Primera página */
    if(page === 0){
      const firstBatch = query(collection(this._db, "tasks"), where('userId', '==', userId), orderBy("description"), limit(this._linesPerPage));
      const tasksSnapshots = await getDocs(firstBatch) 

      this._lastDocument = tasksSnapshots.docs[tasksSnapshots.docs.length - 1];

      const tasks = tasksSnapshots.docs.map(doc => {
        return doc.data()
      })
      this._currentPage = page

      return tasks as iTask[]
    }else{
      /** Paginación hacia delante */
      if(page > this._currentPage){
          const q = query(collection(this._db, "tasks"),
          where('userId', '==', userId),
          orderBy("description"),
          startAfter(this._lastDocument),
          limit(this._linesPerPage))
        
          const tasksSnapshots = await getDocs(q)
          this._lastDocument = tasksSnapshots.docs[tasksSnapshots.docs.length - 1];

          const tasks = tasksSnapshots.docs.map(doc => {
            return doc.data()
          })
          
          this._currentPage = page
          return tasks as iTask[]
      }else{
        const q = query(collection(this._db, "tasks"),
          where('userId', '==', userId),
          orderBy("description"),
          endBefore(this._lastDocument),
          limitToLast(this._linesPerPage))
        
        const tasksSnapshots = await getDocs(q)
        this._lastDocument = tasksSnapshots.docs[tasksSnapshots.docs.length - 1];

        const tasks = tasksSnapshots.docs.map(doc => {
          return doc.data()
        })
        
        this._currentPage = page
        return tasks as iTask[]
      }
    }
  }

  getLinesPerPage(): number{
    return this._linesPerPage
  }

  async count(userId: string): Promise<number>{
    const col = collection(this._db, "tasks");
    const q = query(col, where('userId', '==', userId))
    const snapshot = await getCountFromServer(q)

    return snapshot.data().count
  }

  async checkTaskAlreadyExists(taskDescription: string): Promise<iTask | null>{
    let taskAlreadyExist: iTask | null = null

    const taskReference = collection(this._db, 'tasks')
    const q = query(taskReference, where('description', '==', taskDescription), limit(1))
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach(doc => {
      taskAlreadyExist = doc.data() as iTask
    })

    return taskAlreadyExist
  }

  async create(task: iTask): Promise<string>{
    try {
      const newTaskRef = doc(collection(this._db, "tasks"));
      await setDoc(newTaskRef, {
        id: newTaskRef.id,
        userId: task.userId,
        description: task.description,
        progress: task.progress,
        completed: false
      });

      this.resetPagination()
      return ''
    } catch (error: any) {
      console.log(error)
      return error.code
    }
  }

  async update(task: iTask): Promise<string>{
    try {
      const taskReference = doc(this._db, 'tasks', task.id)
      await updateDoc(taskReference, {
        description: task.description,
        progress: task.progress,
        completed: task.completed
      })
      this.resetPagination()
      return ''
    } catch (error: any) {
      return error.code
    }
  }

  async delete(task: iTask): Promise<string>{
    try {
      await deleteDoc(doc(this._db, 'tasks', task.id))
      this.resetPagination()
      return ''
    } catch (error: any) {
      return error.code
    }
  }

  private resetPagination(){
    this._currentPage = 0
  }

}
