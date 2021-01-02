import Head from 'next/head';

export default function PageContainer({ title, description, children }) {
    return (
        <div>
            <Head>
                <title>{title || `Destiny Dolphin`}</title>
                {description !== false && (
                    <meta
                        name="description"
                        content={description || `High quality destiny 2 content on Destiny Dolphin`}
                    />
                )}
                <meta name="robots" content="noindex" />
            </Head>
            {children}            
        </div>
    );
}