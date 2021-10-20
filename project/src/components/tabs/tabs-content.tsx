import React from 'react'
import { FilmsDescription } from '../../types/films'
import TabDetails from './tab-details';
import TabOverview from './tab-overview';
import TabReviews from './tab-reviews';

type TabsContentProps = {
    film: FilmsDescription,
    activeTab: string
}

export default function TabsContent(props: TabsContentProps) {
    function switchRender(activeTab: string): JSX.Element {
        switch (activeTab) {
            case 'Overview':
                return <TabOverview film={props.film} />;

            case 'Details':
                return <TabDetails film={props.film} />;

            case 'Reviews':
                return <TabReviews />;


            default:
                return <TabOverview film={props.film} />;
        }
    }

    return (
        <>
            {switchRender(props.activeTab)}
        </>
    )
}
