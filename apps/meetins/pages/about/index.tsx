import Link from 'next/link';

const AboutPage = () => {
    return (
        <>
            <h1>This is About page</h1>
            <Link href="/">
                Go to Home page
            </Link>
        </>
    )
}

export default AboutPage;