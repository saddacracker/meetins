import Link from 'next/link';

const UsersPage = () => {
    return (
        <>
            <h1>This is the Users page</h1>
            <Link href="/">
                Go to Home page
            </Link>
        </>
    )
}

export default UsersPage;