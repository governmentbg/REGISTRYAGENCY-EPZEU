/**
 * Validate EIK numbers with 9 or 13 digits by checksum
 * @returns: true/false
 */
export class EIKValidator{

  public static validate(eik_str:string) : boolean{
    eik_str = eik_str.replace(/\s+/, '');
    var eik_len = eik_str.length;
    if((eik_len == 9) || (eik_len == 13)){
      var eik = parseInt(eik_str);
      if(isNaN(eik)){
        //('Грешен ЕИК номер! Моля използвайте само цифри!');
        return false;
      }else{
        var sum = 0;
        for(var i = 0; i < 8; i++){
          sum += parseInt(eik_str.charAt(i))*(i+1);
        }
        var new_value = sum % 11;
        if(new_value == 10){
          sum = 0;
          for(i = 0; i < 8; i++){
            sum += parseInt(eik_str.charAt(i))*(i+3);
          }
          new_value = sum % 11;
          if(new_value == 10){
            new_value = 0;
          }
        }

        if(new_value == parseInt(eik_str.charAt(8))){
          if (eik_len == 9){
            //('Въведеният ЕИК е валиден!');
            return true;
          }else{
            sum = parseInt(eik_str.charAt(8))*2 + parseInt(eik_str.charAt(9))*7 + parseInt(eik_str.charAt(10))*3 + parseInt(eik_str.charAt(11))*5;
            new_value = sum % 11;
            if(new_value == 10){
              sum = parseInt(eik_str.charAt(8))*4 + parseInt(eik_str.charAt(9))*9 + parseInt(eik_str.charAt(10))*5 + parseInt(eik_str.charAt(11))*7;
              new_value = sum % 11;
              if(new_value == 10){
                new_value = 0;
              }
            }
            if(new_value == parseInt(eik_str.charAt(12))){
              //('Въведеният ЕИК е валиден!');
              return true;
            }else{
              //('Въведеният ЕИК е невалиден!');
              return false;
            }
          }
        }else{
          //('Въведеният ЕИК е невалиден!');
          return false;
        }
      }
    }else{
      //('Грешен ЕИК');
      return false;
    }
  }

}
