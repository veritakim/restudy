import axios from 'axios'

function fetchPost(){
  const result = axios.get("https://koreanjson.com/posts/1")
  console.log("비동기방식: ", result)
}

fetchPost()

async function fetchPost2(){
  const result = await axios.get("https://koreanjson.com/posts/1")
  console.log('동기방식: ', result.data)
}

fetchPost2()