import styles from "../ContentHome/ContentHome.module.css"

function SlideMovie({item}) {
    return (  <div className="col-2 card ">
            <div className={styles.slide}>
            
              <img
                src={`https://image.tmdb.org/t/p/w300${item.profile_path}`}
                className="card-img"
                alt="..."
              />
              <div className={styles.slideContent}>
                <h6>{item.known_for_department}</h6>
                <p>{item.original_name}</p>
              </div>
            </div>
    </div>);
}

export default SlideMovie;