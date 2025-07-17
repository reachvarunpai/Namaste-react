import React from "react";

class UserClass extends React.Component {
    constructor(props) {
        super(props);

    this.state = {
        userInfo: {
            name: "dummy",
            location: "default",
        },
    };
    //  console.log("child constructor");
    }
    async componentDidMount() {
        // console.log("child component did mount");
        // API Call
        const data = await fetch("https://api.github.com/users/reachvarunpai");
        const json = await data.json();
        
        this.setState({
            userInfo: json
        });

        console.log(json);
     }
    render() {
        // console.log("child render");

        const { name, location } = this.state.userInfo;
        return (
             <div className="user-card"> 
               <h2>Name: {name}</h2>
               <h3>Location: {location}</h3>
               <h4>Contact: reachvarunpai@gmail.com</h4>
            </div>
        );
    }
}

export default UserClass;