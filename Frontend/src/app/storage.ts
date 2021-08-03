export const getThisState = (stateName) => {
  try{
    const serializedState = localStorage.getItem(stateName);
    if(serializedState === null){ return undefined }
    return JSON.parse(serializedState);
  }catch(err){
    return undefined
  }
}

export const getItem = (itemName) => {
  const items = getThisState(itemName)
  if (items === undefined) {
    return {todos : []}
  } else {
    return items
  }
}

export const saveItem = (key,data) => {
  const serializedState = JSON.stringify(data);
  localStorage.setItem(key,serializedState);
}

