import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.ex';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard({ auth, searchV, select }) {
    const [search, setSearch] = useState(searchV);

    
    // console.log(search);
    const handleSubmit = (e) => {
        e.preventDefault();

        const searchParams = new URLSearchParams(window.location.search);

        searchParams.set('search', search);

        const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

        router.get(newPathname);
    }
    
    const handleSelect = (e) => {

        const searchParams = new URLSearchParams(window.location.search);
    
        searchParams.set('select', e.currentTarget.value);
    
        const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
    
        router.get(newPathname);
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">You're logged in!</div>
                        <form onSubmit={handleSubmit}>
                            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
                            <button type="submit">search</button>
                        </form>

                        <select onChange={(e) => {
                            handleSelect(e)
                            }} id="cars" name="cars">
                            {select && (
                            <option value={select}>{select}</option>
                            )}
                            <option value="">Select gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="audi">Audi</option>
                        </select>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
