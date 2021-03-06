import React, { useState } from 'react';
import Image from 'next/image';
import {
    SearchIcon,
    GlobeAltIcon,
    MenuIcon,
    UserCircleIcon,
    UsersIcon
} from '@heroicons/react/solid';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { useRouter } from 'next/dist/client/router';

function Header({ placeholder }) {
    //APP States.
    const [searchInput, setSearchInput] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [numOfGuest, setNumOfGuest] = useState(1);

    //Router to navigate between pages.
    const router = useRouter();

    // Function to resent search bar input to null.
    const resetInput = () => {
        setSearchInput('');
    };

    //Function to assign selected date range values to the state.
    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection'

    };

    // Function to retrieve the selected start and end dates.
    const handleSelect = (ranges) => {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
    };

    //Function to redirect user to the search page
    const search = () => {
        router.push({
            pathname: '/search',
            query: {
                location: searchInput,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                numOfGuest
            }
        });
    };

    return (
        <header className='sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10'>
            {/* Left header section- Logo */}
            <div
                onClick={
                    // On click return to the home page.
                    () => router.push("/")}
                className='relative flex items-center h-10 cursor-pointer my-auto '>
                <Image
                    src='https://links.papareact.com/qd3'
                    layout='fill'
                    objectFit="contain"
                    objectPosition="left"
                />
            </div>

            {/* Middle header section - Search Bar*/}
            <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
                <input
                    type="text"
                    placeholder={placeholder || "Start your search"}
                    className="flex-grow pl-5 bg-transparent outline-none text-sm 
                    text-gray-600 placeholder-gray-400"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <SearchIcon className="hidden md:inline-flex h-8 bg-red-400 
                text-white rounded-full p-2 cursor-pointer md:mx-2" />
            </div>

            {/* Right header section */}
            <div className="flex space-x-4 items-center justify-end text-gray-500">
                <p className="hidden md:inline cursor-pointer">Become a Host</p>
                <GlobeAltIcon className="h-6 cursor-pointer" />
                <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
                    <MenuIcon className="h-6" />
                    <UserCircleIcon className="h-6" />

                </div>
            </div>
            {// Conditionally render h1 element if the searchInput state has a value.
                searchInput &&
                <div className="flex-col  col-span-3 mx-auto mt-2">
                    <DateRangePicker
                        ranges={[selectionRange]}
                        minDate={new Date()}
                        rangeColors={["#FD5B61"]}
                        onChange={handleSelect}
                    />
                    <div className="flex items-center border-b mb-4">
                        <h2 className="text-2xl flex-grow font-semibold">Number of Guests</h2>
                        <UsersIcon className="h-5" />
                        <input
                            value={numOfGuest}
                            type="number"
                            min={1}
                            className="w-12 pl-2 text-lg outline-none text-red-400"
                            onChange={(e) => setNumOfGuest(e.target.value)}
                        />

                    </div>
                    <div className="flex">
                        <button
                            onClick={resetInput}
                            className="flex-grow text-gray-500">Cancel</button>
                        <button
                            onClick={search}
                            className="flex-grow text-red-400">Search</button>
                    </div>
                </div>}

        </header>
    );
}

export default Header;;;
