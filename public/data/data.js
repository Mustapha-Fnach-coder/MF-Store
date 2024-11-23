import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useFetchData() {
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]); 
  const [data, setProducts] = useState([]);
  const [commandes, setcommandes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
  
        const [usersResponse, adminsResponse, productsResponse,commandesResponse] = await Promise.all([
          axios.get('/data/users.json'),   
          axios.get('/data/admin.json'),  
          axios.get('/data/productsData.json'),
          axios.get('/data/commandes.json') 
        ]);
  
        setUsers(usersResponse.data);
        setAdmins(adminsResponse.data);
        setProducts(productsResponse.data);
        setcommandes(commandesResponse.data);
        
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData(); 
  }, []);

  return { users, admins, data,commandes};
}
