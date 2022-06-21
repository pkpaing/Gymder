import TinderCard from "react-tinder-card";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import ChatContainer from "../components/ChatContainer";
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [lastDirection, setLastDirection] = useState();

  const userId = cookies.UserId;

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:8000/user", {
        params: { userId },
      });
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getFilteredUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/filtered-users", {
        params: { location: user?.gym_location },
      });
      setFilteredUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (user) {
      getFilteredUsers();
    }
  }, [user]);

  console.log(filteredUsers);

  const updateMatches = async (matchedUserId) => {
    try {
      await axios.put("http://localhost:8000/addmatch", {
        userId,
        matchedUserId,
      });
      getUser();
    } catch (error) {
      console.log(error);
    }
  };

  console.log(user);

  // const characters = [
  //   {
  //     name: "Richard Hendricks",
  //     url: "https://1.bp.blogspot.com/-uz5_c0ykTag/YTYu3s8Q0JI/AAAAAAAFnIM/gdp3aVr-FboVo5cgcIg-q2cDzkHY_NdfgCLcBGAsYHQ/s1080/t.cj_241314526_2541523005994215_6246061663947068609_n.jpg",
  //   },
  //   {
  //     name: "Jared Dunn",
  //     url: "https://www.redsports.sg/wp-content/uploads/2016/03/WaterPolo_BDiv_Boys_ACSI_OSS-7.jpg",
  //   },
  //   {
  //     name: "Monica Hall",
  //     url: "https://1.bp.blogspot.com/-uz5_c0ykTag/YTYu3s8Q0JI/AAAAAAAFnIM/gdp3aVr-FboVo5cgcIg-q2cDzkHY_NdfgCLcBGAsYHQ/s1080/t.cj_241314526_2541523005994215_6246061663947068609_n.jpg",
  //   },
  //   {
  //     name: "Chris Chan",
  //     url: "https://www.redsports.sg/wp-content/uploads/2016/03/WaterPolo_BDiv_Boys_ACSI_OSS-7.jpg",
  //   },
  //   {
  //     name: "Oliver Loo",
  //     url: "https://1.bp.blogspot.com/-uz5_c0ykTag/YTYu3s8Q0JI/AAAAAAAFnIM/gdp3aVr-FboVo5cgcIg-q2cDzkHY_NdfgCLcBGAsYHQ/s1080/t.cj_241314526_2541523005994215_6246061663947068609_n.jpg",
  //   },
  // ];

  const swiped = (direction, swipedUserId) => {
    console.log("removing: " + swipedUserId);

    if (direction === "right") {
      updateMatches(swipedUserId);
    }
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  const matchedUserIds = user?.matches
    .map(({ user_id }) => user_id)
    .concat(userId);

  const filteredUsers2 = filteredUsers?.filter(
    (filteredUser) => !matchedUserIds.includes(filteredUser.user_id)
  );

  return (
    <>
      {user && (
        <div className="dashboard">
          <ChatContainer user={user} />
          <div className="swipe-container">
            <div className="card-container">
              {filteredUsers2?.map((character) => (
                <TinderCard
                  className="swipe"
                  key={character.user_id}
                  onSwipe={(dir) => swiped(dir, character.user_id)}
                  onCardLeftScreen={() => outOfFrame(character.first_name)}
                >
                  <div
                    style={{ backgroundImage: "url(" + character.url1 + ")" }}
                    className="card"
                  >
                    <h3>{character.first_name}</h3>
                  </div>
                </TinderCard>
              ))}

              <div className="swipe-info">
                {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Dashboard;
