import Alert from '@material-ui/lab/Alert';
import useSWR from "swr";
import { useRouter } from "next/router";
import { useOnline } from "@meetins/meetins/util-hooks";

type Data = {
    id: string;
    name: string;
    email: string;
};

const fetcher = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) {
        throw Error("Yo that's NOT OK!!!");
    }
    const data: Data = await res.json();
    return data;
};

const UserPage = () => {
    const router = useRouter();
    const { id, ...stuff } = router.query;
    const action = id ? fetcher : null
    const result = useSWR(`/api/user/${id}`, action);
    const data: Data = result.data;
    const error: Error = result.error;
    const online = useOnline();
    
    console.log(`online`, online)
    

    if (error) {
        return <Alert severity="error">Loading failed: {error.message}</Alert>
    }
    
    if (!data) {
        return <Alert severity="info">Loading...</Alert>
    }

    return (
        <div>
            <h3>
            UserID
            </h3>
            <p>{data.id}</p>
    
            <h3>
            Name
            </h3>
            <p>{data.name}</p>
    
            <h3>
            Email
            </h3>
            <p>{data.email}</p>
            <h3>
            Query Params
            </h3>
            <pre>{JSON.stringify(stuff)}</pre>
        </div>
    )
};

export default UserPage;