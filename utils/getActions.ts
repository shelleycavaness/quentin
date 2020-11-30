export default async function getActions(){
  const  actionArray = await fetch('http://localhost:3000/api/playing/') 
 
  .then((reponse) => reponse.json())
  .then( (responseJson) =>  {
      console.log('////////fetch actions', responseJson)
   return responseJson
     })
  .catch((error) => console.error('error in catch ----------',error))
  return actionArray
 
 }