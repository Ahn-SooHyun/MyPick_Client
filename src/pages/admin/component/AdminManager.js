import './AdminManager.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faChartLine } from "@fortawesome/free-solid-svg-icons";

export default function AdminManager() {
  
    const cardList = [{
      title: 'Users',
      comment: 'Number of Users',
      count: '100',
      icon: faChartLine,
    }, {
      title: 'Users',
      comment: 'Number of Users',
      count: '100',
      icon: faChartLine,
    },
    {
      title: 'Users',
      comment: 'Number of Users',
      count: '100',
      icon: faChartLine,
    }
  ];

    return (
        <div className="dashboard-default admin-manager-container">
          <div class="cards">

          {
            cardList.map((card, index) => (
              <div class="card-single">
                <div class="card-flex">
                  <div class="card-info">
                  {/** 카드 Title */}
                    <div class="card-head">
                      <span>{card.title}</span>
                      <small>{card.comment}</small>
                    </div>
                    {/** 차트 카운트 */}
                    <h2>{card.count}</h2>
                  </div>

                  <div class="card-chart">
                  <FontAwesomeIcon icon={faChartLine} />
                  </div>
                </div>
              </div>
            ))
          }



         
          </div>
        </div>
    )
}