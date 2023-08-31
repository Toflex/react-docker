import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

type Post = {
  userId: string,
  id: number,
  title: string,
  body: string
}

const instance = axios.create({
  baseURL: process.env.BASE_URL || "https://jsonplaceholder.typicode.com",
  timeout: 1000
});

function App() {
  const [posts, setPost] = useState<Post[] | null>(null)
  useEffect(()=>{
    const url = '/posts'
   instance(url).then(response=>{
      console.log(response.data);
      
      setPost(response.data)
    }).catch(err=>{
      console.error(err);
    })
  }, [])

  return (
    <div className="App">
     {posts? posts.map(post=>{
      return <div style={{border: '1px solid black', margin: '20px', padding: '10px'}} key={post.id}> {post.id}. {post.title} <p>{post.body}</p></div>
     }): <p>No post</p>}
    </div>
  );
}

export default App;
