import TinderCard from "react-tinder-card";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import ChatContainer from "../components/ChatContainer";
import axios from "axios";
import MoreInfo from "../components/MoreInfo";
import MyProfile from "../components/MyProfile";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState(null);
  const [cardUser, setCardUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [lastDirection, setLastDirection] = useState();
  const [showInfo, setShowInfo] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const userId = cookies.UserId;
  let cardCounter = 1;

  const getUser = async () => {
    try {
      const response = await axios.get("https://gymder.herokuapp.com/user", {
        params: { userId },
      });
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getFilteredUsers = async () => {
    try {
      const response = await axios.get(
        "https://gymder.herokuapp.com/filtered-users",
        {
          params: { location: user?.gym_location },
        }
      );
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

  const updateMatches = async (matchedUserId) => {
    try {
      await axios.put("https://gymder.herokuapp.com/addmatch", {
        userId,
        matchedUserId,
      });
      getUser();
    } catch (error) {
      console.log(error);
    }
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

  const handleClickInfo = () => {
    console.log("clicked");
    setShowInfo(true);
  };

  const handleClickProfile = () => {
    console.log("clicked");
    setShowProfile(true);
  };

  const swiped = (direction, swipedUserId) => {
    console.log("removing: " + swipedUserId);

    if (direction === "right") {
      updateMatches(swipedUserId);
    }
    setLastDirection(direction);
    cardCounter++;
    setCardUser(filteredUsers2[filteredUsers2.length - cardCounter]);
  };

  return (
    <>
      {user && (
        <div className="dashboard">
          <ChatContainer user={user} />
          <div className="swipe-container">
            <button className="quartenary-button" onClick={handleClickProfile}>
              View My Profile
            </button>
            <div className="card-container">
              {filteredUsers2?.map((character) => (
                <TinderCard
                  className="swipe"
                  key={character.user_id}
                  onSwipe={(dir) => swiped(dir, character.user_id)}
                  onCardLeftScreen={() => outOfFrame(character.first_name)}
                  preventSwipe={["up", "down"]}
                  flickOnSwipe={true}
                >
                  <div
                    style={{ backgroundImage: "url(" + character.url1 + ")" }}
                    className="card"
                  >
                    <h3>{character.first_name}</h3>
                    <button
                      className="tertiary-button"
                      onClick={handleClickInfo}
                    >
                      More Info
                    </button>
                  </div>
                </TinderCard>
              ))}

              <div className="swipe-info">
                {lastDirection === "right" || lastDirection === "left" ? (
                  <p>You swiped {lastDirection}</p>
                ) : (
                  <p />
                )}
              </div>
            </div>
          </div>
          {showProfile && <MyProfile setShowProfile={setShowProfile} />}
          {showInfo && (
            <MoreInfo
              setShowInfo={setShowInfo}
              cardUser={cardUser}
              filteredUsers={filteredUsers2}
              setCardUser={setCardUser}
            />
          )}
        </div>
      )}
    </>
  );
};
export default Dashboard;
