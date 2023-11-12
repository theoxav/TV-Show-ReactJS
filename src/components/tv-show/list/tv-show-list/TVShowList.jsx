import { TVShowListItem } from "../tv-show-list-item/TVShowListItem"
import s from "./style.module.css"

export function TVShowList({ TVShowList, onClickItem }) {
    return (
        <>
            <div className={s.title}>You may also like:</div>
            <div className={s.list}>
                {TVShowList.map((tvShow) => {
                    return (
                        <span key={tvShow.id} className={s.tv_show_list_item}>
                            <TVShowListItem tvShow={tvShow} onClick={onClickItem} />
                        </span>
                    )
                })}
            </div>
        </>
    )
}