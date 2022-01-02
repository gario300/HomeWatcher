import { 
  getFirestore, 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs,
  deleteDoc,
  doc
} from 'firebase/firestore';
interface clauseTypes {
  where: string;
  operator: any;
  clause: string
}
class QueriyingClass {
  constructor(){}

  addDataWithId = (collectionName:string = '', obj = {}, id : string) => {
    return new Promise (async( resolve, reject ) => {
      try{
        const db = getFirestore()
        await addDoc(collection(db, collectionName), obj)
        resolve('Su cuenta ha sido registrada con exito, ahora puede acceder con su email y contraseña')
      } catch ( e:any ) {
        reject({ message: e.message, type: false })
      }
    })
  }

  addData = (collectionName = '', obj = {}) => {
    return new Promise (async( resolve, reject ) => {
      try{
        const db = getFirestore()
        await addDoc(collection(db, collectionName), obj)
        resolve('Su cuenta ha sido registrada con exito, ahora puede acceder con su email y contraseña')
      } catch ( e:any ) {
        reject({ message: e.message, type: false })
      }
    })
  }

  deleteData = (collectionName = '', collectionId = '') => {
    return new Promise (async( resolve, reject ) => {
      try{
        const db = getFirestore()
        await deleteDoc(doc(db, collectionName, collectionId))
        resolve('deleted')
      } catch ( e : any ) {
        reject({ message: e.message, type: false })
      }
    })
  }

  findByOne = (collectionName:string = '', clauseObj : clauseTypes) => {
    return new Promise(async( resolve, reject) =>{
      const db = getFirestore()
      const q = query(collection(db, collectionName), where(clauseObj.where, clauseObj.operator, clauseObj.clause));
      const querySnapshot = await getDocs(q);
       
      if (querySnapshot.empty) {
        resolve([])
        return
      } 
      let finalData : any[] = []
      querySnapshot.forEach((doc) => {
        let newObj = {}
        newObj = {
          ...doc.data(),
          id: doc.id
        }     
        finalData.push(newObj)
      })
      resolve(finalData)
    })
  }

  findByTwo = (collectionName:string = '', clauseArr : clauseTypes[]) => {
    return new Promise(async( resolve, reject) =>{
      const db = getFirestore()
      const q = query(collection(db, collectionName), 
        where(clauseArr[0].where, clauseArr[0].operator, clauseArr[0].clause), 
        where(clauseArr[1].where, clauseArr[1].operator, clauseArr[1].clause)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        resolve([])
        return
      } 
      let finalData : any[] = []
      querySnapshot.forEach((doc) => {
        let newObj = {}
        newObj = {
          ...doc.data(),
          id: doc.id
        }     
        finalData.push(newObj)
      })
      resolve(finalData)
    })
  }

  findByThree = (collectionName:string = '', clauseArr : clauseTypes[]) => {
    return new Promise(async( resolve, reject) =>{
      const db = getFirestore()
      const q = query(collection(db, collectionName), 
        where(clauseArr[0].where, clauseArr[0].operator, clauseArr[0].clause), 
        where(clauseArr[1].where, clauseArr[1].operator, clauseArr[1].clause),
        where(clauseArr[2].where, clauseArr[2].operator, clauseArr[2].clause)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        resolve([])
        return
      } 
      let finalData : any[] = []
      querySnapshot.forEach((doc) => {
        let newObj = {}
        newObj = {
          ...doc.data(),
          id: doc.id
        }     
        finalData.push(newObj)
      })
      resolve(finalData)
    })
  }
}
export default new QueriyingClass
