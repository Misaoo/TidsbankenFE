import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import axios from "axios";
import UserNav from "./UserNav/UserNav";
import UserCard from "./UserCard/UserCard";
import AddUser from "./AddUser/AddUser";
import "../general.css";
import CardList from "../CardList/CardList";

const UsersTab = (props: any) => {
  let [users, setUsers] = useState()
  let [styles, setStyles] = useState({
        general: {},
        requests: {},
        users: {}
      })
    
  useEffect(() => {
    getUserData()
    props.updateStyling({
      general: {},
      requests: {},
      users: { backgroundColor: "#3D8ABB" }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps,
  }, [])

  const getUserData = () => {
    let tempArr: any = []

    axios(process.env.REACT_APP_API_URL + "/user/all", {
      method: "GET",
      withCredentials: true
    })
      .then((res: any) => {
        const userElement = res.data.map((user: any) => {
          return (
            <UserCard
              key={user.userId}
              user={user}
              updateUsers={() => getUserData()}
            ></UserCard>
          )
        })     
        tempArr.push(userElement)   
        setUsers(tempArr)
      })
      .catch(error => {
        if (error.status === 401 || error.status === 403) {
          window.location.href = "/logout";
        }
      })
  }

  return (
      <div className="userTab">
        <Router>
          <UserNav
            updateUsers={() => getUserData()}
            style={styles}
          />
          <Switch>
            <Route
              path="/admin/users/allUsers"
              render={() => (
                <div className="userContent">
                  <CardList
                    key="users"
                    content={users}
                    styling={{
                      allUsers: { backgroundColor: "#3D8ABB" },
                      addUsers: {}
                    }}
                    updateStyling={(e: any) => setStyles(e)}
                  />
                </div>
              )}
            ></Route>
            <Route
              path="/admin/users/addUser"
              render={() => (
                <AddUser
                  updateStyling={(e: any) => setStyles(e)}
                  styling={{
                    allUsers: {},
                    addUsers: { backgroundColor: "#3D8ABB" }
                  }}
                />
              )}
            ></Route>
            <Redirect exact from="/admin/users" to="/admin/users/allUsers" />
          </Switch>
        </Router>
      </div>
    )
}
export default UsersTab;
// class UsersTab extends Component {
//   //let address = props.address;
//   static contextType = authContext
//   constructor(props) {
//     super(props);
//     this.state = {
//       isAdmin : '',
//       users: [],
      // style: {
      //   general: {},
      //   requests: {},
      //   users: {}
      // }
//     };
//   }
//   componentDidMount() {
//     this.props.updateStyling({
//       general: {},
//       requests: {},
//       users: { backgroundColor: "#3D8ABB" }
//     });
//     this.getUsers();
//     let { user } = this.context
//      this.state.isAdmin = user.isAdmin
//   }
//   getUsers() {
//     let tempArr = [];
//     axios(process.env.REACT_APP_API_URL + "/user/all", {
//       method: "GET",
//       withCredentials: true
//     })
//       .then(res => {
//         res.data.map(user => {
//           tempArr.push(
//             <UserCard
//               key={user.userId}
//               user={user}
//               updateUsers={this.getUsers.bind(this)}
//             />
//           );
//         });
//         this.setState({
//           users: tempArr
//         });
//       })
//       .catch(error => {
//         if (error.status === 401 || error.status === 403) {
//           window.location.href = "/logout";
//         }
//       });
//   }

//   updateStyling(style) {
//     this.setState({
//       style: style
//     });
//   }

//   render() {
//     return (
//       <div className="userTab">
//         <Router>
//           <UserNav
//             updateUsers={this.getUsers.bind(this)}
//             style={this.state.style}
//           />
//           <Switch>
//             <Route
//               path="/admin/users/allUsers"
//               render={() => (
//                 <div className="userContent">
//                   <CardList
//                     key="users"
//                     content={this.state.users}
//                     styling={{
//                       allUsers: { backgroundColor: "#3D8ABB" },
//                       addUsers: {}
//                     }}
//                     updateStyling={this.updateStyling.bind(this)}
//                   />
//                 </div>
//               )}
//             ></Route>
//             <Route
//               path="/admin/users/addUser"
//               render={() => (
//                 <AddUser
//                   isAdmin = {this.state.isAdmin}
//                   updateStyling={this.updateStyling.bind(this)}
//                   styling={{
//                     allUsers: {},
//                     addUsers: { backgroundColor: "#3D8ABB" }
//                   }}
//                 />
//               )}
//             ></Route>
//             <Redirect exact from="/admin/users" to="/admin/users/allUsers" />
//           </Switch>
//         </Router>
//       </div>
//     );
//   }
// }

// export default UsersTab;
