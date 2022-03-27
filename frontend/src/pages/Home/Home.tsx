import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './home.css'
function Home(): JSX.Element {
  useEffect(() => {
    fetch('http://localhost:3000/getProducts')
      .then((res) => res.json())
      .then(
        (data) => {
          console.log('Data', data)
        },
        (error) => {
          console.log('Data', error)
        },
      )
  }, [])
  return (
    <div className="home-container">
      <div>
        <h3>Product List</h3>
      </div>
    </div>
  )
}

export default Home
/**
 * const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users/")
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true);
                    setUsers(data);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
      }, [])
if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <ul>
                {users.map(user => (
                <li key={user.id}>
                    {user.name} 
                </li>
                ))}
            </ul>
        );
    }
 */
