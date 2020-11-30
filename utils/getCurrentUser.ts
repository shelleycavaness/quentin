export default async function getCurrentUser(){
  const  currentPlayer = await fetch('http://localhost:3000/api/player/') 
   

  .then((reponse) => reponse.json())
  .then( (responseJson) =>  {
      console.log('////// fetch getCurrentUser', responseJson)
      return responseJson
     })
  .catch((error) => console.error('error in catch ----------',error))
  return currentPlayer
 
 }