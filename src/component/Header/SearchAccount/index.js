import  Link  from "next/link";
import styles from "../Propper/Popper.module.css";
function SearchAccount({ items }) {
  return (

    <div className={styles.wrap + " d-flex border-transparent"} key={items.id}>
        {console.log(items)}
      <img
        className={styles.image + " col-3 border-transparent h-100"}
        src={
          items.length > 0
            ? "/"
            : `https://image.tmdb.org/t/p/w300${items.poster_path}`
        }
      />
      <div className={styles.info + " col-9 p-3"}>
        <h5 className={styles.name + " fw-bold"}>{items.title}</h5>
        <p className={styles.description}>{items.original_title} </p>
      </div>
    </div>
  );
}

export default SearchAccount;
