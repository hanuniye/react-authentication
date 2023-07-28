import { useEffect, useState } from "react";
import useRefresh from "../HOOKS/useRefresh";
import { useAuth } from "../HOOKS/useAuth";
import { usePrivateAxios } from "../HOOKS/usePrivateAxios";
import { useLocation, useNavigate } from "react-router-dom";

const Users = () => {
    const [users, setUsers] = useState();
    const { auth } = useAuth();
    const refresh = useRefresh();
    const axiosPrivate = usePrivateAxios()
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const getUsers = async () => {
           try {
            const resp = await axiosPrivate.get("/employees");
            console.log(resp);
            setUsers(resp.data.msg);
           } catch (error) {
            console.log("error");
           }
        }

        getUsers()
    }, []);

  return (
    <div>
      {
        !users ? <><h3>no employees</h3></> :
        <>
          <h3>Users list</h3>
      <ul>
        { users?.map((user, id) => <li key={id}>{user.name}</li>)}
      </ul>
      
        </>
      }
      <button onClick={() => refresh()}>Refresh</button>
    </div>
  )
}

export default Users
