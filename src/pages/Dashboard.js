import TinderCard from "react-tinder-card";
import { useState } from "react";
import ChatContainer from "../components/ChatContainer";

const Dashboard = () => {
  const characters = [
    {
      name: "Richard Hendricks",
      url: "https://1.bp.blogspot.com/-uz5_c0ykTag/YTYu3s8Q0JI/AAAAAAAFnIM/gdp3aVr-FboVo5cgcIg-q2cDzkHY_NdfgCLcBGAsYHQ/s1080/t.cj_241314526_2541523005994215_6246061663947068609_n.jpg",
    },
    {
      name: "Jared Dunn",
      url: "https://www.redsports.sg/wp-content/uploads/2016/03/WaterPolo_BDiv_Boys_ACSI_OSS-7.jpg",
    },
    {
      name: "Monica Hall",
      url: "https://1.bp.blogspot.com/-uz5_c0ykTag/YTYu3s8Q0JI/AAAAAAAFnIM/gdp3aVr-FboVo5cgcIg-q2cDzkHY_NdfgCLcBGAsYHQ/s1080/t.cj_241314526_2541523005994215_6246061663947068609_n.jpg",
    },
    {
      name: "Chris Chan",
      url: "https://www.redsports.sg/wp-content/uploads/2016/03/WaterPolo_BDiv_Boys_ACSI_OSS-7.jpg",
    },
    {
      name: "Oliver Loo",
      url: "https://1.bp.blogspot.com/-uz5_c0ykTag/YTYu3s8Q0JI/AAAAAAAFnIM/gdp3aVr-FboVo5cgcIg-q2cDzkHY_NdfgCLcBGAsYHQ/s1080/t.cj_241314526_2541523005994215_6246061663947068609_n.jpg",
    },
  ];

  const [lastDirection, setLastDirection] = useState();

  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete);
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  return (
    <div className="dashboard">
      <ChatContainer />
      <div className="swipe-container">
        <div className="card-container">
          {characters.map((character) => (
            <TinderCard
              className="swipe"
              key={character.name}
              onSwipe={(dir) => swiped(dir, character.name)}
              onCardLeftScreen={() => outOfFrame(character.name)}
            >
              <div
                style={{ backgroundImage: "url(" + character.url + ")" }}
                className="card"
              >
                <h3>{character.name}</h3>
              </div>
            </TinderCard>
          ))}

          <div className="swipe-info">
            {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
