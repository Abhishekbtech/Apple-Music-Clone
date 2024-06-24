import React, { Suspense } from 'react';
import Footer from './Footer/Footer';

// Lazy load mood components and Artists component
const Romantic = React.lazy(() => import('./Mood/Romantic'));
const Excited = React.lazy(() => import('./Mood/Excited'));
const Happy = React.lazy(() => import('./Mood/Happy'));
const Sad = React.lazy(() => import('./Mood/Sad'));
const NewReleases = React.lazy(() => import('./Mood/NewReleases'));
const TopCharts = React.lazy(() => import('./Mood/TopCharts'));
const Artists = React.lazy(() => import('./Mood/Artists'));

function BrowsePage() {
    return (
        <div className="container mx-auto p-4 bg-gradient-to-br from-indigo-900 via-purple-400 to-purple-600 text-white">
            <h1 className="text-2xl font-bold mb-4 pt-3">Featured Music</h1>
            <Suspense fallback={<div>Loading...</div>}>
                <section className="mt-8">
                    <NewReleases />
                </section>
                <section className="mt-8">
                    <TopCharts />
                </section>
                <section className="mt-8">
                    <Romantic />
                </section>
                <section className="mt-8">
                    <Excited />
                </section>
                <section className="mt-8">
                    <Happy />
                </section>
                <section className="mt-8">
                    <Sad />
                </section>
                <section className="mt-8">
                    <Artists />
                </section>
                <section className="mt-8">
                    <Footer/>
                </section>
            </Suspense>
        </div>
    );
}

export default BrowsePage;
