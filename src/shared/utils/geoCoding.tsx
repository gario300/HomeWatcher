import axios from 'axios'
class GeoCoding {
  constructor() {}
  
  reverseGeoCoding(lat:number, lng:number, key:string){
    console.log(key)
    return new Promise ( (resolve, reject) => {
      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`)
        .then( (response:any) => {
          if (response.data.status == 'OK') {
            resolve(response.data.results[0].formatted_address)      
          } else {
            reject(false)
          }
        }).catch((err:any) => {
          console.log(err)
        })
    })
  }

}

export default new GeoCoding()
