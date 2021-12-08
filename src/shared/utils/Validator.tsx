class Validator{
  constructor(){
  }

  vStringAlpha(key, value){
    if(!/^[A-Za-z]+$/.test(value)){
      console.log(key, value)
      return {
        status: false,
        message: `${key} can't to have specials characters o numbers`
      }
    }
    return{
      status: true
    }
    
  }

  vNotVoid(key, value){
    if(value == null || value == '' || value.length == 0){
      return {
        status: false,
        message: `${key} can't to be a empty value`
      }
    }
    return {
      status: true
    }
  }

  vEmail(value){
     if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)){
        return{ 
          status: true
        }
     }

    return{
      status: false,
      message:'Please indroduce a valid email adress'
    }
  }
}

const validator = new Validator()

export default validator 
