import "./Dashboard.css";
import "./../index.css";
import { useEffect, useState } from "react";
import { getUserChats } from "../services/firestore";
import { useAuth } from "../services/AuthContext";

function Dashboard() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [chats, setChats] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    getUserChats(currentUser.uid).then((data) => {
      setChats(data);
    });
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside className={`dashboard-sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <div className="menu-icon" onClick={toggleSidebar}>
          ☰
        </div>
      </div>

      <div className="new-chat">
        <div className="new-chat-icon">+</div>
        {!isCollapsed && <span>New chat</span>}
      </div>

      {isCollapsed ? (
        <></>
      ) : chats != null ? (
        <>
          <div className="sidebar-section">
            <div className="section-title">Recent</div>
            <ul className="section-list">
              <li className="list-item active">
                <div className="list-icon">☰</div>
                <span>React TypeScript front-end h...</span>
              </li>
              <li className="list-item">
                <div className="list-icon">☰</div>
                <span>React Router TypeScript Guide</span>
              </li>
              <li className="list-item">
                <div className="list-icon">☰</div>
                <span>Generate a background that is...</span>
              </li>
              <li className="list-item">
                <div className="list-icon">☰</div>
                <span>React Startup Home Page</span>
              </li>
              <li className="list-item">
                <div className="list-icon">☰</div>
                <span>Integral Convergence Compari...</span>
              </li>
              <li className="list-item more">
                <div className="list-icon">▼</div>
                <span>More</span>
              </li>
            </ul>
          </div>

          <div className="sidebar-section">
            <div className="section-title">Gems</div>
            <ul className="section-list">
              <li className="list-item">
                <div className="list-icon gem-icon">
                  <span role="img" aria-label="gem">
                    &#x1F48E;
                  </span>
                </div>
                <span>Chess champ</span>
              </li>
              <li className="list-item">
                <div className="list-icon gem-icon">
                  <span role="img" aria-label="gem">
                    &#x1F48E;
                  </span>
                </div>
                <span>Brainstormer</span>
              </li>
              <li className="list-item">
                <div className="list-icon gem-icon">
                  <span role="img" aria-label="gem">
                    &#x1F48E;
                  </span>
                </div>
                <span>Career guide</span>
              </li>
              <li className="list-item more">
                <div className="list-icon">▼</div>
                <span>More</span>
              </li>
            </ul>
          </div>

          <div className="sidebar-footer">
            <ul className="footer-list">
              <li className="footer-item">
                <div className="footer-icon">
                  <span role="img" aria-label="gem">
                    &#x1F48E;
                  </span>
                </div>
                <span>Gem manager</span>
              </li>
              <li className="footer-item">
                <div className="footer-icon">
                  <span role="img" aria-label="help">
                    &#x2753;
                  </span>
                </div>
                <span>Help</span>
              </li>
              <li className="footer-item">
                <div className="footer-icon">
                  <span role="img" aria-label="activity">
                    &#x1F3C3;
                  </span>
                </div>
                <span>Activity</span>
                <div className="notification-dot"></div>
              </li>
              <li className="footer-item">
                <div className="footer-icon">
                  <span role="img" aria-label="settings">
                    &#x2699;
                  </span>
                </div>
                <span>Settings</span>
                <div className="notification-dot"></div>
              </li>
            </ul>
            <div className="location">
              <span role="img" aria-label="location">
                &#x1F535;
              </span>
              <span>Toronto, ON, Canada</span>
              <span className="update-location">Update location</span>
            </div>
          </div>
        </>
      ) : (
        <div>Loading</div>
      )}
    </aside>
  );
}

export default Dashboard;

{
  /* <>
          <div className="sidebar-section">
            <div className="section-title">Recent</div>
            <ul className="section-list">
              <li className="list-item active">
                <div className="list-icon">☰</div>
                <span>React TypeScript front-end h...</span>
              </li>
              <li className="list-item">
                <div className="list-icon">☰</div>
                <span>React Router TypeScript Guide</span>
              </li>
              <li className="list-item">
                <div className="list-icon">☰</div>
                <span>Generate a background that is...</span>
              </li>
              <li className="list-item">
                <div className="list-icon">☰</div>
                <span>React Startup Home Page</span>
              </li>
              <li className="list-item">
                <div className="list-icon">☰</div>
                <span>Integral Convergence Compari...</span>
              </li>
              <li className="list-item more">
                <div className="list-icon">▼</div>
                <span>More</span>
              </li>
            </ul>
          </div>

          <div className="sidebar-section">
            <div className="section-title">Gems</div>
            <ul className="section-list">
              <li className="list-item">
                <div className="list-icon gem-icon">
                  <span role="img" aria-label="gem">
                    &#x1F48E;
                  </span>
                </div>
                <span>Chess champ</span>
              </li>
              <li className="list-item">
                <div className="list-icon gem-icon">
                  <span role="img" aria-label="gem">
                    &#x1F48E;
                  </span>
                </div>
                <span>Brainstormer</span>
              </li>
              <li className="list-item">
                <div className="list-icon gem-icon">
                  <span role="img" aria-label="gem">
                    &#x1F48E;
                  </span>
                </div>
                <span>Career guide</span>
              </li>
              <li className="list-item more">
                <div className="list-icon">▼</div>
                <span>More</span>
              </li>
            </ul>
          </div>

          <div className="sidebar-footer">
            <ul className="footer-list">
              <li className="footer-item">
                <div className="footer-icon">
                  <span role="img" aria-label="gem">
                    &#x1F48E;
                  </span>
                </div>
                <span>Gem manager</span>
              </li>
              <li className="footer-item">
                <div className="footer-icon">
                  <span role="img" aria-label="help">
                    &#x2753;
                  </span>
                </div>
                <span>Help</span>
              </li>
              <li className="footer-item">
                <div className="footer-icon">
                  <span role="img" aria-label="activity">
                    &#x1F3C3;
                  </span>
                </div>
                <span>Activity</span>
                <div className="notification-dot"></div>
              </li>
              <li className="footer-item">
                <div className="footer-icon">
                  <span role="img" aria-label="settings">
                    &#x2699;
                  </span>
                </div>
                <span>Settings</span>
                <div className="notification-dot"></div>
              </li>
            </ul>
            <div className="location">
              <span role="img" aria-label="location">
                &#x1F535;
              </span>
              <span>Toronto, ON, Canada</span>
              <span className="update-location">Update location</span>
            </div>
          </div>
        </> */
}
