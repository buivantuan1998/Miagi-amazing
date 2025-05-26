import React from "react";
import { HomeHeader, Utinities, ListOA, NewsSection } from "@components";
import PageLayout from "@components/layout/PageLayout";
import { APP_UTINITIES } from "@constants/utinities";
import { useStore } from "@store";
import Contacts from "./Contacts";
import Procedures from "./Procedures";

const HomePage: React.FunctionComponent = () => {
    const [organization] = useStore(state => [
        state.organization,
        state.getOrganization,
    ]);

    return (
        <PageLayout
            id="home-page"
            customHeader={
                <HomeHeader
                    title="DỊCH VỤ CÔNG"
                    name={organization?.name || ""}
                />
            }
        >
            <Utinities utinities={APP_UTINITIES} />
            {/* <ListOA /> */}
            <ListOA
                targetDate={new Date('2024-12-31T23:59:59')}
                onComplete={() => console.log('Countdown completed!')}
            />
            <Contacts />
            <Procedures />
            <NewsSection />
        </PageLayout>
    );
};

export default HomePage;
