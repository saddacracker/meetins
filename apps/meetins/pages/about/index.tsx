import Link from 'next/link';
import { MHeader } from '@meetins/meetins/ui-shared';

const AboutPage = () => {
    return (
        <>
            <MHeader title="This is the About Page"/>
            <Link href="/">
                Go to Home page
            </Link>
        </>
    )
}

export default AboutPage;