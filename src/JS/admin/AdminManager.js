import "../../css/admin/AdminManager.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";

export default function AdminManager() {
  const cardList = [
    {
      title: "Users",
      comment: "Number of Users",
      count: "100",
      icon: faChartLine,
    },
    {
      title: "Users",
      comment: "Number of Users",
      count: "100",
      icon: faChartLine,
    },
    {
      title: "Users",
      comment: "Number of Users",
      count: "100",
      icon: faChartLine,
    },
  ];

  return (
    <div className="dashboard-default admin-manager-container">
      <div class="cards">
        {cardList.map((card, index) => (
          <div className="card-single">
            <div className="card-flex">
              <div className="card-info">
                {/** 카드 Title */}
                <div className="card-head">
                  <span>{card.title}</span>
                  <small>{card.comment}</small>
                </div>
                {/** 차트 카운트 */}
                <h2>{card.count}</h2>
              </div>

              <div className="card-chart">
                <FontAwesomeIcon icon={faChartLine} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/** 두번째 row */}
      <div className="second-row">
        <div className="status-area">
          <div className="status-card">
            <div className="box">
              <div className="percent">
                <svg>
                  <circle cx="70" cy="70" r="70"></circle>
                  <circle cx="70" cy="70" r="70"></circle>
                </svg>
                <div className="number">
                  <h2>
                    90<span>%</span>
                  </h2>
                </div>
              </div>
              <h2 className="text">사용량</h2>
            </div>
          </div>

          <div className="status-card">
            <div className="box">
              <div className="percent">
                <svg>
                  <circle cx="70" cy="70" r="70"></circle>
                  <circle cx="70" cy="70" r="70"></circle>
                </svg>
                <div className="number">
                  <h2>
                    90<span>%</span>
                  </h2>
                </div>
              </div>
              <h2 className="text">사용량</h2>
            </div>
          </div>
        </div>

        <div className="board">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Title</th>
                <th>Status</th>
                <th>Date</th>
                <th>View</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>1</td>
                <td>Title</td>
                <td>
                  <div class="status completed"></div>Completed
                </td>
                <td>2025-01-01</td>
                <td>100</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Title</td>
                <td>
                  <div class="status completed"></div>completed
                </td>
                <td>2025-01-01</td>
                <td>100</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Title</td>
                <td>
                  <div class="status inactive"></div>Inactive
                </td>
                <td>2025-01-01</td>
                <td>100</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
