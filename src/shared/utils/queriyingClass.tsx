import * as firebase from 'firebase';

class QueriyingClass {
  constructor(){}

  addData = (collection = '', obj = {}) => {
    return new Promise (async( resolve, reject ) => {
      try{
        await firebase.firestore().collection(collection)
          .add(obj)
        resolve({ text: 'Item added', type: true })
      } catch ( e ) {
        reject({ text: e.message, type: false })
      }
    })
  }

  editData = ( collection = '' , obj = {}, doc = '' ) => {
    return new Promise ( async( resolve, reject ) => {
      try {
        await firebase.firestore()
          .collection(collection)
          .doc(doc)
          .update(
            obj
          )
        resolve({ text: 'Item updated', type: true })
      } catch (e) {
        reject({ text: e.message, type: false })
      }
    })
  }

  deleteData = ( collection = '', doc= '' ) => {
    return new Promise( async( resolve, reject ) => {
      try {
        await firebase.firestore()
          .collection(collection)
          .doc(doc)
          .delete()
        resolve({ text: 'Item updated', type: true })
      } catch (e) {
        reject({ text: e.message, type: false })
      }
    })
  } 

  deleteMassiveData = ( collection = '', clause = {} ) => {
    return new Promise( async( resolve, reject ) => {
      try {
        await firebase.firestore()
          .collection(collection)
          .where(clause.where, clause.comparison, clause.clause)
          .delete()
        resolve({ text: 'Item updated', type: true })
      } catch (e) {
        reject({ text: e.message, type: false })
      }
    })
  }
  getByDoc = ( collection = '' , doc = '' ) => {
    return new Promise ( async( resolve, reject ) => {
      try {
        await firebase.firestore()
          .collection(collection)
          .doc(doc)
          .get().then( response => { 
          if (!response.exists) {
            reject([])
          } else {
            resolve(response.data()) 
          }
        })

      } catch (e) {
        reject({ text: e.message, type: false })
      }
    })
  }

  findData = ( collection = '' , clause ) => {
    return new Promise ( async( resolve, reject ) => {
      try {
        await firebase.firestore()
          .collection(collection)
          .where(clause.where, clause.comparison, clause.clause)
          .get().then( response => { 
          if (response.empty) {
            resolve([])
          } else {
            const finalData = []
            response.forEach(function(doc) {
              let newObj = {}
              newObj = {
                ...doc.data(),
                id: doc.id
              }
              
              finalData.push(newObj)
            });
            resolve(finalData)
          }
        })

      } catch (e) {
        reject({ text: e.message, type: false })
      }
    })
  }

  tripleFind = ( collection = '' , clause ) => {
    return new Promise ( async( resolve, reject ) => {
      try {
        const elements = await firebase.firestore()
          .collection(collection)
          .where(clause[0].where, clause[0].comparison[0], clause[0].clause)
          .where(clause[1].where, clause[1].comparison[1], clause[1].clause)
          .where(clause[2].where, clause[2].comparison[2], clause[2].clause)
          .get().then( response => { 
          if (response.empty) {
            
            resolve([])
          } else {
            const finalData = []
            response.forEach(function(doc) {
              let newObj = {}
              newObj = {
                ...doc.data(),
                id: doc.id
              }
              
              finalData.push(newObj)
            });
            resolve(elements.data())
          }
        })

      } catch (e) {
        reject({ text: e.message, type: false })
      }
    })
  }

  doubleFind = ( collection = '' , clause ) => {
    return new Promise ( async( resolve, reject ) => {
      try {
        await firebase.firestore()
          .collection(collection)
          .where(clause[0].where, clause[0].comparison, clause[0].clause)
          .where(clause[1].where, clause[1].comparison, clause[1].clause)
          .get().then( response => { 
          if (response.empty) {          
            resolve([])
          } else {
            const finalData = []
            response.forEach(function(doc) {
              let newObj = {}
              newObj = {
                ...doc.data(),
                id: doc.id
              }
              
              finalData.push(newObj)
            });
            resolve(finalData)
          }
        })

      } catch (e) {
        reject({ text: e.message, type: false })
      }
    })
  }
}

export default new QueriyingClass
