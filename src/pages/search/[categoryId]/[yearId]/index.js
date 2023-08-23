import { useRouter } from "next/router";

function CustomSearch() {
    const router = useRouter()
    const dataSearch= router.query
    return ( <div className="mt-5">
                {console.log(dataSearch)}
        </div> );
}

export default CustomSearch;